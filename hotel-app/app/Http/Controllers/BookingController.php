<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function create(Request $request)
    {
        $rooms = \App\Models\Room::all();
        return inertia('Bookings/Create', [
            'rooms' => $rooms,
            'selectedRoomId' => $request->query('room_id')
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'check_in' => 'required|date|after_or_equal:today',
            'check_out' => 'required|date|after:check_in',
            'guest_count' => 'required|integer|min:1',
            'room_id' => 'required|exists:rooms,id',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'special_requests' => 'nullable|string',
        ]);

        // Calculate Price
        $room = \App\Models\Room::findOrFail($validated['room_id']);
        $checkIn = \Carbon\Carbon::parse($validated['check_in']);
        $checkOut = \Carbon\Carbon::parse($validated['check_out']);
        $nights = $checkIn->diffInDays($checkOut);
        
        if ($nights < 1) $nights = 1;

        $subtotal = $room->price * $nights;
        $taxes = $subtotal * 0.10;
        $totalPrice = $subtotal + $taxes;

        // Create Guest
        $guest = \App\Models\Guest::firstOrCreate(
            ['email' => $validated['email']],
            [
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
                'phone' => $validated['phone'],
            ]
        );

        // Create Booking
        \App\Models\Booking::create([
            'room_id' => $room->id,
            'guest_id' => $guest->id,
            'check_in' => $validated['check_in'],
            'check_out' => $validated['check_out'],
            'guest_count' => $validated['guest_count'],
            'total_price' => $totalPrice,
            'status' => 'confirmed', // Auto-confirm for demo
            'special_requests' => $validated['special_requests'],
        ]);

        return redirect()->route('home')->with('success', "Booking confirmed! Your stay at {$room->name} awaits.");
    }

    public function checkAvailability(Request $request)
    {
        // Simple availability check logic (mock)
        return response()->json(['available' => true]);
    }
}
