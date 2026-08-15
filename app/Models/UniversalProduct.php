<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UniversalProduct extends Model
{
    use HasFactory;

    protected $table = 'universal_products';

    protected $fillable = [
        'name',
        'slug',
        'description',
        'salt_composition',
        'manufacturer',
        'hsn_code',
        'gst_rate',
        'drug_schedule',
        'medicine_category_id',
        'verified',
    ];

    protected $casts = [
        'verified' => 'boolean',
        'gst_rate' => 'decimal:2',
    ];

    public function medicineCategory()
    {
        return $this->belongsTo(MedicineCategory::class, 'medicine_category_id');
    }

    /**
     * Alias for category relationship.
     */
    public function category()
    {
        return $this->medicineCategory();
    }
}
