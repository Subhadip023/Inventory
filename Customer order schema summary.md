# Schema Summary — Customers, Orders, Payments, Ledger

## Context
Multi-tenant pharmacy retail/wholesale billing system. Tenant key is `shop_id`
on every table below — never query these tables without scoping by shop_id.

## 1. customers
```php
Schema::create('customers', function (Blueprint $table) {
    $table->id();
    $table->foreignId('shop_id')->constrained('shops')->cascadeOnDelete();
    $table->enum('customer_type', ['retail', 'wholesale'])->default('retail');
    $table->string('name');
    $table->string('phone', 20)->nullable();
    $table->text('address')->nullable();
    $table->string('gst_number', 20)->nullable();   // wholesale only, nullable for retail
    $table->string('dl_number', 50)->nullable();     // wholesale only, nullable for retail
    $table->decimal('credit_limit', 12, 2)->default(0.00);
    $table->timestamps();

    $table->unique(['shop_id', 'phone']);
    $table->index(['shop_id', 'customer_type']);
});
```
Note: no `current_balance` column here. Balance is derived from `customer_ledger`
(see below), not stored as a single mutable field, to avoid drift/reconciliation bugs.

## 2. orders (additions to existing table)
```php
Schema::table('orders', function (Blueprint $table) {
    $table->foreignId('shop_id')->constrained('shops')->cascadeOnDelete(); // if missing — critical fix
    $table->foreignId('customer_id')->nullable()->constrained('customers'); // nullable = walk-in
    $table->decimal('grand_total', 12, 2);
    $table->decimal('paid_amount', 12, 2)->default(0.00); // sum of related payments, kept in sync in code
    $table->enum('payment_status', ['unpaid', 'partial', 'paid'])->default('unpaid');
});
```
`payment_status` is derived, not set manually:
- `paid_amount >= grand_total` → `paid`
- `paid_amount > 0 && < grand_total` → `partial`
- `paid_amount == 0` → `unpaid`
Recalculate on every payment insert.

## 3. payments (new table — supports split/multi-mode payments)
```php
Schema::create('payments', function (Blueprint $table) {
    $table->id();
    $table->foreignId('shop_id')->constrained('shops')->cascadeOnDelete();
    $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();
    $table->foreignId('customer_id')->nullable()->constrained('customers');
    $table->decimal('amount', 12, 2);
    $table->enum('mode', ['cash', 'online'])->default('cash');
    $table->string('reference_no')->nullable(); // UPI/txn ref, optional
    $table->timestamps();

    $table->index(['shop_id', 'order_id']);
});
```
One order can have multiple payment rows (e.g. ₹500 cash + ₹300 online against
one bill). `orders.paid_amount` = SUM of this table's `amount` for that order_id.

## 4. customer_ledger (new table — wholesale credit tracking)
```php
Schema::create('customer_ledger', function (Blueprint $table) {
    $table->id();
    $table->foreignId('shop_id')->constrained('shops')->cascadeOnDelete();
    $table->foreignId('customer_id')->constrained('customers')->cascadeOnDelete();
    $table->enum('type', ['sale', 'payment', 'adjustment']);
    $table->decimal('amount', 12, 2); // positive = customer owes more, negative = they paid
    $table->foreignId('order_id')->nullable()->constrained('orders');
    $table->text('note')->nullable();
    $table->timestamps();

    $table->index(['shop_id', 'customer_id']);
});
```
Running balance for a customer = `SUM(amount)` from this table, not a stored field.
Insert a `sale` row when an unpaid/partial wholesale order is created; insert a
`payment` row (negative amount) whenever a payment is recorded against that customer.

## MVP scope note for whoever implements this
- Build the schema fully now (all 4 tables above).
- UI scope for first demo: single full payment per order is enough. Multi-payment
  split entry UI can come after the demo — the schema already supports it, no
  migration rework needed later.
- Do NOT add: credit limit enforcement blocking sales, automated payment reminders,
  aging/overdue reports. Those are post-MVP.