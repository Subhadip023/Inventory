<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
class StoreShopRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // or add your auth logic
    }

    public function rules(): array
    {
        return [
            'name' => [
            'required',
            'string',
            'max:255',         
            ],
            'shop_email' => ['nullable', 'email', 'max:255'],
            'shop_phone_number' => ['nullable', 'string', 'max:20'],
            'gst_number' => ['nullable', 'string', 'max:50'],
            'pan_number' => ['nullable', 'string', 'max:50'],
            'registration_number' => ['nullable', 'string', 'max:100'],
            'registration_certificate' => ['nullable', 'file', 'mimes:pdf,jpg,png,jpeg', 'max:2048'],
            'reg_upi_id' => ['nullable', 'string', 'max:100'],
            'logo' => ['nullable', 'image', 'mimes:jpg,png,jpeg,svg', 'max:2048'],
            'status' => ['nullable', 'in:active,inactive'], 
            'pincode' => ['nullable', 'string', 'max:10'],
            'city' => ['nullable', 'integer', 'exists:cities,id'],
            'state' => ['nullable', 'integer', 'exists:states,id'],
            'country' => ['nullable', 'integer', 'exists:countries,id'],
            'landmark' => ['nullable', 'string', 'max:255'],
            'street_number' => ['nullable', 'string', 'max:50'],
            'street_name' => ['nullable', 'string', 'max:255'],
            'category_id' =>'required | exists:shop_categories,id',
        ];
    }

    

}
