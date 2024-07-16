<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Customer;
use App\Models\Merchant;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    // Registrasi user baru
    public function register(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|in:customer,merchant',
            'no_hp' => 'required|string|max:15',
            'nama_kantor' => 'required|string|max:255',
            'alamat' => 'required|string|max:255',
            'foto_profile' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $file = $request->file('foto_profile');
        $filename = $request->role . '_' . $request->nama . '_' . $file->getClientOriginalName();
        $file->storeAs('public/profile_photos', $filename);

        $user = User::create([
            'nama' => $request->nama,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'foto_profile' => $filename,
        ]);

        if ($user->role == 'Customer') {
            Customer::create([
                'id_customer' => $user->id,
                'no_hp' => $request->no_hp,
                'nama_kantor' => $request->nama_kantor,
                'alamat' => $request->alamat,
                'foto_profile' => $filename,
            ]);
        } else {
            Merchant::create([
                'id_merchant' => $user->id,
                'nama_kantor' => $request->nama_kantor,
                'no_hp' => $request->no_hp,
                'alamat' => $request->alamat,
                'foto_profile' => $filename,
            ]);
        }

        return response()->json(['message' => 'Registrasi berhasil'], 201);
    }


    // Login user
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Email atau password salah'],
            ]);
        }

        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json(['token' => $token, 'role' => $user->role], 200);
    }

    // Menampilkan data user yang sedang login
    public function userDetails()
    {
        $user = auth()->user();
        $roleDetails = null;

        if ($user->role == 'Customer') {
            $roleDetails = $user->customer;
        } else {
            $roleDetails = $user->merchant;
        }

        return response()->json(['user' => $user, 'details' => $roleDetails], 200);
    }

    // Edit data user yang sedang login
    public function updateUser(Request $request)
    {
        $user = auth()->user();

        $request->validate([
            'nama' => 'string|max:255',
            'email' => 'string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'string|min:8|nullable',
        ]);

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->update($request->only('nama', 'email'));

        if ($user->role == 'Customer') {
            $user->customer->update($request->only('no_hp', 'nama_kantor', 'alamat', 'foto_profile'));
        } else {
            $user->merchant->update($request->only('nama_kantor', 'no_hp', 'alamat', 'foto_profile'));
        }

        return response()->json(['message' => 'Data berhasil diperbarui'], 200);
    }

    // Edit foto user yang sedang login
    public function updatePhoto(Request $request)
    {
        $user = auth()->user();
        $request->validate([
            'foto_profile' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        //Cek Foto Lama
        $fotoLama = null;
        if ($user->role == 'Customer') {
            $fotoLama = $user->customer->foto_profile;
        } else {
            $fotoLama = $user->merchant->foto_profile;
        }

        // Hapus Foto Lama Jika Ada
        if ($fotoLama) {
            Storage::delete('public/profile_photos/' . $fotoLama);
        }

        // Menambahkan Foto Baru
        $file = $request->file('foto_profile');
        $filename = $user->role . '_' . $user->nama . '_' . $file->getClientOriginalName();
        $file->storeAs('public/profile_photos', $filename);

        $user->update(['foto_profile' => $filename]);

        if ($user->role == 'Customer') {
            $user->customer->update(['foto_profile' => $filename]);
        } else {
            $user->merchant->update(['foto_profile' => $filename]);
        }

        return response()->json(['message' => 'Foto berhasil diperbarui'], 200);
    }
}

