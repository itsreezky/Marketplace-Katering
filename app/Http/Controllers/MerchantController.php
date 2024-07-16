<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\KelolaMenu;
use App\Models\DaftarOrder;
use App\Models\Invoice;

class MerchantController extends Controller
{
    // Menampilkan data merchant yang sedang login
    public function merchantDetails()
    {
        $user = auth()->user();
        $merchant = $user->merchant;

        $menu = KelolaMenu::where('id_merchant', $merchant->id)->get();
        $orders = DaftarOrder::where('id_merchant', $merchant->id)->get();
        $invoices = Invoice::where('id_merchant', $merchant->id)->get();

        return response()->json(['merchant' => $merchant, 'menu' => $menu, 'orders' => $orders, 'invoices' => $invoices], 200);
    }

    // CRUD Kelola Menu
    public function storeMenu(Request $request)
    {
        $request->validate([
            'nama_menu' => 'required|string|max:255',
            'stok_menu' => 'required|integer',
            'harga_menu' => 'required|numeric',
            'deskripsi_menu' => 'required|string',
            'foto_menu' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $menu = new KelolaMenu($request->only('nama_menu', 'stok_menu', 'harga_menu', 'deskripsi_menu'));
        if ($request->hasFile('foto_menu')) {
            $path = $request->file('foto_menu')->store('public/menu_photos');
            $menu->foto_menu = $path;
        }

        $menu->id_merchant = auth()->user()->merchant->id;
        $menu->save();

        return response()->json(['message' => 'Menu berhasil ditambahkan', 'menu' => $menu], 201);
    }

    public function updateMenu(Request $request, $id)
    {
        $request->validate([
            'nama_menu' => 'string|max:255',
            'stok_menu' => 'integer',
            'harga_menu' => 'numeric',
            'deskripsi_menu' => 'string',
            'foto_menu' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $menu = KelolaMenu::findOrFail($id);
        $menu->update($request->only('nama_menu', 'stok_menu', 'harga_menu', 'deskripsi_menu'));

        if ($request->hasFile('foto_menu')) {
            $path = $request->file('foto_menu')->store('public/menu_photos');
            $menu->update(['foto_menu' => $path]);
        }

        return response()->json(['message' => 'Menu berhasil diperbarui', 'menu' => $menu], 200);
    }

    public function deleteMenu($id)
    {
        $menu = KelolaMenu::findOrFail($id);
        $menu->delete();

        return response()->json(['message' => 'Menu berhasil dihapus'], 200);
    }

    // Konfirmasi pembayaran dan update status order
    public function confirmPayment(Request $request, $id)
    {
        $request->validate([
            'status_pembayaran' => 'required|in:Menunggu Konfirmasi,Pembayaran Diterima,Pembayaran Kadaluarsa',
        ]);

        $invoice = Invoice::findOrFail($id);
        $invoice->update($request->only('status_pembayaran'));

        $order = DaftarOrder::where('id_merchant', $invoice->id_merchant)
                            ->where('id_customer', $invoice->id_customer)
                            ->first();

        if ($request->status_pembayaran == 'Menunggu Konfirmasi') {
            $order->update(['status_order' => 'Pesanan pending']);
        } elseif ($request->status_pembayaran == 'Pembayaran Diterima') {
            $order->update(['status_order' => 'Pesanan disiapkan']);
        } elseif ($request->status_pembayaran == 'Pembayaran Kadaluarsa') {
            $order->update(['status_order' => 'Pesanan Gagal']);
        }

        return response()->json(['message' => 'Status pembayaran dan order berhasil diperbarui'], 200);
    }
}

