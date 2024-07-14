<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Customer;
use App\Models\Merchant;

class UserController extends Controller
{
    public function getAllUsers()
    {
        $users = User::with(['customer', 'merchant'])->get();

        return response()->json([
            'users' => $users
        ], 200);
    }

    public function getUserProfile(Request $request)
    {
        $user = auth()->user();

        if ($user->role === 'customer') {
            $profile = Customer::where('user_id', $user->id)->first();
        } elseif ($user->role === 'merchant') {
            $profile = Merchant::where('user_id', $user->id)->first();
        } else {
            return response()->json(['error' => 'Invalid user role'], 400);
        }

        return response()->json([
            'user' => $user,
            'profile' => $profile
        ], 200);
    }
}
