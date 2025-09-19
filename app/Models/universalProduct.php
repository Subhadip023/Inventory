<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class universalProduct extends Model
{
    /** @use HasFactory<\Database\Factories\UniversalProductFactory> */
    use HasFactory;
    use Searchable;

 public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            
        ];
    }

}


