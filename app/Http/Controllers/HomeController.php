<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;


class HomeController extends Controller
{
    public function index(){
        $app_name='';
        return Inertia::render('Welcome',);
    }
}
