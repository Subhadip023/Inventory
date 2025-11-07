<?php

use App\Repositories\Interfaces\UserActivityLogInterface;


if (!function_exists('log_user_activity')) {
    function log_user_activity($activity, $description = null, $userId = null)
    {
        app(UserActivityLogInterface::class)->update($activity, $description,$userId);
    }
}
