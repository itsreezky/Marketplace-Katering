<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;


class OrderController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'menu_id' => 'required|exists:menus,id',
            'quantity' => 'required|integer|min:1',
            'delivery_date' => 'required|date',
        ]);

        $order = Auth::user()->customer->orders()->create([
            'menu_id' => $validatedData['menu_id'],
            'merchant_id' => $request->input('merchant_id'),
            'quantity' => $validatedData['quantity'],
            'delivery_date' => $validatedData['delivery_date'],
            'status' => 'pending'
        ]);

        return response()->json([
            'message' => 'Order berhasil dibuat',
            'order' => $order
        ], 201);
    }
}
