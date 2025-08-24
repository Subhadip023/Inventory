<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CountryStateCityController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\StoreDashboardController;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/dashboard', function () {
    if(auth()->user()->shops()->count() == 0){
        return redirect()->route('home')->with('warning', 'Please add a shop first.');
    }

    return redirect('/');
    
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('products', ProductController::class)->middleware('auth');
Route::resource('orders', OrderController::class)->middleware('auth');
Route::resource('users', UserController::class)->middleware('auth');
Route::post('users-add-profile', [UserController::class, 'addProfile'])->name('user.profile.add')->middleware('auth');

Route::post('/getCity', [CountryStateCityController::class, 'getCity'])->name('getCity');

Route::resource('stores', ShopController::class)->middleware('auth');

Route::prefix('store')->group(function () {
    Route::get('/{shop}/dashboard', StoreDashboardController::class )->name('store.dashboard');
})->middleware('auth');

require __DIR__.'/auth.php';
