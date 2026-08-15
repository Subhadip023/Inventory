<?php

namespace App\Policies;

use App\Models\Order;
use App\Models\User;

class OrderPolicy
{
    /**
     * Helper to verify session shop match.
     */
    private function belongsToCurrentShop(?Order $order = null): bool
    {
        $currentShopId = session()->get('current_shop');
        if (!$currentShopId) {
            return false;
        }

        if ($order !== null) {
            return (int) $order->shop_id === (int) $currentShopId;
        }

        return true;
    }

    /**
     * Determine whether the user can view any orders for current shop.
     */
    public function viewAny(User $user): bool
    {
        return $this->belongsToCurrentShop();
    }

    /**
     * Determine whether the user can view the specific order.
     */
    public function view(User $user, Order $order): bool
    {
        return $this->belongsToCurrentShop($order);
    }

    /**
     * Determine whether the user can create orders.
     */
    public function create(User $user): bool
    {
        return $this->belongsToCurrentShop();
    }

    /**
     * Determine whether the user can update the order.
     */
    public function update(User $user, Order $order): bool
    {
        return $this->belongsToCurrentShop($order);
    }

    /**
     * Determine whether the user can delete the order.
     */
    public function delete(User $user, Order $order): bool
    {
        return $this->belongsToCurrentShop($order);
    }

    /**
     * Determine whether the user can restore the order.
     */
    public function restore(User $user, Order $order): bool
    {
        return $this->belongsToCurrentShop($order);
    }

    /**
     * Determine whether the user can permanently delete the order.
     */
    public function forceDelete(User $user, Order $order): bool
    {
        return $this->belongsToCurrentShop($order);
    }
}
