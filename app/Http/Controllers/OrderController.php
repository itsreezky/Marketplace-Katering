<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{
    // Menampilkan semua order berdasarkan user yang sedang login
    public function orderDetails()
    {
        $user = auth()->user();
        if ($user->role == 'Customer') {
            $orders = Order::where('id_customer', $user->customer->id)->get();
        } else {
            $orders = Order::where('id_merchant', $user->merchant->id)->get();
        }

        return response()->json(['orders' => $orders], 200);
    }

    // Membuat order baru
    public function createOrder(Request $request)
    {
        $request->validate([
            'id_merchant' => 'required|exists:merchants,id',
            'id_menu' => 'required|exists:kelola_menu,id',
            'jumlah_order' => 'required|integer',
            'no_hp' => 'required|string',
            'alamat_pengiriman' => 'required|string',
        ]);

        $order = new Order($request->only('id_merchant', 'id_menu', 'jumlah_order', 'no_hp', 'alamat_pengiriman'));
        $order->customer_id = auth()->user()->customer->id;
        $order->save();

        return response()->json(['message' => 'Order berhasil dibuat', 'order' => $order], 201);
    }
}
