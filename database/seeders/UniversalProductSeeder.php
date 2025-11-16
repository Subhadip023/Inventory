<?php

namespace Database\Seeders;

use App\Models\ShopCategories;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\universalProduct;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\shopCategory;
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
        'shop_category_id' => 1
    ],
    [
        'name' => 'Ibuprofen',
        'description' => 'Anti-inflammatory and pain relief',
        'shop_category_id' => 1
    ],
    [
        'name' => 'Amoxicillin',
        'description' => 'Antibiotic for bacterial infections',
        'shop_category_id' => 1
    ],
    [
        'name' => 'Vitamin C',
        'description' => 'Immune system booster supplement',
        'shop_category_id' => 1
    ],
    [
        'name' => 'Cough Syrup',
        'description' => 'Relieves cough and cold symptoms',
        'shop_category_id' => 1
    ],
    [
        'name' => 'Band-Aids (20ct)',
        'description' => 'Adhesive bandages for minor cuts',
        'shop_category_id' => 1
    ],
    
    // Books
    [
        'name' => 'The Great Gatsby',
        'description' => 'Classic novel by F. Scott Fitzgerald',
        'shop_category_id' => 2
    ],
    [
        'name' => '1984',
        'description' => 'Dystopian novel by George Orwell',
        'shop_category_id' => 2
    ],
    [
        'name' => 'The Alchemist',
        'description' => 'Inspirational novel by Paulo Coelho',
        'shop_category_id' => 2
    ],
    [
        'name' => 'Harry Potter and the Sorcerer\'s Stone',
        'description' => 'Fantasy novel by J.K. Rowling',
        'shop_category_id' => 2
    ],
    [
        'name' => 'To Kill a Mockingbird',
        'description' => 'Pulitzer Prize-winning novel by Harper Lee',
        'shop_category_id' => 2
    ],
    [
        'name' => 'Dune',
        'description' => 'Classic science fiction novel by Frank Herbert',
        'shop_category_id' => 2
    ],

    // Grocery
    [
        'name' => 'Rice (Basmati)',
        'description' => 'Premium long-grain rice',
        'shop_category_id' => 3
    ],
    [
        'name' => 'Wheat Flour',
        'description' => 'Essential for making bread and chapati',
        'shop_category_id' => 3
    ],
    [
        'name' => 'Milk (1L)',
        'description' => 'Dairy product, full cream',
        'shop_category_id' => 3
    ],
    [
        'name' => 'Sugar',
        'description' => 'Refined white sugar',
        'shop_category_id' => 3
    ],
    [
        'name' => 'Cooking Oil (Sunflower)',
        'description' => 'Used for frying and cooking',
        'shop_category_id' => 3
    ],
    [
        'name' => 'Salt (Iodized)',
        'description' => 'Essential seasoning',
        'shop_category_id' => 3
    ],
    [
        'name' => 'Eggs (Dozen)',
        'description' => 'Farm fresh eggs',
        'shop_category_id' => 3
    ],
    [
        'name' => 'Bread (Whole Wheat)',
        'description' => 'Healthy whole grain bread loaf',
        'shop_category_id' => 3
    ],
    [
        'name' => 'Tea Leaves',
        'description' => 'Used for making tea',
        'shop_category_id' => 3
    ],
    [
        'name' => 'Coffee Powder',
        'description' => 'Ground coffee for brewing',
        'shop_category_id' => 3
    ],
];

        foreach ($products as $product) {
            universalProduct::create([
                'name' => $product['name'],
                'slug' => Str::slug($product['name']),
                'description' => $product['description'],
                'shop_category_id'=> $product['shop_category_id'],
                'verified' => rand(0, 1)
            ]);
        }
    }
}
