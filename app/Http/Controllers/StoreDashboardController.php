<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class StoreDashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, $shop)
    {
        session()->put('current_shop', $shop);
        return Inertia::render('Shop/DashBoard');
    }
}
