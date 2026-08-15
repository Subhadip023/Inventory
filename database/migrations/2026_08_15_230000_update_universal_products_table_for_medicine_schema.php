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
            if (Schema::hasColumn('universal_products', 'shop_category_id')) {
                try {
                    $table->dropForeign(['shop_category_id']);
                } catch (\Throwable $e) {
                }
                $table->dropColumn('shop_category_id');
            }

            if (!Schema::hasColumn('universal_products', 'salt_composition')) {
                $table->string('salt_composition')->nullable()->after('description');
            }

            if (!Schema::hasColumn('universal_products', 'manufacturer')) {
                $table->string('manufacturer')->nullable()->after('salt_composition');
            }

            if (!Schema::hasColumn('universal_products', 'hsn_code')) {
                $table->string('hsn_code', 20)->nullable()->after('manufacturer');
            }

            if (!Schema::hasColumn('universal_products', 'gst_rate')) {
                $table->decimal('gst_rate', 5, 2)->nullable()->after('hsn_code');
            }

            if (!Schema::hasColumn('universal_products', 'drug_schedule')) {
                $table->enum('drug_schedule', ['OTC', 'H', 'H1', 'X', 'G'])->default('OTC')->after('gst_rate');
            }

            if (!Schema::hasColumn('universal_products', 'medicine_category_id')) {
                $table->foreignId('medicine_category_id')->nullable()->constrained('medicine_categories')->after('drug_schedule');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('universal_products', function (Blueprint $table) {
            if (Schema::hasColumn('universal_products', 'medicine_category_id')) {
                try {
                    $table->dropForeign(['medicine_category_id']);
                } catch (\Throwable $e) {
                }
                $table->dropColumn('medicine_category_id');
            }

            if (Schema::hasColumn('universal_products', 'drug_schedule')) {
                $table->dropColumn('drug_schedule');
            }

            if (Schema::hasColumn('universal_products', 'gst_rate')) {
                $table->dropColumn('gst_rate');
            }

            if (Schema::hasColumn('universal_products', 'hsn_code')) {
                $table->dropColumn('hsn_code');
            }

            if (Schema::hasColumn('universal_products', 'manufacturer')) {
                $table->dropColumn('manufacturer');
            }

            if (Schema::hasColumn('universal_products', 'salt_composition')) {
                $table->dropColumn('salt_composition');
            }

            if (!Schema::hasColumn('universal_products', 'shop_category_id')) {
                $table->unsignedBigInteger('shop_category_id')->nullable()->after('description');
                $table->foreign('shop_category_id')->references('id')->on('shop_categories')->onDelete('set null');
            }
        });
    }
};
