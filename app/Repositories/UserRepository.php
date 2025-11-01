<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;
use App\Models\UserStatus;

class UserRepository implements UserRepositoryInterface
{
    public function all()
    {
        return User::with('roles','status','manualStatus')->get();
    }
    public function paginate(int $per_page = 10)
    {
        return User::paginate($per_page);
    }
    public function findById(int $id)
    {
        return User::find($id);
    }

    public function create(array $data)
    {
        return User::create($data);
    }
    public function update(int $id, array $data)
    {
        $user = User::find($id);
        if ($user) {
            $user->update($data);
            return $user;
        }
        return null;
    }
    public function delete(int $id)
    {
        $user = User::find($id);
        if ($user) {
            return $user->delete();
        }
        return false;
    }
    public function changeStatus( $id,$status_id)
    {
        $user = User::find($id);
        if ($user) {
            $status=UserStatus::find($status_id);
            if ($status_id==1) {
                $user->user_status_id=1;
                $user->manual_status_id=null;
            }else{
                $user->manual_status_id=$status_id;
            }
            $user->save();
            return $user;
        }
        return null;
    }
}