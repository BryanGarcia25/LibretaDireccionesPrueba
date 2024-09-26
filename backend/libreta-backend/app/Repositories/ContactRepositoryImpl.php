<?php

namespace App\Repositories;

use App\Models\Contact;

class ContactRepositoryImpl implements ContactRepository
{
    public function getAllContacts()
    {
        return Contact::with(['Phones', 'Emails', 'Addresses'])->get();
    }
}
