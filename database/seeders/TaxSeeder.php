<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TaxSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $taxes = [
            // --- 0% Tax ---
            ['name' => 'CGST_0', 'rate' => 0, 'is_active' => 1],
            ['name' => 'SGST_0', 'rate' => 0, 'is_active' => 1],
            ['name' => 'UTGST_0', 'rate' => 0, 'is_active' => 1],
            ['name' => 'IGST_0', 'rate' => 0, 'is_active' => 1],

            // --- 0.25% Tax ---
            ['name' => 'CGST_0.125', 'rate' => 0.125, 'is_active' => 1],
            ['name' => 'SGST_0.125', 'rate' => 0.125, 'is_active' => 1],
            ['name' => 'UTGST_0.125', 'rate' => 0.125, 'is_active' => 1],
            ['name' => 'IGST_0.25', 'rate' => 0.25, 'is_active' => 1],

            // --- 3% Tax ---
            ['name' => 'CGST_1.5', 'rate' => 1.5, 'is_active' => 1],
            ['name' => 'SGST_1.5', 'rate' => 1.5, 'is_active' => 1],
            ['name' => 'UTGST_1.5', 'rate' => 1.5, 'is_active' => 1],
            ['name' => 'IGST_3', 'rate' => 3, 'is_active' => 1],

            // --- 5% Tax ---
            ['name' => 'CGST_2.5', 'rate' => 2.5, 'is_active' => 1],
            ['name' => 'SGST_2.5', 'rate' => 2.5, 'is_active' => 1],
            ['name' => 'UTGST_2.5', 'rate' => 2.5, 'is_active' => 1],
            ['name' => 'IGST_5', 'rate' => 5, 'is_active' => 1],

            // --- 12% Tax ---
            ['name' => 'CGST_6', 'rate' => 6, 'is_active' => 1],
            ['name' => 'SGST_6', 'rate' => 6, 'is_active' => 1],
            ['name' => 'UTGST_6', 'rate' => 6, 'is_active' => 1],
            ['name' => 'IGST_12', 'rate' => 12, 'is_active' => 1],

            // --- 18% Tax ---
            ['name' => 'CGST_9', 'rate' => 9, 'is_active' => 1],
            ['name' => 'SGST_9', 'rate' => 9, 'is_active' => 1],
            ['name' => 'UTGST_9', 'rate' => 9, 'is_active' => 1],
            ['name' => 'IGST_18', 'rate' => 18, 'is_active' => 1],

            // --- 28% Tax ---
            ['name' => 'CGST_14', 'rate' => 14, 'is_active' => 1],
            ['name' => 'SGST_14', 'rate' => 14, 'is_active' => 1],
            ['name' => 'UTGST_14', 'rate' => 14, 'is_active' => 1],
            ['name' => 'IGST_28', 'rate' => 28, 'is_active' => 1],
        ];

        DB::table('taxes')->insert($taxes);
    }
}
