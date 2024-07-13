<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Menu;
use Illuminate\Support\Facades\Auth;


class MenuController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'photo' => 'required|string',
            'price' => 'required|numeric|min:0'
        ]);

        $menu = Auth::user()->merchant->menus()->create($validatedData);

        return response()->json([
            'message' => 'Menu berhasil ditambahkan',
            'menu' => $menu
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $menu = Menu::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'photo' => 'required|string',
            'price' => 'required|numeric|min:0'
        ]);

        $menu->update($validatedData);

        return response()->json([
            'message' => 'Menu berhasil diperbarui',
            'menu' => $menu
        ], 200);
    }

    public function destroy($id)
    {
        $menu = Menu::findOrFail($id);
        $menu->delete();

        return response()->json([
            'message' => 'Menu berhasil dihapus'
        ], 200);
    }
}
