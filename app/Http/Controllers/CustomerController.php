<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Customer;
use App\Models\Merchant;

class CustomerController extends Controller
{
    public function updateProfile(Request $request)
    {
        $customer = Auth::user()->customer;

        $validatedData = $request->validate([
            'company_name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'contact' => 'required|string|max:255'
        ]);

        $customer->update($validatedData);

        return response()->json([
            'message' => 'Profil customer berhasil diperbarui',
            'customer' => $customer
        ], 200);
    }

    public function searchCatering(Request $request)
    {
        $query = $request->input('query');

        $merchants = Merchant::where('company_name', 'like', "%$query%")
                            ->orWhere('address', 'like', "%$query%")
                            ->get();

        return response()->json($merchants, 200);
    }
}
