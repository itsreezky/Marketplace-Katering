<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_customer', 'no_hp', 'nama_kantor', 'alamat', 'foto_profile',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_customer');
    }

    public function orders()
    {
        return $this->hasMany(Order::class, 'id_customer');
    }

    public function invoices()
    {
        return $this->hasMany(Invoice::class, 'id_customer');
    }
}

