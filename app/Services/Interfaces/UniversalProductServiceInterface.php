<?php

namespace App\Services\Interfaces;

interface UniversalProductServiceInterface {
    public function paginate(int $perPage );
    public function getAll();
    public function filterProducts(array $filterData);
    public function getById(int $id);
    public function search(str $search);
    public function create(array $data);
    public function update(int $id, array $data);
    public function delete(int $id);
}