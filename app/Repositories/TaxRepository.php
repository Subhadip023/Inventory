<?php  

namespace App\Repositories;
use App\Models\Tax;
use App\Repositories\Interfaces\TaxRepositoryInterface; 

class TaxRepository implements TaxRepositoryInterface{
    public function all(){
        return Tax::all();
    }
    public function create(array $data){
        return Tax::create($data);
    }
    public function update(int $id, array $data){
        return Tax::where('id', $id)->update($data);
    }
    public function delete(int $id){
        return Tax::where('id', $id)->delete();
    }
}


?>