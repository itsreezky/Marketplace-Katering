<?php

use Illuminate\Support\Facades\Route;

// Route untuk menangani semua request lainnya dan menampilkan tampilan App
Route::get('/{path?}', function () {
    return view('App');
})->where('path', '.*');
