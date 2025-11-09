<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Repositories\Interfaces\UserActivityLogInterface;
class UserActivityController extends Controller
{
    public function __construct(UserActivityLogInterface $log){
        $this->log=$log;
    }
    public function allActivity(){
        $allLogs=$this->log->users_last_activity();
        return Inertia::render('SuperAdmin/UserLog',['allLogs'=>$allLogs]);
    } 
    public function user_all_activity($id){
        $allLogs=$this->log->user_all_activity($id);
        return Inertia::render('SuperAdmin/UserLog',['allLogs'=>$allLogs,'view'=>false]);
    }
}
