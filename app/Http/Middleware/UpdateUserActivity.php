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
            $user->user_status_id = 1;
            $user->last_activity_at = now();
            $user->save();
        }

        return $next($request);
    }
}
