<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
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
        $userId = $this->route('user'); // assumes route has {user} parameter

        return [
            // 'id' => 'required|exists:users,id',
            'name' => 'nullable|string|max:255',
            'email' => [
                'nullable',
                'email',
                Rule::unique('users', 'email')->ignore($userId),
            ],
            'password' => 'nullable|string|confirmed|min:6',
            'user_type' => 'nullable|in:1,2,3',
            'country' => 'nullable',
            'state' => 'nullable',
            'city' => 'nullable',
            'phone_number' => [
                'nullable',
                'string',
                'max:15',
                Rule::unique('users', 'phone_number')->ignore($userId),
            ],
            'pincode' => 'nullable|string|max:10',
            'landmark' => 'nullable|string|max:255',
            'street_number' => 'nullable|string|max:50',
            'street_name' => 'nullable|string|max:255',
            'profile_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];
    }
}
