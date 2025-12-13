<?php

namespace App\Http\Controllers;

use App\Models\CategoryTaxes;
use App\Models\ShopCategories;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\Rule;
use App\Repositories\Interfaces\TaxRepositoryInterface;
use App\Repositories\Interfaces\ShopCategoriesRepositoryInterface;
class ShopCategoriesController extends Controller
{
    protected $repository;
    protected $taxRepository;

    public function __construct(ShopCategoriesRepositoryInterface $shopCategoriesRepositoryInterface,TaxRepositoryInterface $taxRepository) {
        $this->repository=$shopCategoriesRepositoryInterface;
        $this->taxRepository = $taxRepository;
    }

    public function index()
    {
        log_user_activity('shop_categories', 'User visited shop categories page');
        return Inertia::render('ShopCategories/Index', [
            'shopCategories' => $this->repository->all(),
            'taxes' => $this->taxRepository->all()
        ]);
    }
   
    public function store(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'name' => 'required|string|max:255|unique:shop_categories,name',
            'tax_id' => 'required|exists:taxes,id',
            'is_active' => 'required|boolean',
        ]);

        
        $cat=$this->repository->create([
            'name' => $request->name,
            'is_active' => $request->is_active,
        ]);

        // dd($cat->id);
        $taxIds = $request->tax_id; // array of tax IDs

        if (!empty($taxIds)) {
            foreach ($taxIds as $taxId) {
                CategoryTaxes::create([
                    'category_id'    => $cat->id,
                    'tax_id'         => $taxId,
                    'tax_percentage' => 0, // you can update later
                ]);
            }
        }

        log_user_activity('shop_categories', 'User created shop category');
        return redirect()->back()->with('success', 'Shop category created successfully.');
    }

    public function update(Request $request, $shop_category)
    {
        // dd($request->all());
        $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('shop_categories', 'name')->ignore($shop_category)],
            'is_active' => 'required|boolean',
            'tax_id' => 'required|exists:taxes,id',
        ]);

        // dd($request->all());

        $isUpdate=$this->repository->update($shop_category, [
            'name' => $request->name,
            'is_active' => $request->is_active,
            'tax_ids' => $request->tax_id
        ]);

        log_user_activity('shop_categories', 'User updated shop category');
        if($isUpdate){
        return redirect()->route('shop-categories.index')->with('success', 'Shop category updated successfully.');        
        }else{
            return redirect()->back()->with('error', 'Failed to update shop category.');
        }
    }

    public function destroy($shop_category)
    {
        $isDeleted=$this->repository->delete($shop_category);
        log_user_activity('shop_categories', 'User deleted shop category');
        if($isDeleted){
            return redirect()->back()->with('success', 'Shop category deleted successfully.');
        }else{
            return redirect()->back()->with('error', 'Failed to delete shop category.');
        }
    }
}
