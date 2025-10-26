<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Repositories\CountryRepository;
use App\Repositories\CityRepository;
use App\Repositories\StateRepository;
use Spatie\Permission\Models\Role;
class superadminUsers extends Controller
{
    /**
     * Display a listing of the resource.
     */
    protected $userRepository;
    public function __construct(CountryRepository $countryRepository,StateRepository $stateRepository,CityRepository $cityRepository,UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
        $this->countries=$countryRepository;
        $this->states=$stateRepository;
        $this->cities=$cityRepository;
    }
        public function getLocationData()
    {
        $defaultCountryId = $this->countries->default_selected_id();
        $defaultStateId   = $this->states->default_selected_id();
    
        return [
            'allCountry' => $this->countries->get($defaultCountryId),
            'allState'   => $this->states->get($defaultCountryId),
            'allCity'    => $this->cities->get($defaultStateId),
            'defult_selected_country_id' => $defaultCountryId,
            'defult_selected_state_id'   => $defaultStateId,
        ];
    }

    public function index()
    {
        $allusers = $this->userRepository->all();
        $allRoles = Role::where('name', '!=', 'super-admin')->get();
        return Inertia::render('SuperAdmin/Users', ['allusers' => $allusers,'allRoles'=>$allRoles]+$this->getLocationData());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
