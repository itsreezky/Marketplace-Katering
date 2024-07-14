<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Merchant;
use App\Models\Menu;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;

class MerchantController extends Controller
{
    public function updateProfile(Request $request)
    {
        $merchant = Merchant::where('user_id', Auth::id())->firstOrFail();
        $merchant->update($request->all());

        return response()->json(['message' => 'Profile updated successfully', 'merchant' => $merchant], 200);
    }

    public function addMenu(Request $request)
    {
        $merchant = Merchant::where('user_id', Auth::id())->firstOrFail();

        $menu = $merchant->menus()->create($request->all());

        return response()->json(['message' => 'Menu added successfully', 'menu' => $menu], 201);
    }

    public function updateMenu(Request $request, $id)
    {
        $menu = Menu::findOrFail($id);
        $menu->update($request->all());

        return response()->json(['message' => 'Menu updated successfully', 'menu' => $menu], 200);
    }

    public function deleteMenu($id)
    {
        $menu = Menu::findOrFail($id);
        $menu->delete();

        return response()->json(['message' => 'Menu deleted successfully'], 200);
    }

    public function listOrders()
    {
        $merchant = Merchant::where('user_id', Auth::id())->firstOrFail();
        $orders = Order::whereHas('menu', function($query) use ($merchant) {
            $query->where('merchant_id', $merchant->id);
        })->get();

        return response()->json(['orders' => $orders], 200);
    }
}
