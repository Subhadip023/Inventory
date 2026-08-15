<?php

namespace App\Repositories;

class StateRepository {
    public function all(){
        $countries = config('countries', []);
        $result = [];
        foreach ($countries as $country) {
            foreach ($country['states'] ?? [] as $state) {
                $result[] = (object)[
                    'id' => $state['id'],
                    'name' => $state['name'],
                    'country_id' => $country['id'],
                ];
            }
        }
        return collect($result);
    }

    public function get($cuntry_id){
        $countries = config('countries', []);
        $result = [];
        foreach ($countries as $country) {
            if ($country['id'] == $cuntry_id || $cuntry_id === null) {
                foreach ($country['states'] ?? [] as $state) {
                    $result[] = (object)[
                        'id' => $state['id'],
                        'name' => $state['name'],
                        'country_id' => $country['id'],
                    ];
                }
            }
        }
        if (empty($result)) {
            return $this->all();
        }
        return collect($result);
    }

    public function default_selected_id(){
        return 4853;
    }

    public static function get_state_name($state_id){
        if (!$state_id) return '';
        $countries = config('countries', []);
        foreach ($countries as $country) {
            foreach ($country['states'] ?? [] as $state) {
                if ($state['id'] == $state_id) {
                    return $state['name'];
                }
            }
        }
        return '';
    }
}