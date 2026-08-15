<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $user = User::create([
            'name' => 'Super Admin',
            'email' => 'superadmin@shopessy.com',
            'password' => Hash::make('12345678'),
        ]);
        
        Role::firstOrCreate(['name' => 'super-admin']);

        $user->assignRole('super-admin');

        $this->call(MedicineCategorySeeder::class);
        $this->call(UniversalProductSeeder::class);
    }
}
