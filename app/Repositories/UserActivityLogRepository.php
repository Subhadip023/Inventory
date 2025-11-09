<?php 

namespace App\Repositories;
use App\Models\UserActivityLog;
use App\Repositories\Interfaces\UserActivityLogInterface;
use Jenssegers\Agent\Agent;


class UserActivityLogRepository implements UserActivityLogInterface
{

  
    public function all(){
        return UserActivityLog::with('user')->get();
    } 
    public function user_all_activity($user_id){
        return UserActivityLog::with( 'user')->where('user_id','=',$user_id)->get();
    }
    public function users_last_activity()
    {
        return  UserActivityLog::select('user_activity_logs.*')
            ->joinSub(
                UserActivityLog::selectRaw('MAX(activity_time) as latest_time, user_id')
                    ->groupBy('user_id'),
                'latest_logs',
                function ($join) {
                    $join->on('user_activity_logs.user_id', '=', 'latest_logs.user_id')
                        ->on('user_activity_logs.activity_time', '=', 'latest_logs.latest_time');
                }
            )
            ->with('user')
            ->orderByDesc('activity_time')
            ->get();
    }

    public function last(){
        return UserActivityLog::latest()->first();
    }
    public function last10(){
        return UserActivityLog::latest()->take(10)->get();
    }
    public function update($activity,$description=null,$userId = null){
        $agent = new Agent();

        $browser  = $agent->browser();
        $version  = $agent->version($browser);
        $platform = $agent->platform();
        $device   = $agent->device() ?: 'Desktop';

        $userAgentSummary = "{$browser} {$version} on {$platform} ({$device})";
        UserActivityLog::create([
        'user_id'       => $userId ?? (auth()->user()->id ?? null),
            'activity_type'=>$activity,
            'description'=>$description,
            'ip_address'=>request()->ip(),
            'user_agent'=>$userAgentSummary,
            'activity_time'=>now()
        ]);
    }
}

?>