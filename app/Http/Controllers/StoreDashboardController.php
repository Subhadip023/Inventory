<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Shop;
class StoreDashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, $shop)
    {
        session()->put('current_shop', $shop);
        $curent_shop = Shop::find($shop);
        // dd($curent_shop);
        return Inertia::render('Shop/DashBoard', [
            'curent_shop' => $curent_shop
        ]);
    }
}
