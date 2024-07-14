<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MerchantController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserController;

// Route untuk registrasi dan login
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout']);

// Route untuk mendapatkan profil pengguna yang sedang login
Route::middleware('auth:sanctum')->get('user/profile', [UserController::class, 'profile']);

// Route untuk merchant yang sedang login
Route::middleware(['auth:sanctum'])->group(function () {
    Route::put('merchant/profile', [MerchantController::class, 'updateProfile']);
    Route::get('merchant/orders', [MerchantController::class, 'getOrders']);
    Route::post('menu', [MenuController::class, 'store']);
    Route::put('menu/{id}', [MenuController::class, 'update']);
    Route::delete('menu/{id}', [MenuController::class, 'destroy']);
});

// Route untuk customer yang sedang login
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('customer/profile', [CustomerController::class, 'getProfile']);
    Route::put('customer/profile', [CustomerController::class, 'updateProfile']);
    Route::get('search/catering', [CustomerController::class, 'searchCatering']);
    Route::post('order', [OrderController::class, 'store']);
});
