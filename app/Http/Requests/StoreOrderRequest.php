<?php

namespace App\Http\Requests;
use Illuminate\Validation\Rule;


use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
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
            'customer_id'          => 'nullable|exists:users,id',
            'items.*.product'      => 'nullable|array',
            'items.*.product.value'=> 'nullable|exists:products,id',
            'items.*.product.price'=> 'nullable|numeric|min:0',
            'items.*.quantity'     => 'nullable|numeric|min:1',
            'tax'                  => 'required|numeric|min:0',
            'discount'             => 'required|numeric|min:0|max:90',
        ];
    }
}
