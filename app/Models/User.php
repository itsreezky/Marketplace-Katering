<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'nama', 'email', 'password', 'role',
    ];

    public function customer()
    {
        return $this->hasOne(Customer::class, 'id_customer');
    }

    public function merchant()
    {
        return $this->hasOne(Merchant::class, 'id_merchant');
    }
}

