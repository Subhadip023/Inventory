<?php

namespace App\Http\Controllers;

use App\Repositories\Interfaces\TaxRepositoryInterface;
use App\Http\Requests\StoreTaxRequest;
use App\Http\Requests\UpdateTaxRequest;
use Inertia\Inertia;

class TaxController extends Controller
{

    private $taxRepository;
    public function __construct(TaxRepositoryInterface $taxRepository)
    {
        $this->taxRepository = $taxRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('SuperAdmin/Tax', ['taxes' => $this->taxRepository->all()]);
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
    public function store(StoreTaxRequest $request)
    {
        try{
            // dd($request->validated());
            $this->taxRepository->create($request->validated());
            return redirect()->back()->with('success', 'Tax created successfully.');
        }catch(\Throwable $th){
            logger()->error($th->getMessage());
            return redirect()->back()->with('error', 'Something went wrong.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Tax $tax)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tax $tax)
    {
    
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaxRequest $request, $tax)
    {
        try{
            $this->taxRepository->update($tax, $request->validated());
            return redirect()->back()->with('success', 'Tax updated successfully.');
        }catch(\Throwable $th){
            logger()->error($th->getMessage());
            return redirect()->back()->with('error', 'Something went wrong.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( $tax)
    {
        try{
            
            $this->taxRepository->delete($tax);
            return redirect()->back()->with('success', 'Tax deleted successfully.');
        }catch(\Throwable $th){
            logger()->error($th->getMessage());
            return redirect()->back()->with('error', 'Something went wrong.');
        }
    }
}
