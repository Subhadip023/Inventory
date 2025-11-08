<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        log_user_activity('roles', 'User visited role list page');
        $roles=Role::with('permissions','users')->get();
        $all_permissions=Permission::all();
        $all_users=User::all();
        return Inertia::render('Role/Index',['roles'=>$roles,'all_permissions'=>$all_permissions,'all_users'=>$all_users]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        log_user_activity('roles', 'User created role name: '.$request->name);
        $request->validate([
            'name'=>'required | unique:roles,name',
            'permissions'=>'required|array|min:1',
            'users'=>'nullable|array',
            'permissions.*'=>'required | exists:permissions,name',
            'users.*'=>'required | exists:users,id'
        ],[
            'permissions.required'=>'Please select at least one permission.',
        ]);
       
        try{
            $role=Role::create(['name'=>$request->name]);
            $role->syncPermissions($request->permissions);
            return redirect()->route('role.index')->with('success', 'Role created successfully.');
        }catch(\Exception $e){
            logger()->error($e->getMessage());
            return redirect()->route('role.index')->with('error','Something went wrong.');
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
        log_user_activity('roles', 'User updated role name: '.$request->name);
        $request->validate([
        'name' => 'required|string|max:255|unique:roles,name,' . $id,
        'permissions' => 'nullable|array',
         ]);

        // Find the role
        $role = Role::findOrFail($id);

        // Update role name
        $role->update([
            'name' => $request->name,
        ]);

        // Sync permissions (replace old with new)
        if ($request->has('permissions')) {
            $role->syncPermissions($request->permissions);
        } else {
            $role->syncPermissions([]); // remove all permissions if none selected
        }

        return redirect()->route('role.index')->with('success', 'Role updated successfully.');   
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        log_user_activity('roles', 'User deleted role id: '.$id);
        try{
       
            $role=Role::findOrFail($id);
            if ($role->name == 'super-admin') {
                return redirect()->route('role.index')->with('error', 'Super Admin cannot be deleted.');
            }
            $role->delete();
            return redirect()->route('role.index')->with('success', 'Role deleted successfully.');
        }catch(\Exception $e){
            logger()->error($e->getMessage());
            return redirect()->route('role.index')->with('error','Something went wrong.');
        }
    }
}
