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

    public function getContactById(int $id)
    {
        return Contact::with(['Phones', 'Emails', 'Addresses'])->find($id);
    }

    public function updateContact(int $id, array $contact)
    {
        $contactFound = Contact::find($id);
        if ($contactFound) {
            $contactFound->update($contact);
        }
        return $contact;
    }

    public function deleteContact(int $id)
    {
        $contactFound = Contact::find($id);
        if ($contactFound) {
            $contactFound->delete();
        }
        return $contactFound;
    }
}
