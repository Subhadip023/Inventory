<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MedicineCategory;

class MedicineCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Tablet',
            'Syrup',
            'Injection',
            'Capsule',
            'Ointment',
            'Drops',
            'Gel',
            'Cream',
            'Powder',
            'Suspension',
            'Inhaler',
            'Lotion',
        ];

        foreach ($categories as $categoryName) {
            MedicineCategory::firstOrCreate(['name' => $categoryName]);
        }
    }
}
