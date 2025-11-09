<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UpdateUserActivity
{
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check()) {
            $user = Auth::user();

            if (
                !$user->last_activity_at ||
                $user->last_activity_at->diffInMinutes(now()) >= 1
            ) {
                $user->update([
                    'user_status_id' => 1,
                    'last_activity_at' => now(),
                ]);
            }
        }

        return $next($request);
    }
}
