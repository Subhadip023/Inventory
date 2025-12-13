<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use function Laravel\Prompts\table;

class ShopCategories extends Model
{
    protected $fillable = ['name', 'is_active'];

    public function categoryTaxes(){
        return $this->hasMany(CategoryTaxes::class,'category_id');
    }
}
