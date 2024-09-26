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

    public function index() {
        $registeredContacts = $this->contactService->getAllContacts();
        return response()->json($registeredContacts);
    }

    public function store(Request $contactRequest) {
        $contact = $this->contactService->createContact($contactRequest->all());
        return response()->json($contact, 201);
    }
    
}
