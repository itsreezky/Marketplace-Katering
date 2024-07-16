<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DaftarOrder extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_merchant', 'id_customer', 'id_menu', 'jumlah_order', 'no_hp', 'alamat_pengiriman', 'status_order',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'id_customer');
    }

    public function merchant()
    {
        return $this->belongsTo(Merchant::class, 'id_merchant');
    }

    public function menu()
    {
        return $this->belongsTo(KelolaMenu::class, 'id_menu');
    }
}

