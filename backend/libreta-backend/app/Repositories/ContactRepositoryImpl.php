<?php

namespace App\Repositories;

use App\Models\Contact;

class ContactRepositoryImpl implements ContactRepository
{
    public function createContact(array $contact)
    {
        return Contact::create($contact);
    }

    public function getAllContacts()
    {
        return Contact::with(['Phones', 'Emails', 'Addresses'])->get();
    }
}
