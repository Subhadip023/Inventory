<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\Customer;
use App\Models\Payment;
use App\Models\CustomerLedger;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    /**
     * Get active shop ID from session.
     */
    private function getCurrentShopId(): int
    {
        return (int) session()->get('current_shop');
    }

    /**
     * Display a listing of the resource scoped to current shop.
     */
    public function index()
    {
        Gate::authorize('viewAny', Order::class);

        $currentShopId = $this->getCurrentShopId();

        $allOrder = Order::with(['customer', 'createdBy', 'payments'])
            ->where('shop_id', $currentShopId)
            ->orderBy('id', 'desc')
            ->get();

        return Inertia::render('Orders/Index', ['allOrder' => $allOrder]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('create', Order::class);

        $currentShopId = $this->getCurrentShopId();

        // Scope products strictly to the current store
        $products = Product::with('universal_product')
            ->where('shop_id', $currentShopId)
            ->get();

        // Scope customers strictly to the current store
        $customers = Customer::where('shop_id', $currentShopId)->get();

        return Inertia::render('Orders/Create', [
            'products' => $products,
            'customers' => $customers
        ]);
    }

    /**
     * Store a newly created resource in storage scoped to current shop.
     */
    public function store(StoreOrderRequest $request)
    {
        Gate::authorize('create', Order::class);

        $currentShopId = $this->getCurrentShopId();
        $validated = $request->validated();
        $itemsInput = $validated['items'] ?? [];

        return DB::transaction(function () use ($currentShopId, $validated, $itemsInput) {
            $grandTotal = 0;
            $orderItems = [];

            foreach ($itemsInput as $item) {
                if (empty($item['product']) || empty($item['product']['value'])) {
                    continue;
                }

                $productId = (int) $item['product']['value'];
                $quantity = isset($item['quantity']) ? (int)$item['quantity'] : 1;

                // Security Guard: Verify product belongs strictly to current shop
                $productModel = Product::where('id', $productId)
                    ->where('shop_id', $currentShopId)
                    ->first();

                if (!$productModel) {
                    abort(403, 'Unauthorized product selection from another store.');
                }

                $price = (float) $productModel->price;
                $orderItems[] = [
                    'product_id' => $productId,
                    'quantity' => $quantity,
                    'price' => $price,
                ];
                $grandTotal += $price * $quantity;
            }

            $tax = (float) ($validated['tax'] ?? 0);
            $discount = (float) ($validated['discount'] ?? 0);
            $netAmount = $grandTotal + ($grandTotal * $tax / 100) - ($grandTotal * $discount / 100);

            $customerId = !empty($validated['customer_id']) ? (int) $validated['customer_id'] : null;

            // Verify customer belongs to current shop if provided
            if ($customerId) {
                $customerModel = Customer::where('id', $customerId)
                    ->where('shop_id', $currentShopId)
                    ->first();

                if (!$customerModel) {
                    abort(403, 'Unauthorized customer selection from another store.');
                }
            }

            $order = Order::create([
                'shop_id' => $currentShopId,
                'customer_id' => $customerId,
                'created_by' => auth()->id(),
                'grand_total' => $grandTotal,
                'discount' => $discount,
                'tax' => $tax,
                'net_amount' => $netAmount,
                'paid_amount' => 0,
                'payment_status' => 'unpaid',
                'status' => 'Pending',
            ]);

            if (!empty($orderItems)) {
                $order->orderItems()->createMany($orderItems);
            }

            // Payment Handling
            $initialPaidAmount = isset($validated['paid_amount']) ? (float) $validated['paid_amount'] : $netAmount;

            if ($initialPaidAmount > 0) {
                Payment::create([
                    'shop_id' => $currentShopId,
                    'order_id' => $order->id,
                    'customer_id' => $customerId,
                    'amount' => $initialPaidAmount,
                    'mode' => $validated['payment_mode'] ?? 'cash',
                    'reference_no' => $validated['payment_reference'] ?? null,
                ]);
            }

            // Sync payment_status & paid_amount on order
            $order->recalculatePaymentStatus();

            // Customer Ledger entries (Wholesale/Credit Tracking)
            if ($customerId) {
                // Positive entry: Sale debt incurred
                CustomerLedger::create([
                    'shop_id' => $currentShopId,
                    'customer_id' => $customerId,
                    'order_id' => $order->id,
                    'type' => 'sale',
                    'amount' => $netAmount,
                    'note' => 'Bill #' . $order->id . ' sale',
                ]);

                // Negative entry: Payment received
                if ($initialPaidAmount > 0) {
                    CustomerLedger::create([
                        'shop_id' => $currentShopId,
                        'customer_id' => $customerId,
                        'order_id' => $order->id,
                        'type' => 'payment',
                        'amount' => -1 * $initialPaidAmount,
                        'note' => 'Bill #' . $order->id . ' initial payment',
                    ]);
                }
            }

            return redirect()->route('orders.index')->with('success', 'Order created successfully.');
        });
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        Gate::authorize('view', $order);

        $order->load(['createdBy', 'customer', 'payments', 'ledgerEntries', 'orderItems.product.universal_product']);

        return Inertia::render('Orders/Show', ['order' => $order]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        Gate::authorize('update', $order);

        return Inertia::render('Orders/Edit', ['order' => $order]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        Gate::authorize('update', $order);

        $validated = $request->validated();
        $order->update($validated);

        return redirect()->route('orders.index')->with('success', 'Order updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        Gate::authorize('delete', $order);

        $order->delete();

        return redirect()->route('orders.index')->with('success', 'Order deleted successfully.');
    }
}
