<?php 
namespace App\Repositories\Interfaces;

interface UserActivityLogInterface {

    public function all();
    public function last();
    public function last10();
    public function user_all_activity($user_id);
    public function users_last_activity();
    public function update($activity,$description=null,$userId = null);
}

