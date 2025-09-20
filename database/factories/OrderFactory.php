<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'created_by'=> 1,
            'customer_id'=> null,
            'grand_total' => fake()->randomFloat(2, 0, 100),
            'discount' => fake()->randomFloat(2, 0, 50),
            'tax' => fake()->randomFloat(2, 0, 50),
            'net_amount' => fake()->randomFloat(2, 0, 100),
        ];
    }
}
