<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use App\Http\Requests\StoreSettingRequest;
use App\Http\Requests\UpdateSettingRequest;
use Inertia\Inertia;
class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function __construct(){
        $this->user_id=auth()->user()->id;
        $this->shop_id=session()->get('current_shop');
    }

    public function index()
    {
        $setting=Setting::where('shop_id', $this->shop_id)->first();
        return Inertia::render('Settings/Store',['setting'=>$setting]);
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
    public function store(StoreSettingRequest $request)
    {
        $store_id=$this->shop_id;
        
        $valdated = $request->validated();
        if(isset($valdated['theme_mode'])){
            session()->put('theme_mode', $valdated['theme_mode']);
        }
        $valdated['shop_id'] = $store_id;
        $valdated['user_id'] = $this->user_id;

        Setting::updateOrCreate(['shop_id'=>$store_id, 'user_id'=>$this->user_id], $valdated);

        return redirect()->back()->with('success', 'Settings updated successfully.');
        
    }

    /**
     * Display the specified resource.
     */
    public function show(Setting $setting)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Setting $setting)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSettingRequest $request, Setting $setting)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Setting $setting)
    {
        //
    }
}
