<?php
namespace App\Repositories;

use App\Models\universalProduct;
use App\Repositories\Interfaces\UniversalProductRepositoryInterface;

class UniversalProductRepository implements UniversalProductRepositoryInterface
{
    public function all()
    {
        $products = universalProduct::with('category')->orderBy('id', 'desc')->get();
        return [
            'data' => $products,
            'total' => count($products),

        ];
    }

    public function paginate(int $perPage = 5)
    {
        return UniversalProduct::with('category')->orderBy('id', 'desc')->paginate($perPage);
    }

    public function findById(int $id)
    {
        return UniversalProduct::findOrFail($id);
    }

    public function search($search)
    {
        $products = universalProduct::with('category')
            ->where(function ($query) use ($search) {
                $query->where('name', 'LIKE', '%' . $search . '%')
                    ->orWhere('description', 'LIKE', '%' . $search . '%');
            })
            ->get();

        return [
            'data' => $products,
            'total' => count($products),
        ];
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
    public function filterProducts(array $filterData)
    {
        // default values

        $page = $filterData['page'] ?? 1;
        $perPage = $filterData['per_page'] ?? 5;

        $query = UniversalProduct::with('category');

        // Apply shop_category_id filter if provided
        if (!empty($filterData['shop_category_id'])) {
            $query->where('shop_category_id', $filterData['shop_category_id']);
        }

        if (array_key_exists('verified', $filterData) && $filterData['verified'] !== 'all') {
    $query->where('verified', $filterData['verified']);
}




        if ($perPage === 'all') {
            $allProducts = $query->orderByDesc('id')->get();

            return [
                'data' => $allProducts,
                'total' => $allProducts->count(),
            ];
        }

        return $query->paginate($perPage, ['*'], 'page', $page);
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