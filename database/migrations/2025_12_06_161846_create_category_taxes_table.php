<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('category_taxes', function (Blueprint $table) {
            $table->id();

            // Columns first
            $table->unsignedBigInteger('category_id');
            $table->unsignedBigInteger('tax_id');
            $table->decimal('tax_percentage', 5, 2)->default(0);

            $table->timestamps();

            // Foreign keys after columns are defined
            $table->foreign('category_id')
                ->references('id')
                ->on('shop_categories')
                ->onDelete('cascade');

            $table->foreign('tax_id')
                ->references('id')
                ->on('taxes')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('category_taxes');
    }
};
