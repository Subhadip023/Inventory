<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Request;

use function Symfony\Component\Clock\now;

class ProductController extends Controller
{
    private $currentShop;
    public function __construct()
    {
        $this->currentShop = session()->get('current_shop');
    }

    public function index()
    {   
        $currentShop = $this->currentShop;
        
        $products = Product::with('universal_product')->where('shop_id', $currentShop)->get();
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
    public function store(storeProductRequest $request)
    {
        try{
            $validated = $request->validated();
            $univData = $validated['universal_product'];

            if (is_array($univData) && isset($univData['value']) && is_numeric($univData['value'])) {
                $universalProductId = $univData['value'];
            } else {
                $productName = is_array($univData) ? ($univData['label'] ?? $univData['value']) : $univData;
                $productName = trim($productName);
                $universalProduct = \App\Models\UniversalProduct::firstOrCreate(
                    ['name' => $productName],
                    [
                        'slug' => \Str::slug($productName . '-' . uniqid()),
                        'description' => $validated['description'] ?? null,
                        'verified' => false
                    ]
                );
                $universalProductId = $universalProduct->id;
            }

            $validated['universal_products_id'] = $universalProductId;
            $validated['shop_id'] = $this->currentShop;
            unset($validated['universal_product']);

            Product::create($validated);
            return redirect()->route('products.index')->with('success', 'Product created successfully.');
        }catch(\Exception $e){
            logger()->error('Product creation failed: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to create product: ' . $e->getMessage());
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
