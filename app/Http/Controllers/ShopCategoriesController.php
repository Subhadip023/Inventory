<?php

namespace App\Http\Controllers;

use App\Models\ShopCategories;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\Rule;

use App\Repositories\Interfaces\ShopCategoriesRepositoryInterface;
class ShopCategoriesController extends Controller
{
    protected $repository;

    public function __construct(ShopCategoriesRepositoryInterface $shopCategoriesRepositoryInterface){
        $this->repository=$shopCategoriesRepositoryInterface;
    }

    public function index()
    {
        return Inertia::render('ShopCategories/Index', [
            'shopCategories' => $this->repository->all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:shop_categories,name',
            'is_active' => 'required|boolean',
        ]);

        ShopCategories::create([
            'name' => $request->name,
            'is_active' => $request->is_active,
        ]);

        return redirect()->back()->with('success', 'Shop category created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(ShopCategories $shopCategories)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ShopCategories $shopCategories)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ShopCategories $shop_category)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('shop_categories', 'name')->ignore($shop_category->id)],
            'is_active' => 'required|boolean',
        ]);

        $shop_category->update([
            'name' => $request->name,
            'is_active' => $request->is_active,
        ]);

        return redirect()->route('shop-categories.index')->with('success', 'Shop category updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ShopCategories $shop_category)
    {
    
        $shop_category->delete();
        return redirect()->back()->with('success', value: 'Shop category deleted successfully.');
    }
}
