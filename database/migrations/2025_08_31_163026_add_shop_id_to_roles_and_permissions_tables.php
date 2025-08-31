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
       Schema::table('model_has_roles', function (Blueprint $table) {
            $table->unsignedBigInteger('shop_id')->nullable()->index();
        });

        Schema::table('model_has_permissions', function (Blueprint $table) {
            $table->unsignedBigInteger('shop_id')->nullable()->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('model_has_roles', function (Blueprint $table) {
            $table->dropColumn('shop_id');
        });

        Schema::table('model_has_permissions', function (Blueprint $table) {
            $table->dropColumn('shop_id');
        });
    }
};
