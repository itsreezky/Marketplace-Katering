<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Invoice;

class InvoiceController extends Controller
{
    // Upload bukti pembayaran
    public function uploadPaymentProof(Request $request, $id)
    {
        $request->validate([
            'bukti_pembayaran' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $path = $request->file('bukti_pembayaran')->store('public/payment_proofs');

        $invoice = Invoice::findOrFail($id);
        $invoice->update(['bukti_pembayaran' => $path]);

        return response()->json(['message' => 'Bukti pembayaran berhasil diunggah'], 200);
    }

    // Mendapatkan semua invoice berdasarkan id_customer
    public function getInvoicesByCustomer($customerId)
    {
        $invoices = Invoice::where('id_customer', $customerId)->get();
        return response()->json($invoices, 200);
    }

    // Mendapatkan semua invoice berdasarkan id_merchant
    public function getInvoicesByMerchant($merchantId)
    {
        $invoices = Invoice::where('id_merchant', $merchantId)->get();
        return response()->json($invoices, 200);
    }
}
