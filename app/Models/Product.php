<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;
    protected $fillable = [
        'universal_products_id',
        'sku',
        'price',
        'quantity',
        'shop_id',
    ];

    public function universal_product()
    {
        return $this->belongsTo(UniversalProduct::class, 'universal_products_id');
    }
}
