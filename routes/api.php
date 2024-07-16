<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MerchantController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\InvoiceController;

Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('user-details', [UserController::class, 'userDetails']);
    Route::put('update-user', [UserController::class, 'updateUser']);
    Route::post('update-photo', [UserController::class, 'updatePhoto']);

    Route::get('merchant-details', [MerchantController::class, 'merchantDetails']);
    Route::post('menu', [MerchantController::class, 'storeMenu']);
    Route::put('menu/{id}', [MerchantController::class, 'updateMenu']);
    Route::delete('menu/{id}', [MerchantController::class, 'deleteMenu']);
    Route::put('confirm-payment/{id}', [MerchantController::class, 'confirmPayment']);

    Route::get('order-details', [OrderController::class, 'orderDetails']);
    Route::post('create-order', [OrderController::class, 'createOrder']);

    Route::post('upload-payment-proof/{id}', [InvoiceController::class, 'uploadPaymentProof']);

    // Rute baru untuk mendapatkan semua invoice berdasarkan id_customer dan id_merchant
    Route::get('invoices/customer/{customerId}', [InvoiceController::class, 'getInvoicesByCustomer']);
    Route::get('invoices/merchant/{merchantId}', [InvoiceController::class, 'getInvoicesByMerchant']);
});
