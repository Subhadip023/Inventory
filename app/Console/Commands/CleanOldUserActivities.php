<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\UserActivityLog;
use Carbon\Carbon;

class CleanOldUserActivities extends Command
{
    /**
     * The name and signature of the console command.
     *
     * You can run this command with:
     * php artisan user-activities:clean
     */
    protected $signature = 'user-activities:clean';

    /**
     * The console command description.
     */
    protected $description = 'Delete user activity logs older than 30 days';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $cutoffDate = Carbon::now()->subDays(30);

        $deleted = UserActivityLog::where('activity_time', '<', $cutoffDate)->delete();

        $this->info("✅ Deleted {$deleted} old activity log(s) older than 30 days.");
    }
}
