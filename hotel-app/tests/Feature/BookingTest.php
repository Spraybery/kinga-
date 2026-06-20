<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class BookingTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_view_rooms()
    {
        $response = $this->get(route('rooms.index'));
        $response->assertStatus(200);
    }

    public function test_user_can_create_booking()
    {
        $room = \App\Models\Room::factory()->create();
        $checkIn = now()->addDay()->format('Y-m-d');
        $checkOut = now()->addDays(3)->format('Y-m-d');

        $data = [
            'check_in' => $checkIn,
            'check_out' => $checkOut,
            'guest_count' => 2,
            'room_id' => $room->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john.dao@example.com',
            'phone' => '1234567890',
            'special_requests' => 'None',
        ];

        $response = $this->post(route('bookings.store'), $data);
        
        $response->assertRedirect(route('home'));
        $this->assertDatabaseHas('guests', ['email' => 'john.dao@example.com']);
        $this->assertDatabaseHas('bookings', ['room_id' => $room->id]);
    }
}
