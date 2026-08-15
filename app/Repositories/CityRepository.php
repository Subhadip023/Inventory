<?php

namespace App\Repositories;

class CityRepository {
    public function all(){
        $countries = config('countries', []);
        $result = [];
        foreach ($countries as $country) {
            foreach ($country['states'] ?? [] as $state) {
                foreach ($state['cities'] ?? [] as $city) {
                    $result[] = (object)[
                        'id' => $city['id'],
                        'name' => $city['name'],
                        'state_id' => $state['id'],
                    ];
                }
            }
        }
        return collect($result);
    }

    public function get($state_id){
        $countries = config('countries', []);
        $result = [];
        foreach ($countries as $country) {
            foreach ($country['states'] ?? [] as $state) {
                if ($state['id'] == $state_id || $state_id === null) {
                    foreach ($state['cities'] ?? [] as $city) {
                        $result[] = (object)[
                            'id' => $city['id'],
                            'name' => $city['name'],
                            'state_id' => $state['id'],
                        ];
                    }
                }
            }
        }
        if (empty($result) && $state_id !== null) {
            return $this->all();
        }
        return collect($result);
    }

    public static function get_city_name($city_id){
        if (!$city_id) return '';
        $countries = config('countries', []);
        foreach ($countries as $country) {
            foreach ($country['states'] ?? [] as $state) {
                foreach ($state['cities'] ?? [] as $city) {
                    if ($city['id'] == $city_id) {
                        return $city['name'];
                    }
                }
            }
        }
        return '';
    }
}