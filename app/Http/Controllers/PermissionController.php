<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        $request->validate([
            'name' => 'required | unique:permissions,name',
        ]);

        try{
            $permission=Permission::create(['name'=>$request->name]);
            $role=Role::where('name','super-admin')->first();
            $role->givePermissionTo($permission);
            return redirect()->back()->with('success', 'Permission created successfully.');
        }catch(\Exception $e){
            logger()->error($e->getMessage());
            return redirect()->back()->with('error','Something went wrong.');
        }

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
        $request->validate([
            'name' => 'required | unique:permissions,name,' . $id,
        ]);

        try{
            $permission=Permission::findOrFail($id);
            $permission->update(['name'=>$request->name]);
            return redirect()->back()->with('success', 'Permission updated successfully.');
        }catch(\Exception $e){
            logger()->error($e->getMessage());
            return redirect()->back()->with('error','Something went wrong.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try{
            $permission=Permission::findOrFail($id);
            $permission->delete();
            return redirect()->back()->with('success', 'Permission deleted successfully.');
        }catch(\Exception $e){
            logger()->error($e->getMessage());
            return redirect()->back()->with('error','Something went wrong.');
        }
    }
}
