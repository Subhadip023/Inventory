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
            'email' => 'subhadip240420@gmail.com',
            'password' => '$2y$12$Udx1cBgYHsPIpXuDKlhTiOf84bamuQg4DQMesuzN0nrqQeD6Tizje',
        ]);
        
        Role::firstOrCreate(['name' => 'super-admin']);

        $user->assignRole('super-admin');
    }
}
