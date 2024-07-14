<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Menu;
use Illuminate\Support\Facades\Auth;

class MenuController extends Controller
{
    // Fungsi untuk menambahkan menu baru
    public function store(Request $request)
    {
        // Validasi data input
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'photo' => 'required|string',
            'price' => 'required|numeric|min:0'
        ]);

        // Membuat menu baru untuk merchant yang sedang login
        $menu = Auth::user()->merchant->menus()->create($validatedData);

        // Mengembalikan respons sukses
        return response()->json([
            'message' => 'Menu berhasil ditambahkan',
            'menu' => $menu
        ], 201);
    }

    // Fungsi untuk memperbarui menu yang sudah ada
    public function update(Request $request, $id)
    {
        $menu = Menu::findOrFail($id);

        // Validasi data input
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'photo' => 'required|string',
            'price' => 'required|numeric|min:0'
        ]);

        // Memperbarui menu yang ada
        $menu->update($validatedData);

        // Mengembalikan respons sukses
        return response()->json([
            'message' => 'Menu berhasil diperbarui',
            'menu' => $menu
        ], 200);
    }

    // Fungsi untuk menghapus menu
    public function destroy($id)
    {
        $menu = Menu::findOrFail($id);
        $menu->delete();

        // Mengembalikan respons sukses
        return response()->json([
            'message' => 'Menu berhasil dihapus'
        ], 200);
    }
}
