<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\universalProduct;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
class UniversalProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
     $products = [
    // Medicines
    [
        'name' => 'Paracetamol',
        'description' => 'Pain reliever and fever reducer',
        'category' => 'Medicines'
    ],
    [
        'name' => 'Ibuprofen',
        'description' => 'Anti-inflammatory and pain relief',
        'category' => 'Medicines'
    ],
    [
        'name' => 'Amoxicillin',
        'description' => 'Antibiotic for bacterial infections',
        'category' => 'Medicines'
    ],
    [
        'name' => 'Vitamin C',
        'description' => 'Immune system booster supplement',
        'category' => 'Medicines'
    ],
    [
        'name' => 'Cough Syrup',
        'description' => 'Relieves cough and cold symptoms',
        'category' => 'Medicines'
    ],
    [
        'name' => 'Band-Aids (20ct)',
        'description' => 'Adhesive bandages for minor cuts',
        'category' => 'Medicines'
    ],
    
    // Books
    [
        'name' => 'The Great Gatsby',
        'description' => 'Classic novel by F. Scott Fitzgerald',
        'category' => 'Books'
    ],
    [
        'name' => '1984',
        'description' => 'Dystopian novel by George Orwell',
        'category' => 'Books'
    ],
    [
        'name' => 'The Alchemist',
        'description' => 'Inspirational novel by Paulo Coelho',
        'category' => 'Books'
    ],
    [
        'name' => 'Harry Potter and the Sorcerer\'s Stone',
        'description' => 'Fantasy novel by J.K. Rowling',
        'category' => 'Books'
    ],
    [
        'name' => 'To Kill a Mockingbird',
        'description' => 'Pulitzer Prize-winning novel by Harper Lee',
        'category' => 'Books'
    ],
    [
        'name' => 'Dune',
        'description' => 'Classic science fiction novel by Frank Herbert',
        'category' => 'Books'
    ],

    // Grocery
    [
        'name' => 'Rice (Basmati)',
        'description' => 'Premium long-grain rice',
        'category' => 'Grocery'
    ],
    [
        'name' => 'Wheat Flour',
        'description' => 'Essential for making bread and chapati',
        'category' => 'Grocery'
    ],
    [
        'name' => 'Milk (1L)',
        'description' => 'Dairy product, full cream',
        'category' => 'Grocery'
    ],
    [
        'name' => 'Sugar',
        'description' => 'Refined white sugar',
        'category' => 'Grocery'
    ],
    [
        'name' => 'Cooking Oil (Sunflower)',
        'description' => 'Used for frying and cooking',
        'category' => 'Grocery'
    ],
    [
        'name' => 'Salt (Iodized)',
        'description' => 'Essential seasoning',
        'category' => 'Grocery'
    ],
    [
        'name' => 'Eggs (Dozen)',
        'description' => 'Farm fresh eggs',
        'category' => 'Grocery'
    ],
    [
        'name' => 'Bread (Whole Wheat)',
        'description' => 'Healthy whole grain bread loaf',
        'category' => 'Grocery'
    ],
    [
        'name' => 'Tea Leaves',
        'description' => 'Used for making tea',
        'category' => 'Grocery'
    ],
    [
        'name' => 'Coffee Powder',
        'description' => 'Ground coffee for brewing',
        'category' => 'Grocery'
    ],
];

        foreach ($products as $product) {
            universalProduct::create([
                'name' => $product['name'],
                'slug' => Str::slug($product['name']),
                'category' => $product['category'],
                'description' => $product['description'],
                'verified' => rand(0, 1)
            ]);
        }
    }
}
