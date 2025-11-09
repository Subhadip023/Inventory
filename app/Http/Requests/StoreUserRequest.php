<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {

        return [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'nullable |confirmed',
            'user_type'=>'nullable |exists:roles,name',
            'country' => 'nullable',
            'state' => 'nullable',
            'city' => 'nullable',
            'phone_number' => 'nullable |unique:users,phone_number',
            'pincode' => 'nullable',
            'landmark' => 'nullable',
            'street_number' => 'nullable',
            'street_name' => 'nullable',
            'profile_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];
    }
}
