<?php


namespace App\Repositories;
use DB;
class CountryRepository{
    public function all(){
        return DB::table('countries')->get();
    }
    public function get($id){
        return DB::table('countries')->where('id','=',$id)->get();
    }
    public function default_selected_id(){
        return 101;
    }

    public static function get_country_name($country_id){
        return DB::table('countries')->where('id','=',$country_id)->select('name')->first()->name;
    }
}