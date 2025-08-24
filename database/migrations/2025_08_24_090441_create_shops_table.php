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
        Schema::create('shops', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('slug')->unique();
            //shop details
            $table->string('shop_email');
            $table->string('shop_phone_number');
            $table->string('gst_number')->nullable()->unique();
            $table->string('pan_number')->nullable()->unique();
            $table->string('registration_number')->nullable();
            $table->string('registration_certificate')->nullable();
            $table->string('reg_upi_id')->nullable();
            $table->string('logo')->nullable();
            $table->enum('status', ['active', 'inactive'])->default('active');

            //address
            $table->string('pincode')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('country')->nullable();
            $table->string('landmark')->nullable();
            $table->string('street_number')->nullable();
            $table->string('street_name')->nullable();

            $table->timestamps();
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shops');
    }
};
