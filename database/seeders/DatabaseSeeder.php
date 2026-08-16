<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $user = User::firstOrCreate(
            ['email' => 'superadmin@shopessy.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('12345678'),
            ]
        );

        $this->call(MedicineCategorySeeder::class);
        $this->call(UniversalProductSeeder::class);
    }
}
