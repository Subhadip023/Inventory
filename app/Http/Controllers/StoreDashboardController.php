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
    public function __invoke(Request $request)
    {
        $curent_shop_id=session()->get('current_shop');
        if(empty($curent_shop_id)){
            return redirect()->route('home');
        }
        $curent_shop = Shop::find($curent_shop_id);
        return Inertia::render('Shop/DashBoard', [
            'curent_shop' => $curent_shop,
        ]);
    }
}
