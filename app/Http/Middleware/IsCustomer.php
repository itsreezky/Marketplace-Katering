<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class IsCustomer
{
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check() && Auth::user()->role === 'customer') {
            Log::info('Customer authenticated: ' . Auth::user()->id);
            return $next($request);
        }

        Log::warning('Unauthorized access attempt: ' . $request->ip());
        return response()->json(['message' => 'Unauthorized.'], 401);
    }
}
