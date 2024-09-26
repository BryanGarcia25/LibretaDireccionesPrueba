<?php

use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;

Route::post('/create', [ContactController::class, 'store']);
Route::get('/contacts', [ContactController::class, 'index']);
Route::get('/contact/{id}', [ContactController::class, 'show']);
Route::put('/update/{id}', [ContactController::class, 'edit']);
Route::delete('/delete/{id}', [ContactController::class, 'destroy']);
