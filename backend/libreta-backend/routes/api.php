<?php

use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;

Route::post('/create', [ContactController::class, 'store']);
Route::get('/contacts', [ContactController::class, 'index']);
Route::put('/update/{id}', [ContactController::class, 'edit']);
