<?php

namespace App\Providers;

use App\Repositories\Interfaces\UniversalProductRepositoryInterface;
use App\Repositories\UniversalProductRepository;
use App\Services\Interfaces\UniversalProductServiceInterface;
use App\Services\UniversalProductService;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use App\Repositories\Interfaces\ShopCategoriesRepositoryInterface;
use App\Repositories\ShopCategoryRepository;
use App\Repositories\Interfaces\UserRepositoryInterface;
use App\Repositories\UserRepository;
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //repository binding 
        $this->app->bind(
            UniversalProductRepositoryInterface::class,
            UniversalProductRepository::class
        );
        $this->app->bind(
            ShopCategoriesRepositoryInterface::class,
            ShopCategoryRepository::class
        );



        // service binding 
        $this->app->bind(
            UniversalProductServiceInterface::class,
            UniversalProductService::class
        );

        $this->app->bind(
           UserRepositoryInterface::class,
           UserRepository::class
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch( 3);
        
    }
}
