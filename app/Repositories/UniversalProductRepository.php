<?php 
namespace App\Repositories;

use App\Models\universalProduct;
use App\Repositories\Interfaces\UniversalProductRepositoryInterface;

class UniversalProductRepository implements UniversalProductRepositoryInterface {
    public function all()
    {
        $products=universalProduct::with('category')->get();
        return [
            'data' => $products,
            'total' =>count($products)
        ];
    }

    public function paginate(int $perPage = 5)
    {
        return UniversalProduct::with('category')->paginate($perPage);
    }

    public function findById(int $id)
    {
        return UniversalProduct::findOrFail($id);
    }

    public function search($search)
    {
        return universalProduct::where('name', 'LIKE', '%' . $search . '%')->get();
    }

    public function create(array $data)
    {
        return UniversalProduct::create($data);
    }

    public function update(int $id, array $data)
    {
        $product = UniversalProduct::findOrFail($id);
        $product->update($data);
        return $product;
    }

    public function delete(int $id)
    {
        return UniversalProduct::destroy($id);
    }
    public function changeVarifyStatus(int $id): bool
    {
        try {
            $product = UniversalProduct::findOrFail($id);
            $product->verified = !$product->verified;
            $product->save();
        return true;
        } catch (\Throwable $th) {
            log($th->getMessage());
            return false;
        }
    }

  
}