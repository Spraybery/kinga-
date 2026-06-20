<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\BookingController;

use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/rooms', [RoomController::class, 'index'])->name('rooms.index');

Route::get('/dining', function () {
    return Inertia::render('Dining');
})->name('dining');

Route::get('/experiences', function () {
    return Inertia::render('Experiences');
})->name('experiences');

Route::get('/gallery', function () {
    return Inertia::render('Gallery');
})->name('gallery');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::resource('bookings', BookingController::class)->only(['create', 'store']);
Route::get('/api/check-availability', [BookingController::class, 'checkAvailability'])->name('api.check-availability');
