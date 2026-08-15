<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    /** @use HasFactory<\Database\Factories\ShopFactory> */
    use HasFactory;

    protected $guarded = [];

    const TYPE_RETAIL = 1;
    const TYPE_WHOLESALE = 2;

    protected $casts = [
        'type' => 'integer',
    ];

    protected $appends = [
        'type_name',
    ];

    public static function getTypeOptions(): array
    {
        return [
            self::TYPE_RETAIL => 'Retail',
            self::TYPE_WHOLESALE => 'Wholesale',
        ];
    }

    public function getTypeNameAttribute(): string
    {
        return $this->type === self::TYPE_WHOLESALE ? 'Wholesale' : 'Retail';
    }

    public function isRetail(): bool
    {
        return (int) $this->type === self::TYPE_RETAIL;
    }

    public function isWholesale(): bool
    {
        return (int) $this->type === self::TYPE_WHOLESALE;
    }
}
