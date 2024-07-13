<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class IsMerchant
{
    public function handle(Request $request, Closure $next)
    {
        if (auth()->user() && auth()->user()->type == 'merchant') {
            return $next($request);
        }

        return response()->json(['message' => 'Akses ditolak'], 403);
    }
}
