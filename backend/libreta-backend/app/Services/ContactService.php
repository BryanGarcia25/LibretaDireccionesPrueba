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

    public function getAllContacts(int $perPage) {
        return $this->contactRepository->getAllContacts($perPage);
    }

    public function getContactById(int $id) {
        return $this->contactRepository->getContactById($id);
    }

    public function updateContact(int $id, array $contact) {
        return $this->contactRepository->updateContact($id, $contact);
    }

    public function deleteContact(int $id) {
        return $this->contactRepository->deleteContact($id);
    }
}
