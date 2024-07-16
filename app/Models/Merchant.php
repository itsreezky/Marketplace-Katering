<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Merchant extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_merchant', 'nama_kantor', 'no_hp', 'alamat', 'foto_profile',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_merchant');
    }

    public function menu()
    {
        return $this->hasMany(KelolaMenu::class, 'id_merchant');
    }

    public function orders()
    {
        return $this->hasMany(DaftarOrder::class, 'id_merchant');
    }

    public function invoices()
    {
        return $this->hasMany(Invoice::class, 'id_merchant');
    }
}

