<?php

namespace App\Http\Controllers;

use App\Models\Batch;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BatchController extends Controller
{
    private function getCurrentShopId(): int
    {
        $shopId = session()->get('current_shop');
        if (!$shopId) {
            abort(403, 'Unauthorized. No active store session selected.');
        }
        return (int) $shopId;
    }

    public function index(Request $request)
    {
        $shopId = $this->getCurrentShopId();

        $query = Batch::with(['product.universalProduct.medicineCategory'])
            ->where('shop_id', $shopId);

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('batch_no', 'like', "%{$search}%")
                  ->orWhereHas('product.universalProduct', function ($q2) use ($search) {
                      $q2->where('name', 'like', "%{$search}%")
                         ->orWhere('salt_composition', 'like', "%{$search}%");
                  });
            });
        }

        $batches = $query->orderBy('expiry_date', 'asc')->get();

        $products = Product::with('universalProduct')
            ->where('shop_id', $shopId)
            ->get();

        return Inertia::render('Batch/Index', [
            'batches'  => $batches,
            'products' => $products,
            'filters'  => $request->only(['search']),
        ]);
    }

    public function store(Request $request)
    {
        $shopId = $this->getCurrentShopId();

        $validated = $request->validate([
            'product_id'     => 'required|exists:products,id',
            'batch_no'       => 'required|string|max:100',
            'expiry_date'    => 'nullable|date',
            'quantity'       => 'required|integer|min:0',
            'purchase_price' => 'nullable|numeric|min:0',
            'mrp'            => 'nullable|numeric|min:0',
        ]);

        // Verify product belongs to shop
        $product = Product::where('id', $validated['product_id'])
            ->where('shop_id', $shopId)
            ->firstOrFail();

        $validated['shop_id'] = $shopId;

        Batch::updateOrCreate(
            [
                'shop_id'    => $shopId,
                'product_id' => $validated['product_id'],
                'batch_no'   => $validated['batch_no'],
            ],
            $validated
        );

        return redirect()->back()->with('success', 'Stock batch added successfully.');
    }

    public function update(Request $request, Batch $batch)
    {
        $shopId = $this->getCurrentShopId();

        if ((int) $batch->shop_id !== $shopId) {
            abort(403, 'Unauthorized access to store batch.');
        }

        $validated = $request->validate([
            'batch_no'       => 'required|string|max:100',
            'expiry_date'    => 'nullable|date',
            'quantity'       => 'required|integer|min:0',
            'purchase_price' => 'nullable|numeric|min:0',
            'mrp'            => 'nullable|numeric|min:0',
        ]);

        $batch->update($validated);

        return redirect()->back()->with('success', 'Stock batch updated successfully.');
    }

    public function destroy(Batch $batch)
    {
        $shopId = $this->getCurrentShopId();

        if ((int) $batch->shop_id !== $shopId) {
            abort(403, 'Unauthorized access to store batch.');
        }

        $batch->delete();

        return redirect()->back()->with('success', 'Stock batch deleted successfully.');
    }
}
