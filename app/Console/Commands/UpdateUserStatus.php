<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use App\Models\UserStatus;
use Carbon\Carbon;
use Workbench\App\Models\User as ModelsUser;

class UpdateUserStatus extends Command
{
    protected $signature = 'users:update-status';
    protected $description = 'Update user status based on last activity time';

    public function handle()
    {
        $now = Carbon::now();
        $online = UserStatus::find(1);
        $away = UserStatus::find(5);
        $offline = UserStatus::find(7);
        $users=User::whereNull('manual_status_id')->get();
    

            foreach ($users as $user) {
            if (!$user->last_activity_at) {
                $user->user_status_id = $offline->id;
                $user->save();
                continue;
            }

            $diff = $now->diffInMinutes($user->last_activity_at);

            if ($diff <= 2) {
                $user->user_status_id = $online->id;
            } elseif ($diff <= 5) {
                $user->user_status_id = $away->id;
            } else {
                $user->user_status_id = $offline->id;
            }

            $user->save();
        }
        $this->info('User statuses updated successfully!');
    }
}
