<?php

namespace App\Http\Controllers;

use App\Models\UserSetting;
use App\Http\Requests\StoreUserSettingRequest;
use App\Http\Requests\UpdateUserSettingRequest;
use Inertia\Inertia;
class UserSettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Settings/Store');
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
    public function store(StoreUserSettingRequest $request)
    {
        $userSettingData = $request->validated();
        $userSettingData['user_id'] = auth()->user()->id;

        UserSetting::updateOrCreate($userSettingData);

        return redirect()->back()->with('success', 'Settings saved successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(UserSetting $userSetting)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UserSetting $userSetting)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserSettingRequest $request, UserSetting $userSetting)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserSetting $userSetting)
    {
        //
    }
}
