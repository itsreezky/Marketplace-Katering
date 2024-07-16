<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_merchant', 'id_customer', 'jumlah_pembayaran', 'bukti_pembayaran', 'status_pembayaran',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'id_customer');
    }

    public function merchant()
    {
        return $this->belongsTo(Merchant::class, 'id_merchant');
    }
}
