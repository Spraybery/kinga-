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
            'id' => 1,
            'name' => 'Garden Villas',
            'description' => 'Private havens surrounded by lush flora, perfect for couples seeking intimacy. Hidden amongst the vibrant flora of our tropical gardens, these villas offer privacy and tranquility. Feature a private plunge pool and outdoor rain shower.',
            'price' => 0,
            'capacity' => 2,
            'image_path' => 'image assets/hotel rooms/room_desk_tv_balcony.jpg',
        ]);

        \App\Models\Room::create([
            'id' => 2,
            'name' => 'Deluxe Canopy Suite',
            'description' => 'Elegant suites featuring a signature four-poster canopy bed, high ceilings, and beautiful mahogany furnishings. Perfect for romantic getaways, offering a serene, private environment with panoramic garden views.',
            'price' => 0,
            'capacity' => 2,
            'image_path' => 'image assets/hotel rooms/room_deluxe_canopy_bed_1.jpg',
        ]);

        \App\Models\Room::create([
            'id' => 3,
            'name' => 'Royal Penthouse',
            'description' => 'The pinnacle of luxury with panoramic views, private pool, and butler service. The crown jewel of Kinga Resorts. A two-bedroom sanctuary with a massive living area, full kitchen, and private infinity pool overlooking the entire resort.',
            'price' => 0,
            'capacity' => 4,
            'image_path' => 'image assets/hotel rooms/resort_exterior_building.jpg',
        ]);

        \App\Models\Room::create([
            'id' => 4,
            'name' => 'Blue Velvet Suite',
            'description' => 'A beautifully styled room featuring rich blue velvet upholstery, contemporary art pieces, and a plush layout. Offers a private balcony terrace, workspace, and a marble bath with premium amenities.',
            'price' => 0,
            'capacity' => 2,
            'image_path' => 'image assets/hotel rooms/room_blue_velvet_bed.jpg',
        ]);

        \App\Models\Room::create([
            'id' => 5,
            'name' => 'Deluxe Double Room',
            'description' => 'Spacious rooms designed for families or small groups traveling together. Features two comfortable double beds, a cozy seating area, and sliding glass doors that open to a scenic view of the property.',
            'price' => 0,
            'capacity' => 4,
            'image_path' => 'image assets/hotel rooms/room_deluxe_double_bed_1.jpg',
        ]);
    }
}
