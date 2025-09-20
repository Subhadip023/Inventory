<?php 
namespace App\Repositories\Interfaces;

interface UniversalProductRepositoryInterface{

    public function all();
    public function paginate(int $per_page=10);
    public function findById(int $id);
    public function search(str $search);
    public function create(array $data);
    public function update(int $id, array $data);
    public function delete(int $id);


}

