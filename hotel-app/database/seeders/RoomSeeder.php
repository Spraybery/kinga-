<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Room::create([
            'name' => 'Garden Villas',
            'description' => 'Private havens surrounded by lush flora, perfect for couples seeking intimacy.',
            'price' => 52500,
            'capacity' => 2,
            'image_path' => 'image assets/hotel rooms/room_desk_tv_balcony.jpg',
        ]);

        \App\Models\Room::create([
            'name' => 'Royal Penthouse',
            'description' => 'The pinnacle of luxury with panoramic views, private pool, and butler service.',
            'price' => 180000,
            'capacity' => 4,
            'image_path' => 'image assets/hotel rooms/resort_exterior_building.jpg',
        ]);
    }
}
