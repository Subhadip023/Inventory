<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $table = 'customers';

    protected $fillable = [
        'shop_id',
        'customer_type',
        'name',
        'phone',
        'address',
        'gst_number',
        'dl_number',
        'credit_limit',
    ];

    protected $casts = [
        'credit_limit' => 'decimal:2',
    ];

    protected $appends = [
        'current_balance',
    ];

    public function shop()
    {
        return $this->belongsTo(Shop::class, 'shop_id');
    }

    public function orders()
    {
        return $this->hasMany(Order::class, 'customer_id');
    }

    public function payments()
    {
        return $this->hasMany(Payment::class, 'customer_id');
    }

    public function ledgerEntries()
    {
        return $this->hasMany(CustomerLedger::class, 'customer_id');
    }

    /**
     * Derived current balance: sum of ledger entries.
     * Positive = customer owes money, Negative = customer paid extra / in credit.
     */
    public function getCurrentBalanceAttribute(): float
    {
        return (float) $this->ledgerEntries()->sum('amount');
    }
}
