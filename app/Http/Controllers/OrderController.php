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
        $order = Auth::user()->customer->orders()->create($validatedData);

        // Mengembalikan respons sukses
        return response()->json([
            'message' => 'Order berhasil dibuat',
            'order' => $order
        ], 201);
    }

    // Fungsi untuk memperbarui order yang sudah ada
    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        // Validasi data input
        $validatedData = $request->validate([
            'quantity' => 'required|integer|min:1',
            'delivery_date' => 'required|date',
        ]);

        // Memperbarui order yang ada
        $order->update($validatedData);

        // Mengembalikan respons sukses
        return response()->json([
            'message' => 'Order berhasil diperbarui',
            'order' => $order
        ], 200);
    }

    // Fungsi untuk menghapus order
    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();

        // Mengembalikan respons sukses
        return response()->json([
            'message' => 'Order berhasil dihapus'
        ], 200);
    }
}
