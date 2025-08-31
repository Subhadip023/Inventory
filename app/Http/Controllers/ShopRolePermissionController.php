<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Inertia\Inertia;
use Inertia\Response;

class ShopRolePermissionController extends Controller
{
    public function index($shopId)
    {
        // List roles and permissions for a specific shop
        $roles = Role::where('shop_id', $shopId)->get();
        $all_permissions = Permission::;
        $all_users = User::all();
        return Inertia::render('Shop/Role/Index', compact('roles'));
    }

    public function create($shopId)
    {
        $permissions = Permission::all();
        return view('shop.roles.create', compact('permissions', 'shopId'));
    }

    public function store(Request $request, $shopId)
    {
        $request->validate([
            'name' => 'required|string|unique:roles,name',
        ]);

        // Create role scoped to shop
        $role = Role::create([
            'name' => $request->name,
            'shop_id' => $shopId,   // 👈 important
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
}
