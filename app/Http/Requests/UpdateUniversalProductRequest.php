<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUniversalProductRequest extends FormRequest
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
            'id'                   => 'required|exists:universal_products,id',
            'name'                 => 'required|string|max:255',
            'description'          => 'nullable|string',
            'salt_composition'     => 'nullable|string|max:255',
            'manufacturer'         => 'nullable|string|max:255',
            'hsn_code'             => 'nullable|string|max:20',
            'gst_rate'             => 'nullable|numeric|min:0|max:100',
            'drug_schedule'        => 'nullable|in:OTC,H,H1,X,G',
            'medicine_category_id' => 'nullable|exists:medicine_categories,id',
            'verified'             => 'boolean',
        ];
    }
}
