<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $fillable = [
        'contact_id',
        'address'
    ];

    public function contact() {
        return $this->belongsTo(Contact::class);
    }
}
