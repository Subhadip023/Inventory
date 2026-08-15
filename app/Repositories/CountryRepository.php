<?php

namespace App\Repositories;

class CountryRepository {
    public function all(){
        $countries = config('countries', []);
        $result = [];
        foreach ($countries as $country) {
            $result[] = (object)[
                'id' => $country['id'],
                'name' => $country['name'],
                'code' => $country['code'] ?? '',
            ];
        }
        return collect($result);
    }

    public function get($id){
        $countries = config('countries', []);
        $result = [];
        foreach ($countries as $country) {
            if ($country['id'] == $id || $id === null) {
                $result[] = (object)[
                    'id' => $country['id'],
                    'name' => $country['name'],
                    'code' => $country['code'] ?? '',
                ];
            }
        }
        if (empty($result)) {
            return $this->all();
        }
        return collect($result);
    }

    public function default_selected_id(){
        return 101;
    }

    public static function get_country_name($country_id){
        if (!$country_id) return '';
        $countries = config('countries', []);
        foreach ($countries as $country) {
            if ($country['id'] == $country_id) {
                return $country['name'];
            }
        }
        return '';
    }
}