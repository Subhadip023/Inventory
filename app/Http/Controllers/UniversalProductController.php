<?php

namespace App\Http\Controllers;

use App\Models\UniversalProduct;
use App\Models\MedicineCategory;
use App\Http\Requests\StoreUniversalProductRequest;
use App\Http\Requests\UpdateUniversalProductRequest;
use Inertia\Inertia;
use Illuminate\Http\Request;

class UniversalProductController extends Controller
{
    public function index(Request $request)
    {
        $query = UniversalProduct::with('medicineCategory');

        if ($search = $request->input('search')) {
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('salt_composition', 'like', "%{$search}%")
                  ->orWhere('manufacturer', 'like', "%{$search}%");
            });
        }

        if ($catId = $request->input('medicine_category_id')) {
            if ($catId !== 'all') {
                $query->where('medicine_category_id', $catId);
            }
        }

        $products = $query->orderBy('id', 'desc')->paginate(10)->withQueryString();
        $allCategory = MedicineCategory::orderBy('name')->get();

        log_user_activity('universal_products', 'User visited universal products page');

        return Inertia::render('UniversalProduct/Index', [
            'universalProducts' => $products,
            'allCategory' => $allCategory,
            'filterData' => $request->all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUniversalProductRequest $request)
    {
        $data = $request->validated();
        $data['slug'] = \Str::slug($data['name']);

        UniversalProduct::create($data);
        log_user_activity('universal_products', 'User created universal product');

        return redirect()->back()->with('success', 'Universal Product created successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUniversalProductRequest $request, UniversalProduct $universalProduct)
    {
        $data = $request->validated();
        if (isset($data['name'])) {
            $data['slug'] = \Str::slug($data['name']);
        }

        $universalProduct->update($data);
        log_user_activity('universal_products', 'User updated universal product');

        return redirect()->back()->with('success', 'Universal Product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UniversalProduct $universalProduct)
    {
        log_user_activity('universal_products', 'User deleted universal product');
        $universalProduct->delete();

        return redirect()->back()->with('success', 'Universal Product deleted successfully.');
    }

    public function changeVarifyStatus(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:universal_products,id',
        ]);

        $product = UniversalProduct::findOrFail($request->id);
        $product->update(['verified' => !$product->verified]);

        log_user_activity('universal_products', 'User changed universal product status');
        return redirect()->back()->with('success', 'Product verification status updated successfully.');
    }

    public function search(Request $request)
    {
        $search = $request->input('search');
        return UniversalProduct::with('medicineCategory')
            ->where('name', 'like', "%{$search}%")
            ->orWhere('salt_composition', 'like', "%{$search}%")
            ->get();
    }
}
