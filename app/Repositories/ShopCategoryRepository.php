<?php


namespace App\Repositories;
use App\Models\ShopCategories;
use App\Repositories\Interfaces\ShopCategoriesRepositoryInterface;


class ShopCategoryRepository implements ShopCategoriesRepositoryInterface{
    public function all(){
        return ShopCategories::all();
    }
    public function create(array $data){
        return ShopCategories::create($data);
    }
}