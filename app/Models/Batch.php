<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Batch extends Model
{
    use HasFactory;

    protected $fillable = [
        'shop_id',
        'product_id',
        'batch_no',
        'expiry_date',
        'quantity',
        'purchase_price',
        'mrp',
    ];

    protected $casts = [
        'expiry_date'    => 'date',
        'quantity'       => 'integer',
        'purchase_price' => 'decimal:2',
        'mrp'            => 'decimal:2',
    ];

    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
