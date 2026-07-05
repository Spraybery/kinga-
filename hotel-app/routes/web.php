<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\BookingController;

use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/rooms', [RoomController::class, 'index'])->name('rooms.index');
Route::get('/rooms/{slug}', [RoomController::class, 'show'])->name('rooms.show');

Route::get('/services', function () {
    return Inertia::render('Services');
})->name('services');

Route::resource('bookings', BookingController::class)->only(['create', 'store']);
Route::get('/api/check-availability', [BookingController::class, 'checkAvailability'])->name('api.check-availability');
