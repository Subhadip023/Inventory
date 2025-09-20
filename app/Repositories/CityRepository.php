<?php


namespace App\Repositories;
use DB;
class CityRepository{
    public function all(){
        return DB::table('cities')->get();
    }
    public function get($state_id){
        return DB::table('cities')->where('state_id','=',$state_id)->get();
    }
    public static function get_city_name($country_id){
        return DB::table('cities')->where('id','=',$country_id)->select('name')->first()->name ?? '';
    }
}