<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (Schema::hasTable('orders') && !Schema::hasColumn('orders', 'shop_id')) {
            Schema::table('orders', function (Blueprint $table) {
                $table->unsignedBigInteger('shop_id')->nullable()->after('id')->index();
                $table->foreign('shop_id')->references('id')->on('shops')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('orders') && Schema::hasColumn('orders', 'shop_id')) {
            Schema::table('orders', function (Blueprint $table) {
                $table->dropForeign(['shop_id']);
                $table->dropIndex(['shop_id']);
                $table->dropColumn('shop_id');
            });
        }
    }
};
