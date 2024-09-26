<?php

namespace App\Repositories;

interface ContactRepository
{
    public function createContact(array $contact);
    public function getAllContacts();
    public function getContactById(int $id);
    public function updateContact(int $id, array $contact);
    public function deleteContact(int $id);
}
