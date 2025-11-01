<?php

namespace App\Http\Controllers;

use App\Models\UserStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;
class UserStatusController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $status=UserStatus::all();
        return Inertia::render('SuperAdmin/UserStatus',['allStatus'=>$status]);
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
    public function store(Request $request)
    {
        $id=$request->id;
        $status=UserStatus::find($id);
        $status->name=$request->name;
        $status->manual=$request->manual;
        $status->show=$request->show;
        $status->svg=$request->svg;
        $status->save();
        return redirect()->route('superadmin.users-status.index')->with('success', 'Status updated successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
