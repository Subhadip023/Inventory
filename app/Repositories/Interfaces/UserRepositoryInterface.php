<?php 
namespace App\Repositories\Interfaces;

interface UserRepositoryInterface{

    public function all();
    public function paginate(int $per_page=10);
    public function findById(int $id);
    public function create(array $data);
    public function update(int $id, array $data);
    public function delete(int $id);
}

