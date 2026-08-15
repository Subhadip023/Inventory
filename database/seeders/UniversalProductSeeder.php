<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\UniversalProduct;
use App\Models\MedicineCategory;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UniversalProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Truncate universal_products to refresh catalog
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        UniversalProduct::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Get category lookup map by name
        $categoryMap = MedicineCategory::pluck('id', 'name')->toArray();

        $products = [
            [
                'name' => 'Paracetamol 500mg',
                'description' => 'Effective pain reliever and fever reducer.',
                'salt_composition' => 'Paracetamol IP 500mg',
                'manufacturer' => 'Cipla Ltd',
                'hsn_code' => '30049099',
                'gst_rate' => 12.00,
                'drug_schedule' => 'OTC',
                'category' => 'Tablet',
                'verified' => true,
            ],
            [
                'name' => 'Amoxicillin 500mg',
                'description' => 'Broad-spectrum penicillin antibiotic for bacterial infections.',
                'salt_composition' => 'Amoxicillin Trihydrate 500mg',
                'manufacturer' => 'Sun Pharma',
                'hsn_code' => '30041010',
                'gst_rate' => 12.00,
                'drug_schedule' => 'H',
                'category' => 'Capsule',
                'verified' => true,
            ],
            [
                'name' => 'Azithromycin 500mg',
                'description' => 'Macrolide antibiotic used for respiratory and soft tissue infections.',
                'salt_composition' => 'Azithromycin Dihydrate 500mg',
                'manufacturer' => 'Lupin Ltd',
                'hsn_code' => '30042099',
                'gst_rate' => 12.00,
                'drug_schedule' => 'H',
                'category' => 'Tablet',
                'verified' => true,
            ],
            [
                'name' => 'Benadryl Cough Syrup 100ml',
                'description' => 'Relieves cough, throat irritation, and congestion symptoms.',
                'salt_composition' => 'Diphenhydramine HCl 14mg + Ammonium Chloride 138mg',
                'manufacturer' => 'Johnson & Johnson',
                'hsn_code' => '30049099',
                'gst_rate' => 12.00,
                'drug_schedule' => 'OTC',
                'category' => 'Syrup',
                'verified' => true,
            ],
            [
                'name' => 'Diclofenac Pain Relief Gel 30g',
                'description' => 'Topical anti-inflammatory gel for joint and muscle pain.',
                'salt_composition' => 'Diclofenac Diethylamine 1.16% w/w',
                'manufacturer' => 'Ranbaxy / Sun Pharma',
                'hsn_code' => '30049099',
                'gst_rate' => 12.00,
                'drug_schedule' => 'OTC',
                'category' => 'Gel',
                'verified' => true,
            ],
            [
                'name' => 'Pantoprazole 40mg',
                'description' => 'Proton pump inhibitor for acid reflux and acidity management.',
                'salt_composition' => 'Pantoprazole Sodium 40mg',
                'manufacturer' => 'Alkem Laboratories',
                'hsn_code' => '30049099',
                'gst_rate' => 12.00,
                'drug_schedule' => 'H',
                'category' => 'Tablet',
                'verified' => true,
            ],
            [
                'name' => 'Insulin Glargine 100IU/ml',
                'description' => 'Long-acting basal insulin analog for diabetes mellitus.',
                'salt_composition' => 'Recombinant Human Insulin Glargine 100IU',
                'manufacturer' => 'Sanofi India',
                'hsn_code' => '30043110',
                'gst_rate' => 5.00,
                'drug_schedule' => 'H',
                'category' => 'Injection',
                'verified' => true,
            ],
            [
                'name' => 'Ciprofloxacin Eye Drops 5ml',
                'description' => 'Antibacterial ophthalmic solution for eye infections.',
                'salt_composition' => 'Ciprofloxacin 0.3% w/v',
                'manufacturer' => 'Cipla Ltd',
                'hsn_code' => '30049099',
                'gst_rate' => 12.00,
                'drug_schedule' => 'H',
                'category' => 'Drops',
                'verified' => true,
            ],
            [
                'name' => 'Cetirizine 10mg',
                'description' => 'Antihistamine for allergic rhinitis and skin allergies.',
                'salt_composition' => 'Cetirizine Dihydrochloride 10mg',
                'manufacturer' => 'Dr. Reddys Laboratories',
                'hsn_code' => '30049099',
                'gst_rate' => 12.00,
                'drug_schedule' => 'OTC',
                'category' => 'Tablet',
                'verified' => true,
            ],
            [
                'name' => 'Betadine Antiseptic Ointment 20g',
                'description' => 'First-aid microbicidal ointment for minor cuts and wounds.',
                'salt_composition' => 'Povidone-Iodine 5% w/w',
                'manufacturer' => 'Win-Medicare',
                'hsn_code' => '30049099',
                'gst_rate' => 12.00,
                'drug_schedule' => 'OTC',
                'category' => 'Ointment',
                'verified' => true,
            ],
            [
                'name' => 'ORSL Oral Rehydration Powder 21g',
                'description' => 'Restores fluids and essential electrolytes lost due to dehydration.',
                'salt_composition' => 'Sodium Chloride + Potassium Chloride + Dextrose',
                'manufacturer' => 'Abbott Healthcare',
                'hsn_code' => '30049099',
                'gst_rate' => 18.00,
                'drug_schedule' => 'OTC',
                'category' => 'Powder',
                'verified' => true,
            ],
            [
                'name' => 'Asthalin Inhaler 100mcg',
                'description' => 'Bronchodilator for rapid relief of asthma and bronchospasm.',
                'salt_composition' => 'Salbutamol 100mcg per dose',
                'manufacturer' => 'Cipla Ltd',
                'hsn_code' => '30049099',
                'gst_rate' => 12.00,
                'drug_schedule' => 'H',
                'category' => 'Inhaler',
                'verified' => true,
            ],
            [
                'name' => 'Calamine Skin Lotion 100ml',
                'description' => 'Soothing lotion for mild skin itching, sunburns, and insect bites.',
                'salt_composition' => 'Calamine 15% + Zinc Oxide 5%',
                'manufacturer' => 'Piramal Pharma',
                'hsn_code' => '33049990',
                'gst_rate' => 18.00,
                'drug_schedule' => 'OTC',
                'category' => 'Lotion',
                'verified' => true,
            ],
            [
                'name' => 'Combiflam Tablet',
                'description' => 'Dual action analgesic for head, muscle, and body aches.',
                'salt_composition' => 'Ibuprofen 400mg + Paracetamol 325mg',
                'manufacturer' => 'Sanofi India',
                'hsn_code' => '30049099',
                'gst_rate' => 12.00,
                'drug_schedule' => 'OTC',
                'category' => 'Tablet',
                'verified' => true,
            ],
            [
                'name' => 'Multivitamin & Mineral Capsules',
                'description' => 'Daily dietary supplement supporting overall health and immunity.',
                'salt_composition' => 'Essential Vitamins + Minerals + Zinc',
                'manufacturer' => 'Mankind Pharma',
                'hsn_code' => '21069099',
                'gst_rate' => 18.00,
                'drug_schedule' => 'OTC',
                'category' => 'Capsule',
                'verified' => true,
            ],
        ];

        foreach ($products as $item) {
            $catName = $item['category'];
            $catId = $categoryMap[$catName] ?? null;

            UniversalProduct::create([
                'name' => $item['name'],
                'slug' => Str::slug($item['name']),
                'description' => $item['description'],
                'salt_composition' => $item['salt_composition'],
                'manufacturer' => $item['manufacturer'],
                'hsn_code' => $item['hsn_code'],
                'gst_rate' => $item['gst_rate'],
                'drug_schedule' => $item['drug_schedule'],
                'medicine_category_id' => $catId,
                'verified' => $item['verified'],
            ]);
        }
    }
}
