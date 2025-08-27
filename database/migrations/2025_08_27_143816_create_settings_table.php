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
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('shop_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            // Theme
            $table->enum('theme_mode', ['light', 'dark', 'system'])->default('light');

            // Currency & Locale
            $table->string('currency', 10)->default('INR');
            $table->string('timezone')->default('Asia/Kolkata');
            $table->string('language', 10)->default('en');

            // Tax & GST
            $table->boolean('gst_inclusive')->default(true); // Prices include GST or not
            $table->decimal('default_tax_rate', 5, 2)->default(0.00); // fallback tax %

            // Invoice / Billing
            $table->boolean('show_gst_in_invoice')->default(true);
            $table->boolean('show_logo_in_invoice')->default(true);
            $table->boolean('round_off')->default(false);

            // Payment / Checkout
            $table->boolean('enable_upi')->default(true);
            $table->boolean('enable_cash_on_delivery')->default(false);

            // Defaults
            $table->boolean('is_default_store')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
