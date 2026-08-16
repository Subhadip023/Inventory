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
        Schema::create('batches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('shop_id')->constrained('shops')->cascadeOnDelete();
            $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
            $table->string('batch_no');
            $table->date('expiry_date')->nullable();
            $table->integer('quantity')->default(0);
            $table->decimal('purchase_price', 10, 2)->nullable();
            $table->decimal('mrp', 10, 2)->nullable();
            $table->decimal('selling_price', 10, 2)->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->unique(['product_id', 'batch_no']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('batches');
    }
};
