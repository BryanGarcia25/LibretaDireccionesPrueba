<?php

namespace App\Repositories;

interface ContactRepository
{
    public function createContact(array $contact);
    public function getAllContacts();
}
