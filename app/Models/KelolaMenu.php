<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KelolaMenu extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_merchant', 'nama_menu', 'stok_menu', 'harga_menu', 'deskripsi_menu', 'foto_menu',
    ];

    public function merchant()
    {
        return $this->belongsTo(Merchant::class, 'id_merchant');
    }

    public function orders()
    {
        return $this->hasMany(DaftarOrder::class, 'id_menu');
    }
}

