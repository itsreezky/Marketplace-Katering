<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Customer;
use App\Models\Merchant;

class CustomerController extends Controller
{

    // Fungsi untuk mendapatkan profil customer
    public function getProfile()
    {
        $customer = Auth::user()->customer;

        return response()->json($customer, 200);
    }

    // Fungsi untuk memperbarui profil customer
    public function updateProfile(Request $request)
    {
        $customer = Auth::user()->customer;

        // Validasi data input
        $validatedData = $request->validate([
            'company_name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'contact' => 'required|string|max:255'
        ]);

        // Memperbarui profil customer
        $customer->update($validatedData);

        // Mengembalikan respons sukses
        return response()->json([
            'message' => 'Profil customer berhasil diperbarui',
            'customer' => $customer
        ], 200);
    }

    // Fungsi untuk mencari catering berdasarkan query
    public function searchCatering(Request $request)
    {
        $query = $request->input('query');

        // Mencari merchant berdasarkan nama perusahaan atau alamat yang sesuai dengan query
        $merchants = Merchant::where('company_name', 'like', "%$query%")
                            ->orWhere('address', 'like', "%$query%")
                            ->get();

        return response()->json($merchants, 200);
    }
}
