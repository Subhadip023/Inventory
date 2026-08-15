<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UniversalProduct extends Model
{
    use HasFactory;

    protected $table = 'universal_products';

    protected $fillable = ['name', 'slug', 'description', 'shop_category_id', 'verified'];

    public function category()
    {
        return $this->belongsTo(ShopCategories::class, 'shop_category_id');
    }
}
