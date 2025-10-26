<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Carbon\Carbon;

class UpdateUserStatus extends Command
{
    protected $signature = 'users:update-status';
    protected $description = 'Update user status based on last activity time';

    public function handle()
    {
        $now = Carbon::now();

        // Find users who were active more than 5 minutes ago
        $inactiveUsers = User::where('status', 'active')
            ->where('last_activity_at', '<', $now->subMinutes(5))
            ->where('manual_status_set', false)
            ->get();

        foreach ($inactiveUsers as $user) {
            $user->status = 'inactive';
            $user->save();
        }

        //  Find users who were active more than 30 minutes ago
        $offlineUsers = User::where('status', 'inactive')
            ->where('last_activity_at', '<', $now->subMinutes(30))
            ->where('manual_status_set', false)
            ->get();

        foreach ($offlineUsers as $user) {
            $user->status = 'offline';
            $user->save();
        }
        $this->info('User statuses updated successfully!');
    }
}
