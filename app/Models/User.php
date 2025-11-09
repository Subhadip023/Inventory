<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Repositories\CountryRepository;
use App\Repositories\CityRepository;
use App\Repositories\StateRepository;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Permission\Traits\HasRoles;
use App\Models\UserStatus;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable,SoftDeletes;
    use HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */

    protected $guard_name = 'web'; // default


    protected $dates = ['deleted_at'];
    protected $fillable = [
        'name',
        'email',
        'password',
        'user_type',
        'phone_number',
        'country',
        'state',
        'city',
        'pincode',
        'profile_image',
        'landmark',
        'street_number',
        'street_name',
        'added_by',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'last_activity_at' => 'datetime',

        ];
    }

    public function addedBy()
    {
        return $this->belongsTo(User::class, 'added_by');
    }

   protected $appends = ['full_address'];

    public function getFullAddressAttribute(): string
    {
        if ($this->street_number == null || $this->street_name == null || $this->landmark == null || $this->city == null || $this->state == null || $this->country == null || $this->pincode == null) {
            return '';
        }
        return "\n"
    . "House No. {$this->street_number}, {$this->street_name}\n"
    . "{$this->landmark}\n"
    . CityRepository::get_city_name($this->city) . " {$this->pincode}\n"
    . StateRepository::get_state_name($this->state) . "\n"
    . CountryRepository::get_country_name($this->country);

    }

    public function shops(){
        return $this->hasMany(Shop::class);
    }

    public function status(){
        return $this->belongsTo(UserStatus::class,'user_status_id');
    }

    public function manualStatus()
    {
        return $this->belongsTo(UserStatus::class, 'manual_status_id');
    }



 
}