<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Product;
use App\Models\User;
class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $allOrder=Order::with(['customer','createdBy'])->orderBy('id','desc')->get();
        // dd($allOrder);
        return Inertia::render('Orders/Index',['allOrder'=>$allOrder]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
       $products=Product::all();
       $customers=User::where('user_type',3)->get();
       return Inertia::render('Orders/Create',['products'=>$products,'customers'=>$customers]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        
        $validated = $request->validated();
        $validated['created_by'] = auth()->user()->id;
        $products = $validated['items'];

        $validated['grand_total'] = 0;
        $orderItems = [];
        foreach ($products as $product) {
            if(!$product['product']) continue;
            $tempOrderItem = [
                'product_id' => $product['product']['value'],
                'quantity' => $product['quantity'],
                'price' => $product['product']['price'],
            ];
            $orderItems[] = $tempOrderItem;
            $validated['grand_total'] += $product['product']['price'] * $product['quantity'];
        }

        $validated['net_amount'] = $validated['grand_total'] +($validated['grand_total'] * $validated['tax'] / 100) - ($validated['grand_total'] * $validated['discount'] / 100);

        $validated['status'] = 'Pending';

        $order=Order::create(
           [ 'customer_id'=>$validated['customer_id'],
            'created_by'=>auth()->user()->id,
            'grand_total'=>$validated['grand_total'],
            'discount'=>$validated['discount'],
            'tax'=>$validated['tax'],
            'net_amount'=>$validated['net_amount'],
            'status'=>$validated['status'],
            ]
        );

        $order->orderItems()->createMany($orderItems);

        return redirect()->route('orders.index');
    
    
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $order->load('createdBy');          
        $order->load('customer');          
        $order->load('orderItems.product');
        // dd($order);
        return Inertia::render('Orders/Show', ['order' => $order]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
