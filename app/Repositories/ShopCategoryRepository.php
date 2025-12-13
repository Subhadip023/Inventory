<?php


namespace App\Repositories;
use App\Models\ShopCategories;
use App\Repositories\Interfaces\ShopCategoriesRepositoryInterface;
use App\Models\CategoryTaxes;

class ShopCategoryRepository implements ShopCategoriesRepositoryInterface{
    public function all(){
        return ShopCategories::with('categoryTaxes.tax')->get();
    }  
    public function allActiveCategoryIdName(){
        $allCat=ShopCategories::where('is_active',true)->get();
        $allCat = $allCat->map(function($cat){
            return [
                'id'=>$cat->id,
                'name'=>$cat->name
            ];
        });
        return $allCat;    }
    public function create(array $data){
        return ShopCategories::create(attributes: $data);
    }
    public function update(int $id, array $data)
    {
        // Remove null values
        $data = array_filter($data, fn($value) => !is_null($value));

        $shopCategory = ShopCategories::find($id);

        if (!$shopCategory) {
            return false;
        }

        // 1️⃣ Update category basic fields
        $shopCategory->update([
            'name'      => $data['name'] ?? $shopCategory->name,
            'is_active' => $data['is_active'] ?? $shopCategory->is_active,
        ]);

        // 2️⃣ Update category taxes if provided
        if (isset($data['tax_ids']) && is_array($data['tax_ids'])) {

            // Remove old taxes
            CategoryTaxes::where('category_id', $shopCategory->id)->delete();

            // Insert new taxes
            foreach ($data['tax_ids'] as $taxId) {
                CategoryTaxes::create([
                    'category_id'    => $shopCategory->id,
                    'tax_id'         => $taxId,
                    'tax_percentage' => 0,
                ]);
            }
        }

        return true;
    }

    public function delete(int $id){
        $shopCategory = ShopCategories::find($id);
        if($shopCategory){
            return $shopCategory->delete();
        }else{
            return false;
        }
    }
}