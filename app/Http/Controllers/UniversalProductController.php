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
        $filterData=$request->all();
        if (!empty($filterData['shop_category_id'])) {
        $filterData['shop_category_id']=$filterData['shop_category_id'] =="all"?null:$filterData['shop_category_id'];
        }
        if (count(value: $filterData)>0) {
            $products = $this->service->filterProducts($filterData);
        }else{
            $products=$this->service->paginate(5);
        }
        $allCategory = $this->shopCategoryRepository->allActiveCategoryIdName();
        log_user_activity('universal_products', 'User visited universal products page');
        return Inertia::render('UniversalProduct/Index', [
            'universalProducts' => $products,
            'per_page' => $per_page??5,
            'allCategory' => $allCategory,
            'filterData' =>$filterData,
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
        $data=$request->validated();
        $data['slug']=\Str::slug($data['name'],'-');

        $this->service->create($data);
        log_user_activity('universal_products', 'User created universal product');

        return redirect()->back()->with('success', 'Universal Product created successfully.');
        
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
    public function update(UpdateuniversalProductRequest $request,$universal_product)
    {
        $data=$request->validated();
        $this->service->update($universal_product,$data);
        log_user_activity('universal_products', 'User updated universal product');
        return redirect()->route('universal-products.index')->with('success', 'Universal Product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($universal_product)
    {
        log_user_activity('universal_products', 'User deleted universal product');
        $this->service->delete($universal_product);
        return redirect()->back()->with('success', 'Universal Product deleted successfully.');
    }
    
    public function changeVarifyStatus(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:universal_products,id',
        ]);
        $id = $request['id'];
        $status = $this->repository->changeVarifyStatus($id);
        log_user_activity('universal_products', 'User changed universal product status');
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
        log_user_activity('universal_products', 'User searched universal product');
        return $searchProducts;
    }
}
