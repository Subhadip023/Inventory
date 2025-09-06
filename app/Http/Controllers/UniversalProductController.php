<?php

namespace App\Http\Controllers;

use App\Models\universalProduct;
use App\Http\Requests\StoreuniversalProductRequest;
use App\Http\Requests\UpdateuniversalProductRequest;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UniversalProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products=universalProduct::all();
        return Inertia::render('UniversalProduct/Index',['products'=>$products]);
    }

    /**
     * Show the form for creating a new resource.
     */
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
}
