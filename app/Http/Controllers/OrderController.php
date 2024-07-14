<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    // Fungsi untuk membuat order baru
    public function store(Request $request)
    {
        // Validasi data input
        $validatedData = $request->validate([
            'menu_id' => 'required|exists:menus,id',
            'quantity' => 'required|integer|min:1',
            'delivery_date' => 'required|date',
        ]);

        // Membuat order baru untuk customer yang sedang login
        $order = Auth::user()->customer->orders()->create([
            'menu_id' => $validatedData['menu_id'],
            'merchant_id' => $request->input('merchant_id'),
            'quantity' => $validatedData['quantity'],
            'delivery_date' => $validatedData['delivery_date'],
            'status' => 'pending'
        ]);

        // Mengembalikan respons sukses
        return response()->json([
            'message' => 'Order berhasil dibuat',
            'order' => $order
        ], 201);
    }
}
