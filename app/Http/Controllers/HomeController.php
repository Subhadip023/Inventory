<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Models\Setting;

class HomeController extends Controller
{
    public function index(){
       
        if (auth()->check()) {
            $stores = auth()->user()->shops()->get();
            $setting=Setting::where('user_id', auth()->user()->id)->select('theme_mode')->first();
            session()->put('theme_mode', $setting->theme_mode ?? 'light');        
        }
        return Inertia::render('Welcome', ['stores' => $stores ?? []]);
    }
}
