<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShopCategoriesController;
use App\Models\ShopCategories;
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
use App\Http\Controllers\UserSettingController;
use App\Http\Controllers\ShopProductController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ShopRolePermissionController;
use App\Http\Controllers\UniversalProductController;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/dashboard',  function () {
    log_user_activity('dashboard', 'User visited dashboard');
    if(auth()->user()->hasRole('super-admin')){
        return redirect()->route('superadmin.dashboard');
    }
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

Route::resource('orders', OrderController::class)->middleware('auth');
Route::resource('users', UserController::class)->middleware('auth');
Route::post('users-add-profile', [UserController::class, 'addProfile'])->name('user.profile.add')->middleware('auth');
Route::post('users-status-change', [UserController::class, 'statusChange'])->name('user.status.change')->middleware('auth');

Route::post('/getCity', [CountryStateCityController::class, 'getCity'])->name('getCity');

Route::resource('shops', ShopController::class)->middleware('auth');
Route::post('setShop', [ShopController::class, 'setShop'])->name('setShop')->middleware('auth');
Route::get('store/dashboard', StoreDashboardController::class )->name('shop.dashboard');
Route::prefix('store')->group(function () {
   Route::resource('products', ProductController::class)->middleware('auth');

})->middleware('auth');

Route::post('/editShopeImage', [ShopController::class, 'editShopeImage'])->name('editShopeImage');

Route::prefix('user')->group(function () {
Route::resource('settings', UserSettingController::class);
})->middleware('auth');


Route::prefix('shops/{shopId}')->group(function () {
    Route::get('roles', [ShopRolePermissionController::class, 'index'])->name('shop.roles.index');
    Route::get('roles/create', [ShopRolePermissionController::class, 'create'])->name('shop.roles.create');
    Route::post('roles', [ShopRolePermissionController::class, 'store'])->name('shop.roles.store');
    Route::post('roles/assign', [ShopRolePermissionController::class, 'assignRoleToUser'])->name('shop.roles.assign');
});









Route::get('/php-info', function () {
    phpinfo();
});



require __DIR__.'/auth.php';
require __DIR__.'/superadmin.php';
