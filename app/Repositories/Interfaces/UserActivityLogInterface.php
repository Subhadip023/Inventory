<?php 
namespace App\Repositories\Interfaces;

interface UserActivityLogInterface {

    public function all();
    public function last();
    public function last10();
    public function update($activity,$description=null,$userId = null);
}

