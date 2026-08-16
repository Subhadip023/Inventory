<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class ShopUser extends Pivot
{
    protected $table = 'shop_user';

    protected $guarded = [];

    const Shop_ROLES = [
        'owner' => 1,
        'manager' => 2,
        'staff' => 3,
    ];

    protected $casts = [
        'role' => 'integer',
        'shop_id' => 'integer',
        'user_id' => 'integer',
    ];

    public static function getRoleOptions(): array
    {
        return [
            self::Shop_ROLES['owner'] => 'Owner',
            self::Shop_ROLES['manager'] => 'Manager',
            self::Shop_ROLES['staff'] => 'Staff',
        ];
    }

    public function getRoleNameAttribute(): string
    {
        return self::getRoleOptions()[$this->role] ?? 'Unknown';
    }

    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
