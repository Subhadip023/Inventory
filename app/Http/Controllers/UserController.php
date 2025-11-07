<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Repositories\CountryRepository;
use App\Repositories\CityRepository;
use App\Repositories\StateRepository;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Support\Facades\Storage;
use App\Repositories\Interfaces\UserRepositoryInterface;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    private $countries;
    private $states;
    private $cities;
    private $userRepository;
    private $currentUser;

    public function __construct(CountryRepository $countryRepository,StateRepository $stateRepository,CityRepository $cityRepository,UserRepositoryInterface $userRepository)   {
        $this->countries=$countryRepository;
        $this->states=$stateRepository;
        $this->cities=$cityRepository;
        $this->userRepository=$userRepository;
        $this->currentUser=auth()->user();
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
        $users=User::all();
        log_user_activity('users', 'User visited user list page');
        return Inertia::render('Users/Index', ['users' => $users]+$this->getLocationData());
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
    public function store(StoreUserRequest $request)
    {
        try{
        
        $userData=$request->validated();
        $userData['added_by']=auth()->user()->id;
        if ($request->hasFile('profile_image')) {
            $file = $request->file('profile_image');

            // Generate a unique filename
            $file_name = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();

            // Store in storage/app/public/profile_image
            $path = $file->storeAs('profile_image', $file_name,'public');

            
            // Save only relative path or filename in DB
            // $userData['profile_image'] = $path;
            $userData['profile_image'] = $path;
            $path=Storage::putFileAs('profile_image', $file, $file_name);

        }
        // dd($userData);

        unset($userData['confirm_password']);
        $userRole=$userData['user_type'];
        unset($userData['user_type']);
        $user=User::create($userData);
        $user->assignRole($userRole);
        log_user_activity('users', 'User created user');
        return redirect()->route('users.index')->with('success', 'User created successfully.');
        }catch(\Exception $e){
            logger()->error($e->getMessage());
            return redirect()->route('users.index')->with('error', 'Something went wrong.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        log_user_activity('users', 'User visited user edit page');
        return Inertia::render('Users/Edit', ['user' => $user]+$this->getLocationData());
    }

    /**
     * Update the specified resource in storage.
     */
public function update(UpdateUserRequest $request, User $user)
    {
        try {
            $valData=$request->validated();
            $valData=array_filter($valData);
        
            $user->update($valData);
            log_user_activity('users', 'User updated user');
            return redirect()->route('users.index')->with('success', 'User updated successfully.');
        } catch (\Throwable $th) {
            logger()->error($th->getMessage());
            return redirect()->route('users.index')->with('error', 'Something went wrong.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        log_user_activity('users', 'User deleted user');
        if($user->user_type==1){
            return redirect()->route('users.index')->with('error', ' Admin cannot be deleted.');
        }

        if ($user->profile_image) {
            Storage::disk('public')->delete($user->profile_image);
        }
       try {
            if (auth()->user()->user_type == 1) {
                
                $user->forceDelete();
                return redirect()->route('users.index')->with('success', 'User force deleted successfully.');
            }
           $user->delete();
           return redirect()->route('users.index')->with('success', 'User deleted successfully.');
       }catch (\Throwable $th) {
           logger()->error($th->getMessage());
           return redirect()->route('users.index')->with('error', 'Something went wrong.');
       }
    }

   public function addProfile(Request $request)
{
    log_user_activity('users', 'User updated user profile');
    $request->validate([
        'user_id' => 'required|exists:users,id',
        'profile_image' => 'required|image|mimes:jpg,jpeg,png|max:2048',
    ]);

    $user = User::find($request->user_id);

    // Delete old image if exists
    if ($user->profile_image) {
        Storage::disk('public')->delete($user->profile_image);
        session()->flash('info', 'Profile Image deleted successfully.');
    }

    // Upload new image
    $file = $request->file('profile_image');
    $file_name = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
    $path = $file->storeAs('profile_image', $file_name, 'public');

    // Save path in DB
    $user->profile_image = $path;
    $user->save();

    return redirect()->back()->with('success', 'Profile Image updated successfully.');
}

public function statusChange(Request $request){
    log_user_activity('users', 'User updated user status');
    $status=(int) $request->status;
    $change=$this->userRepository->changeStatus($this->currentUser->id,$status);
    if ($change) {
        return redirect()->back()->with('success', 'Status changed successfully.');
    }else{
        return redirect()->back()->with('error', 'Failed to change status.');
    }
}



}
