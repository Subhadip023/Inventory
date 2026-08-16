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
        Schema::create('universal_products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->nullable()->unique();
            $table->text('description')->nullable();
            $table->string('salt_composition')->nullable();
            $table->string('manufacturer')->nullable();
            $table->string('hsn_code', 20)->nullable();
            $table->decimal('gst_rate', 5, 2)->nullable();
            $table->enum('drug_schedule', ['OTC', 'H', 'H1', 'X', 'G'])->default('OTC');
            $table->foreignId('medicine_category_id')->nullable()->constrained('medicine_categories')->nullOnDelete();
            $table->boolean('verified')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('universal_products');
    }
};
