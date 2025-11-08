<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserActivityLog extends Model
{
    use HasFactory;
    public $timestamps = false;
    // Fillable fields for mass assignment
    protected $fillable = [
        'user_id',
        'activity_type',
        'description',
        'ip_address',
        'user_agent',
        'activity_time',
    ];

    // Dates to automatically cast to Carbon instances
    protected $dates = [
        'activity_time'   
    ];

    /**
     * Relationship to the User
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
