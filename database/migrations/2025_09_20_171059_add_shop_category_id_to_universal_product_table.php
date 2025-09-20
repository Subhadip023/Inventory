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
        Schema::table('universal_products', function (Blueprint $table) {
            $table->unsignedBigInteger('shop_category_id')->nullable()->after('description');
            $table->foreign('shop_category_id')->references('id')->on('shop_categories')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('universal_products', function (Blueprint $table) {
            $table->dropForeign(['shop_category_id']);
            $table->dropColumn('shop_category_id');
        });
    }
};
