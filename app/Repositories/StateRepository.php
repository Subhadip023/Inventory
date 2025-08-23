<?php


namespace App\Repositories;
use DB;
class StateRepository{
    public function all(){
        return DB::table('states')->get();
    }
    public function get($cuntry_id){
        return DB::table('states')->where('country_id','=',$cuntry_id)->get();
    }
    public function default_selected_id(){
        return 4853;
    }

    public static function get_state_name($state_id){
        return DB::table('states')->where('id','=',$state_id)->first()->name;
    }
}