<?php 

namespace App\Repositories\Interfaces;

interface TaxRepositoryInterface
{
    public function all();
    public function create(array $data);
    public function update(int $id, array $data);
    public function delete(int $id);
}


?>