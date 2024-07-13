<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Merchant;

class MerchantController extends Controller
{
    public function updateProfile(Request $request)
    {
        $merchant = Auth::user()->merchant;

        $validatedData = $request->validate([
            'company_name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'contact' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        $merchant->update($validatedData);

        return response()->json([
            'message' => 'Profil merchant berhasil diperbarui',
            'merchant' => $merchant
        ], 200);
    }

    public function getOrders()
    {
        $merchant = Auth::user()->merchant;
        $orders = $merchant->orders;

        return response()->json($orders, 200);
    }
}
