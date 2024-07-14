<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;

    protected $fillable = [
        'merchant_id', 'name', 'description', 'photo', 'price'
    ];

    // Relasi ke model Merchant
    public function merchant()
    {
        return $this->belongsTo(Merchant::class);
    }
}
