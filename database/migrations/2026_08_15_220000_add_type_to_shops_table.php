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
        if (Schema::hasTable('shops') && !Schema::hasColumn('shops', 'type')) {
            Schema::table('shops', function (Blueprint $table) {
                $table->unsignedTinyInteger('type')->default(1)->after('status')->comment('1: Retail, 2: Wholesale');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('shops') && Schema::hasColumn('shops', 'type')) {
            Schema::table('shops', function (Blueprint $table) {
                $table->dropColumn('type');
            });
        }
    }
};
