<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function __construct()
    {
        $this->currentShop = session()->get('current_shop');
    }

    public function index()
    {   
        $currentShop = $this->currentShop;
        
        $products = Product::where('shop_id', $currentShop)->get();
        return Inertia::render('Product/Index',['products' => $products]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Product/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        try{
            $validated = $request->validated();
            $validated['description'] = $valdatated['description'] = $validated['description'] ?? " ";
            $validated['shop_id'] = $this->currentShop;
            Product::create($validated);
            return redirect()->intended(route('products.index', absolute: false));
        }catch(\Exception $e){
            log($e);
            return redirect()->back()->with('error', 'Something went wrong.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return Inertia::render('Product/Edit', ['product' => $product]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $valdatated = $request->validated();
        $product->update($valdatated);
        return redirect()->intended(route('products.index', absolute: false));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->intended(route('products.index', absolute: false));
    }
}
