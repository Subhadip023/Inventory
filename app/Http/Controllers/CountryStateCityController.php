<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\CountryRepository;
use App\Repositories\CityRepository;

class CountryStateCityController extends Controller
{
    public function __construct(CountryRepository $countryRepository,CityRepository $cityRepository){
        $this->countries=$countryRepository;
        $this->cities=$cityRepository;
        
    }
    public function getCity(Request $request) {
        $fileredCity=$this->cities->get($request->state_id);
        return response()->json($fileredCity);
    }
   
}
