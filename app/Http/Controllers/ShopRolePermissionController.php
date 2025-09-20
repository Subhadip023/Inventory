<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;

class ShopRolePermissionController extends Controller
{
    public function index($shopId)
    {
        // List roles and permissions for a specific shop
        $roles = Role::where('shop_id', $shopId)->with('permissions')->get();
        $all_permissions = Permission::all();
        $all_users = User::all();
        return Inertia::render('Shop/Role/Index', compact('roles', 'all_permissions', 'all_users', 'shopId'));
    }

    public function create($shopId)
    {
        $permissions = Permission::all();
        return view('shop.roles.create', compact('permissions', 'shopId'));
    }

    public function store(Request $request, $shopId)
    {
        


        // Create role scoped to shop
        $role = Role::create([
            'name' => $request->name,
            'shop_id' => $shopId,
            'guard_name' => 'web'
        ]);

        $role->syncPermissions($request->permissions ?? []);

        return redirect()->route('shop.roles.index', $shopId)
                         ->with('success', 'Role created successfully');
    }

    public function assignRoleToUser(Request $request, $shopId)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'role_id' => 'required|exists:roles,id',
        ]);

        $user = User::findOrFail($request->user_id);
        $role = Role::where('id', $request->role_id)
                    ->where('shop_id', $shopId)
                    ->firstOrFail();

        // Assign role only for that shop
        $user->roles()->attach($role->id, ['shop_id' => $shopId]);

        return back()->with('success', 'Role assigned successfully to user');
    }
    public function deleteRole(Request $request, $shopId)
    {
        $role = Role::where('id', $request->role_id)
                    ->where('shop_id', $shopId)
                    ->firstOrFail();
        $role->delete();
        return back()->with('success', 'Role deleted successfully');
    }
}
