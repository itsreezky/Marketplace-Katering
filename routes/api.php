<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MerchantController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\UserController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::get('/users', [UserController::class, 'getAllUsers']);
    Route::get('/user/profile', [UserController::class, 'getUserProfile']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('merchant')->group(function () {
        Route::put('profile', [MerchantController::class, 'updateProfile']);
        Route::post('menu', [MerchantController::class, 'addMenu']);
        Route::put('menu/{id}', [MerchantController::class, 'updateMenu']);
        Route::delete('menu/{id}', [MerchantController::class, 'deleteMenu']);
        Route::get('orders', [MerchantController::class, 'listOrders']);
    });

    Route::prefix('customer')->group(function () {
        Route::get('search-catering', [CustomerController::class, 'searchCatering']);
        Route::post('order', [CustomerController::class, 'placeOrder']);
        Route::get('invoice/{id}', [CustomerController::class, 'viewInvoice']);
        Route::put('profile', [CustomerController::class, 'updateProfile']);
    });
});
