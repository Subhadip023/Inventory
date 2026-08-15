<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'shop_id',
        'customer_id',
        'created_by',
        'grand_total',
        'discount',
        'tax',
        'net_amount',
        'paid_amount',
        'payment_status',
        'status',
    ];

    protected $casts = [
        'grand_total' => 'decimal:2',
        'discount' => 'decimal:2',
        'tax' => 'decimal:2',
        'net_amount' => 'decimal:2',
        'paid_amount' => 'decimal:2',
    ];

    public function shop()
    {
        return $this->belongsTo(Shop::class, 'shop_id');
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class, 'order_id');
    }

    public function ledgerEntries()
    {
        return $this->hasMany(CustomerLedger::class, 'order_id');
    }

    public function addProducts(array $products)
    {
        return $this->orderItems()->createMany($products);
    }

    /**
     * Recalculates paid_amount and payment_status derived from associated payments.
     */
    public function recalculatePaymentStatus(): void
    {
        $paidSum = (float) $this->payments()->sum('amount');
        $targetTotal = (float) $this->net_amount > 0 ? (float) $this->net_amount : (float) $this->grand_total;

        $status = 'unpaid';
        if ($paidSum >= $targetTotal && $targetTotal > 0) {
            $status = 'paid';
        } elseif ($paidSum > 0) {
            $status = 'partial';
        }

        $this->update([
            'paid_amount' => $paidSum,
            'payment_status' => $status,
        ]);
    }
}
