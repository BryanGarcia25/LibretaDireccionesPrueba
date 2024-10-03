<?php

namespace App\Http\Controllers;

use App\Services\ContactService;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    protected $contactService;

    public function __construct(ContactService $contactService) {
        $this->contactService = $contactService;
    }

    public function index(Request $request) {
        $perPage = $request->input('per_page', 10);
        $registeredContacts = $this->contactService->getAllContacts($perPage);
        return response()->json($registeredContacts);
    }

    public function show(int $id) {
        $contactFound = $this->contactService->getContactById($id);
        return response()->json($contactFound);
    }

    public function store(Request $contactRequest) {
        $contact = $this->contactService->createContact($contactRequest->all());
        return response()->json($contact, 201);
    }

    public function edit(int $id, request $contact) {
        $contactUpdated = $this->contactService->updateContact($id, $contact->all());
        return response($contactUpdated);
    }

    public function destroy(int $id) {
        $this->contactService->deleteContact($id);
        return response()->json("Contacto eliminado");
    }
    
}
