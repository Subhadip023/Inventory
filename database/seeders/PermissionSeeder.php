<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        // List your permissions here
        $permissions = [
            'manage users',
            'manage orders',
            'manage products',
            'manage categories',
            'view reports',
            'manage settings',
        ];

        // Create permissions if not existing
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create super-admin role if not exists
        $superAdmin = Role::firstOrCreate(['name' => 'super-admin']);

        // Give all permissions to super-admin
        $superAdmin->syncPermissions($permissions);
    }
}
