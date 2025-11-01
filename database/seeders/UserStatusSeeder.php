<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('user_statuses')->insert([
            [
                'id' => 1,
                'name' => 'Available',
                'manual' => 0,
                'description' => 'User is active',
            ],
            [
                'id' => 2,
                'name' => 'Busy',
                'manual' => 1,
                'description' => 'User is busy',
            ],
            [
                'id' => 3,
                'name' => 'Do not disturb',
                'manual' => 1,
                'description' => 'User does not want notifications',
            ],
            [
                'id' => 4,
                'name' => 'Be right back',
                'manual' => 1,
                'description' => 'User will return soon',
            ],
            [
                'id' => 5,
                'name' => 'Appear away',
                'manual' => 1,
                'description' => 'User appears idle',
            ],
            [
                'id' => 6,
                'name' => 'Appear offline',
                'manual' => 1,
                'description' => 'User appears offline',
            ],
            [
                'id' => 7,
                'name' => 'Offline',
                'manual' => 0,
                'description' => 'User is inactive/logged out',
            ],[
                'id' => 8,
                'name' => 'logout',
                'manual' => 0,
                'description' => 'User is logged out',
            ],
        ]);
    }
}
