<?php

namespace App\Http\Controllers;

use App\Models\universalProduct;
use App\Http\Requests\StoreuniversalProductRequest;
use App\Http\Requests\UpdateuniversalProductRequest;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\Interfaces\UniversalProductServiceInterface;
use function Laravel\Prompts\search;
class UniversalProductController extends Controller
{
    protected $service;

    public function __construct(UniversalProductServiceInterface $service){
        $this->service = $service;
    }
    

    public function index(Request $request)
    {
        $per_page = $request->input('per_page',5);

        if ($per_page == 'all') {
            $products = $this->service->getAll();
        } else {
            $products = $this->service->paginate($per_page);
        }

        return Inertia::render('UniversalProduct/Index', [
            'universalProducts' => $products,
            'per_page' => $per_page,
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
        //
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


    public function search(Request $request)
    {
        $search = $request->input('search');
        $searchProducts = $this->service->search($search);
        return $searchProducts;
    }
}
