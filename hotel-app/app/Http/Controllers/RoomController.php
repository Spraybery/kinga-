<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RoomController extends Controller
{
    public function index()
    {
        $rooms = \App\Models\Room::all();
        return inertia('Rooms', [
            'rooms' => $rooms
        ]);
    }
}
