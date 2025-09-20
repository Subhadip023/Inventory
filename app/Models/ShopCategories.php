<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use function Laravel\Prompts\table;

class ShopCategories extends Model
{
    protected $fillable = ['name', 'is_active'];
}
