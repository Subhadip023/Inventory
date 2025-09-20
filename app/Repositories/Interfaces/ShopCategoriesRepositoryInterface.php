<?php

namespace App\Repositories\Interfaces;

interface ShopCategoriesRepositoryInterface{
    public function all();
    public function create(array $data);

}