<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Models\UserSetting;
use App\Models\MedicineCategory;
use App\Models\UniversalProduct;
use App\Models\Shop;
use App\Models\User;

class HomeController extends Controller
{
    public function index(){

        if (auth()->check()) {
            $stores = auth()->user()->shops()->get();
            $setting=UserSetting::where('user_id', auth()->user()->id)->select('theme')->first();
            
            session()->put('theme_mode', $setting->theme ?? 'light');   
            log_user_activity('welcome', 'User visited home page');
     
        }
        
        return Inertia::render('Welcome', ['stores' => $stores ?? []]);
    }

    public function superadminDashboard(){
        log_user_activity('dashboard', 'User visited dashboard');

        $medicineCategories = MedicineCategory::orderBy('name')->get();
        $stats = [
            'total_medicine_categories' => $medicineCategories->count(),
            'total_universal_products' => UniversalProduct::count(),
            'total_shops' => Shop::count(),
            'total_users' => User::count(),
        ];

        return Inertia::render('SuperAdmin/Dashboard', [
            'medicineCategories' => $medicineCategories,
            'stats' => $stats,
        ]);
    }
}
