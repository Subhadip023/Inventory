<?php 

namespace App\Repositories;
use App\Models\UserActivityLog;
use App\Repositories\Interfaces\UserActivityLogInterface;

class UserActivityLogRepository implements UserActivityLogInterface
{
    public function all(){
        return UserActivityLog::all();
    }
    public function last(){
        return UserActivityLog::latest()->first();
    }
    public function last10(){
        return UserActivityLog::latest()->take(10)->get();
    }
    public function update($activity,$description=null,$userId = null){
        // dd($userId);
        UserActivityLog::create([
        'user_id'       => $userId ?? (auth()->user()->id ?? null),
            'activity_type'=>$activity,
            'description'=>$description,
            'ip_address'=>request()->ip(),
            'user_agent'=>request()->header('User-Agent'),
            'activity_time'=>now()
        ]);
    }
}

?>