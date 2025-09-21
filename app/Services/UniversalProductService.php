<?php 

namespace App\Services;

use App\Services\Interfaces\UniversalProductServiceInterface;
use App\Repositories\Interfaces\UniversalProductRepositoryInterface;


class UniversalProductService implements UniversalProductServiceInterface{

    protected $repository;

    public function __construct(UniversalProductRepositoryInterface $repository){
        $this->repository = $repository;
    }


     public function getAll()
    {
        return $this->repository->all();
    }
    public function paginate(int $perPage=10){
        return $this->repository->paginate($perPage);
    }
    public function filterProducts(array $filterData){
        return $this->repository->filterProducts($filterData);
    }

    public function getById(int $id)
    {
        return $this->repository->findById($id);
    }
    public function search($search){
        return $this->repository->search($search);
    }

    public function create(array $data)
    {
        // Example business rule: prevent negative stock
        if (isset($data['stock']) && $data['stock'] < 0) {
            throw new \InvalidArgumentException("Stock cannot be negative.");
        }

        return $this->repository->create($data);
    }

    public function update(int $id, array $data)
    {
        return $this->repository->update($id, $data);
    }

    public function delete(int $id)
    {
        return $this->repository->delete($id);
    }
}