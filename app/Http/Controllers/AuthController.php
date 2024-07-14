<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // Fungsi untuk registrasi pengguna baru
    public function register(Request $request)
    {
        // Validasi data input
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'type' => 'required|in:merchant,customer'
        ]);

        // Membuat pengguna baru
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
            'type' => $validatedData['type']
        ]);

        // Login otomatis setelah registrasi
        Auth::login($user);

        // Menghasilkan token
        $token = $user->createToken('authToken')->plainTextToken;

        // Mengembalikan respons sukses
        return response()->json([
            'message' => 'Registrasi berhasil',
            'user' => $user,
            'token' => $token
        ], 201);
    }

    // Fungsi untuk login pengguna
    public function login(Request $request)
    {
        // Validasi data input
        $credentials = $request->only('email', 'password');

        // Mencoba login dengan kredensial yang diberikan
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            Log::info('User Authenticated:', ['user' => $user]);
            // Menghasilkan token
            try {
                $token = $user->createToken('authToken')->plainTextToken;
                Log::info('Token Created:', ['token' => $token]);

                return response()->json([
                    'message' => 'Login berhasil',
                    'user' => $user,
                    'token' => $token
                ], 200);
            } catch (\Exception $e) {
                Log::error('Token Creation Failed:', ['error' => $e->getMessage()]);
                return response()->json([
                    'message' => 'Failed to create token',
                    'error' => $e->getMessage()
                ], 500);
            }
        }

        // Mengembalikan respons error jika login gagal
        return response()->json([
            'message' => 'Email atau password salah'
        ], 401);
    }

    // Fungsi untuk logout pengguna
    public function logout(Request $request)
    {
        // Menghapus token saat ini
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout berhasil'
        ], 200);
    }
}
