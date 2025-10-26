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
            'password' => 'required |confirmed',
            'user_type' => 'required | exists:roles,name',
            'country' => 'required',
            'state' => 'required',
            'city' => 'required',
            'phone_number' => 'required |unique:users,phone_number',
            'pincode' => 'required',
            'landmark' => 'nullable',
            'street_number' => 'required',
            'street_name' => 'required',
            'profile_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];
    }
}
