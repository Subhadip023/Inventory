<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryTaxes extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryTaxesFactory> */
    use HasFactory;
    protected $guarded = [];

    public function category(){
        return $this->belongsTo(ShopCategories::class,'category_id');
    }

    public function tax(){
        return $this->belongsTo(Tax::class,'tax_id');
    }

}
