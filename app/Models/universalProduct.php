<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class universalProduct extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description','shop_category_id','verified'];

    public function category()
    {
        return $this->belongsTo(ShopCategories::class, 'shop_category_id');
    }

}


