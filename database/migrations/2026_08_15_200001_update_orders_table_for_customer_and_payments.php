<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Safely drop foreign key if it exists
        try {
            DB::statement("ALTER TABLE orders DROP FOREIGN KEY orders_customer_id_foreign");
        } catch (\Throwable $e) {
            // Foreign key does not exist
        }

        Schema::table('orders', function (Blueprint $table) {
            if (!Schema::hasColumn('orders', 'paid_amount')) {
                $table->decimal('paid_amount', 12, 2)->default(0.00)->after('net_amount');
            }

            if (!Schema::hasColumn('orders', 'payment_status')) {
                $table->enum('payment_status', ['unpaid', 'partial', 'paid'])->default('unpaid')->after('paid_amount');
            }
        });

        // Nullify any existing customer_id values that don't exist in customers table to avoid integrity violation
        if (Schema::hasTable('orders') && Schema::hasColumn('orders', 'customer_id')) {
            DB::statement("UPDATE orders SET customer_id = NULL WHERE customer_id IS NOT NULL AND customer_id NOT IN (SELECT id FROM customers)");
        }

        // Add foreign key pointing to customers table if customer_id exists
        Schema::table('orders', function (Blueprint $table) {
            if (Schema::hasColumn('orders', 'customer_id')) {
                $table->foreign('customer_id')
                    ->references('id')
                    ->on('customers')
                    ->nullOnDelete();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            try {
                $table->dropForeign(['customer_id']);
            } catch (\Throwable $e) {
            }

            if (Schema::hasColumn('orders', 'payment_status')) {
                $table->dropColumn('payment_status');
            }

            if (Schema::hasColumn('orders', 'paid_amount')) {
                $table->dropColumn('paid_amount');
            }
        });
    }
};
