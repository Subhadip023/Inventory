<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    /** @use HasFactory<\Database\Factories\OrderFactory> */
    use HasFactory;


    protected $fillable = [
        'customer_id',
        'created_by',
        'grand_total',
        'discount',
        'tax',
        'net_amount',
        'status',
    ];

    public function customer()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

     public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function addProducts(array $products)
    {
        return $this->orderItems()->createMany($products);
    }
}
