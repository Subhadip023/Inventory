<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use App\Http\Requests\StoreShopRequest;
use App\Http\Requests\UpdateShopRequest;
use Inertia\Inertia;
use Inertia\Response;
use App\Repositories\CountryRepository;
use App\Repositories\CityRepository;
use App\Repositories\StateRepository;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


class ShopController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function __construct(CountryRepository $countryRepository,StateRepository $stateRepository,CityRepository $cityRepository){
        $this->countries=$countryRepository;
        $this->states=$stateRepository;
        $this->cities=$cityRepository;
    }
    
    
    public function getLocationData()
    {
        $defaultCountryId = $this->countries->default_selected_id();
        $defaultStateId   = $this->states->default_selected_id();
    
        return [
            'allCountry' => $this->countries->get($defaultCountryId),
            'allState' => $this->states->get($defaultCountryId),
            'allCity' => $this->cities->get($defaultStateId),
            'defult_selected_country_id' => $defaultCountryId,
            'defult_selected_state_id' => $defaultStateId,
        ];
    }
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //resources\js\Pages\Shop\Create.jsx
        return Inertia::render('Shop/Create',[...$this->getLocationData()]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreShopRequest $request)
    {
        try {
        $validated = $request->validated();
        $validated['user_id'] = auth()->user()->id;
        $validated['slug'] = Str::slug($validated['name']).'-'.auth()->user()->id;
        $is_name_exists = Shop::where('slug', $validated['slug'])->exists();
        if ($is_name_exists) {
           return redirect()->back()->withInput()->withErrors(['name' => 'Shop name already exists.']);    
        }
        $validated=array_filter($validated);
        if($request->hasFile('registration_certificate')) {
            $validated['registration_certificate'] = $request->file('registration_certificate')->store('shop_certificate','public');
        }
        if($request->hasFile('logo')) {
            $validated['logo'] = $request->file('logo')->store('shop','public');
        }
        Shop::create($validated);
        return redirect()->route('home')->with('success', 'Shop created successfully.');
        } catch (\Throwable $th) {
            logger()->error($th->getMessage());
            return redirect()->back()->with('error', 'Something went wrong.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Shop $shop)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Shop $store)
    {
    
        return Inertia::render('Shop/Edit',['store' => $store,...$this->getLocationData()]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateShopRequest $request, Shop $store)
    {
        try {
            $valData=$request->validated();
        $city=$valData['city']??null;
        if (!$city) {
            $valData['country'] = null;
            $valData['state'] = null;
        }
        $valData=array_filter($valData);
        
        $new_slug = Str::slug($valData['name']).'-'.auth()->user()->id;
        $old_slug = $store->slug;
        if ($new_slug != $old_slug) {
            $is_name_exists = Shop::where('slug', $new_slug)->exists();
            if ($is_name_exists) {
               return redirect()->back()->withInput()->withErrors(['name' => 'Shop name already exists.']);    
            }
        }
        
        $store->update($valData);
        return redirect()->back()->with('success', 'Shop updated successfully.');
        } catch (\Throwable $th) {
            logger()->error($th->getMessage());
            return redirect()->back()->with('error', 'Something went wrong.');
        }
     
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Shop $shop)
    {
        //
    }


    public function editShopeImage(Request $request)
    {
        return redirect()->back()->with('success', 'Logo updated successfully.');
        $shop = Shop::find($request->shop_id);

        if (!$shop) {
            return redirect()->back()->with('error', 'Shop not found.');
        }

        if ($request->hasFile('logo')) {
            if ($shop->logo) {
                Storage::disk('public')->delete($shop->logo);
            }

            // store new logo
            $shop->logo = $request->file('logo')->store('shop', 'public');
            $shop->save();
        }

        return redirect()->back()->with('success', 'Logo updated successfully.');
        }
}
