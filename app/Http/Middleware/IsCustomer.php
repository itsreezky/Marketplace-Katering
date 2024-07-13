<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class IsCustomer
{
    public function handle(Request $request, Closure $next)
    {
        if (auth()->user() && auth()->user()->type == 'customer') {
            return $next($request);
        }

        return response()->json(['message' => 'Akses ditolak'], 403);
    }
}
