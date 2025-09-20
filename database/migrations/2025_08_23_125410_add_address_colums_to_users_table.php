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
        Schema::table('users', function (Blueprint $table) {
            if(!Schema::hasColumn('users', 'pincode')) {
                $table->string('pincode')->after('phone_number')->nullable();
            }            
            $table->string('city')->after('pincode')->nullable();
            $table->string('state')->after('city')->nullable();
            $table->string('country')->after('state')->nullable();
            $table->string('landmark')->after('country')->nullable();
            $table->string('street_number')->after('landmark')->nullable();
            $table->string('street_name')->after('street_number')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('pincode');
            $table->dropColumn('city');
            $table->dropColumn('state');
            $table->dropColumn('country');
            $table->dropColumn('landmark');
            $table->dropColumn('street_number');
            $table->dropColumn('street_name');
        });
    }
};
