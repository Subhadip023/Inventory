<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Models\UserSetting;

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
        return Inertia::render('SuperAdmin/Dashboard');
    }
}
