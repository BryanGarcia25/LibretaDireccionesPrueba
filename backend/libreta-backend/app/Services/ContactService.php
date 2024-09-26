<?php

namespace App\Services;

use App\Repositories\ContactRepository;

class ContactService
{
    protected $contactRepository;

    public function __construct(ContactRepository $contactRepository) {
        $this->contactRepository = $contactRepository;
    }

    public function createContact(array $contact) {
        return $this->contactRepository->createContact($contact);
    }

    public function getAllContacts() {
        return $this->contactRepository->getAllContacts();
    }
}
