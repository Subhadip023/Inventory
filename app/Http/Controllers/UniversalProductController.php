<?php

namespace App\Http\Controllers;

use App\Models\universalProduct;
use App\Http\Requests\StoreuniversalProductRequest;
use App\Http\Requests\UpdateuniversalProductRequest;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\Interfaces\UniversalProductServiceInterface;
use App\Repositories\Interfaces\UniversalProductRepositoryInterface;
use App\Repositories\Interfaces\ShopCategoriesRepositoryInterface;
class UniversalProductController extends Controller
{
    protected $service;
    protected $repository;

    protected $shopCategoryRepository;

    public function __construct(UniversalProductServiceInterface $service,UniversalProductRepositoryInterface $repository, ShopCategoriesRepositoryInterface $shopCategoryRepository){
        $this->service = $service;
        $this->repository = $repository;
        $this->shopCategoryRepository = $shopCategoryRepository;
    }
    

    public function index(Request $request)
    {
        $per_page = $request->input('per_page',5);

        if ($per_page == 'all') {
            $products = $this->service->getAll();
        } else {
            $products = $this->service->paginate($per_page);
        }
        $allCategory = $this->shopCategoryRepository->allActiveCategoryIdName();
        return Inertia::render('UniversalProduct/Index', [
            'universalProducts' => $products,
            'per_page' => $per_page,
            'allCategory' => $allCategory,
        ]);
    }


   
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreuniversalProductRequest $request)
    {
        dd($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(universalProduct $universalProduct)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(universalProduct $universalProduct)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateuniversalProductRequest $request, universalProduct $universalProduct)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(universalProduct $universalProduct)
    {
        //
    }
    
    public function changeVarifyStatus(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:universal_products,id',
        ]);
        $id = $request['id'];
        $status = $this->repository->changeVarifyStatus($id);
        if ($status) {
            return redirect()->route('universal-products.index')->with('success', 'Product status changed successfully.');
        } else {
            return redirect()->back()->with('error', 'Failed to change product status.');
        }

        
        
    }

    public function search(Request $request)
    {
        $search = $request->input('search');
        $searchProducts = $this->service->search($search);
        return $searchProducts;
    }
}
