<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id', 'merchant_id', 'menu_id', 'quantity', 'delivery_date', 'status'
    ];

    // Relasi ke model Customer
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    // Relasi ke model Merchant
    public function merchant()
    {
        return $this->belongsTo(Merchant::class);
    }

    // Relasi ke model Menu
    public function menu()
    {
        return $this->belongsTo(Menu::class);
    }
}
