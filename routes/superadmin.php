<?php

use App\Http\Controllers\ShopCategoriesController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\superadminUsers;
use App\Http\Controllers\UniversalProductController;
use App\Http\Controllers\UserStatusController;

Route::prefix('superadmin')
    ->middleware(['auth', 'role:super-admin'])
    ->group(function () {
        Route::resource('role',  RoleController::class);
        Route::resource('permission', PermissionController::class);
        Route::resource('universal-products', UniversalProductController::class);
        Route::post('universal-products-search', [UniversalProductController::class, 'search'])->name('universal-products.search');
        Route::post('universal-products-change-status', [UniversalProductController::class, 'changeVarifyStatus'])->name('universal-products.changeVarifyStatus');
        Route::resource('shop-categories', ShopCategoriesController::class);
        Route::resource('users',superadminUsers::class);        
});


Route::prefix('superadmin')
    ->middleware(['auth', 'role:super-admin'])
    ->name('superadmin.')
    ->group(function () {
        Route::get('dashboard', [HomeController::class, 'superadminDashboard'])->name('dashboard');
        Route::resource('users',superadminUsers::class);        
        Route::resource('users-status',UserStatusController::class);        
});
