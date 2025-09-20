<?php


namespace App\Repositories;
use App\Models\ShopCategories;
use App\Repositories\Interfaces\ShopCategoriesRepositoryInterface;


class ShopCategoryRepository implements ShopCategoriesRepositoryInterface{
    public function all(){
        return ShopCategories::all();
    }
    public function create(array $data){
        return ShopCategories::create(attributes: $data);
    }
    public function update(int $id, array $data)    {
        $shopCategory = ShopCategories::find($id);
        if($shopCategory){
            return $shopCategory->update($data);
            
        }else{
            return false;
        }
            
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