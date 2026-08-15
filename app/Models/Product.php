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
        'shop_id',
        'sku',
    ];

    public function universalProduct()
    {
        return $this->belongsTo(UniversalProduct::class, 'universal_products_id');
    }

    public function universal_product()
    {
        return $this->universalProduct();
    }

    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }

    public function batches()
    {
        return $this->hasMany(Batch::class);
    }

    /**
     * Total stock quantity accumulated across all batches.
     */
    public function getTotalQuantityAttribute(): int
    {
        return (int) $this->batches()->sum('quantity');
    }
}
