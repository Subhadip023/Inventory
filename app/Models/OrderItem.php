<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
   protected $fillable=['order_id','product_id','quantity','price'];


   public function order()
   {
       return $this->belongsTo(Order::class);
   }

   public function product()
   {
       return $this->belongsTo(Product::class);
   }

   public function addProducts($products)

   {

       return $this->createMany($products);    
   }

   public function addProduct(int $productId, int $quantity, float $price)
   {
        return $this->orderItems()->create([
            'product_id' => $productId,
            'quantity'   => $quantity,
            'price'      => $price,
        ]);
   }


}
