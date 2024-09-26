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
    
}
