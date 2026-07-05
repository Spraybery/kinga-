<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoomSeeder extends Seeder
{
    public function run(): void
    {
        \App\Models\Room::create([
            'id' => 1,
            'name' => 'Standard Room',
            'slug' => 'standard',
            'tagline' => 'Peaceful Simplicity, Modern Comfort',
            'description' => 'Comfortable, modern rooms with a plush bed, crisp white linens, and an en-suite bathroom. Perfect for a relaxing stay with modern amenities.',
            'long_description' => 'Step into a world of understated elegance. Our Standard Rooms are designed with your comfort as the highest priority — a peaceful haven after a day of adventure or business. The warm timber accent wall frames a plush queen-size bed dressed in the finest white linens. A large flat-screen TV, vanity mirror, and dedicated desk ensure everything you need is always within reach. Wake up refreshed, sleep soundly, and live comfortably.',
            'price' => 0,
            'price_from' => 'From KES 8,500 / night',
            'capacity' => 2,
            'size' => '35 m²',
            'image_path' => 'image assets/hotel rooms/standard/20260703_104819.jpg',
            'gallery_images' => [
                'image assets/hotel rooms/standard/20260703_104933.jpg',
                'image assets/hotel rooms/standard/20260703_104935.jpg',
                'image assets/hotel rooms/standard/20260703_104939.jpg',
                'image assets/hotel rooms/standard/20260703_104947.jpg',
                'image assets/hotel rooms/standard/20260703_104951.jpg',
                'image assets/hotel rooms/standard/20260703_105003.jpg',
                'image assets/hotel rooms/standard/20260703_105004.jpg',
                'image assets/hotel rooms/standard/20260703_105102.jpg',
            ],
        ]);

        \App\Models\Room::create([
            'id' => 2,
            'name' => 'Deluxe Room',
            'slug' => 'deluxe',
            'tagline' => 'Elevated Luxury, Timeless Elegance',
            'description' => 'Spacious and luxurious rooms featuring a canopy mosquito net over a large bed, elegant wood finishes, a vanity mirror, and beautiful decor.',
            'long_description' => 'The Deluxe Room is where sophistication meets comfort. Draped in rich burgundy curtains and warm wood-slatted accent walls, this spacious room creates an atmosphere of timeless elegance. The centrepiece is a grand king-size bed crowned with a delicate canopy mosquito net, promising uninterrupted, peaceful sleep. Dual vanity mirrors, a smart TV, and a private balcony with panoramic views complete this extraordinary experience. A stay in a Deluxe Room is not just accommodation — it is an event.',
            'price' => 0,
            'price_from' => 'From KES 14,000 / night',
            'capacity' => 2,
            'size' => '50 m²',
            'image_path' => 'image assets/hotel rooms/deluxe/20260703_105926.jpg',
            'gallery_images' => [
                'image assets/hotel rooms/deluxe/20260703_105936.jpg',
                'image assets/hotel rooms/deluxe/20260703_105939.jpg',
                'image assets/hotel rooms/deluxe/20260703_105949.jpg',
                'image assets/hotel rooms/deluxe/20260703_105952.jpg',
                'image assets/hotel rooms/deluxe/20260703_105953.jpg',
                'image assets/hotel rooms/deluxe/20260703_110004.jpg',
                'image assets/hotel rooms/deluxe/20260703_110402.jpg',
                'image assets/hotel rooms/deluxe/20260703_110438.jpg',
            ],
        ]);

        \App\Models\Room::create([
            'id' => 3,
            'name' => 'Glamping Tent',
            'slug' => 'glamping-tent',
            'tagline' => "Nature's Embrace, Glamour's Touch",
            'description' => 'Experience nature without sacrificing comfort. Our glamping tents are arranged along a scenic paved path, offering an immersive outdoor experience.',
            'long_description' => 'There is something magical about falling asleep to the sounds of nature and waking up to birdsong at dawn. Our Glamping Tents bring you as close to the wild as possible without ever compromising on comfort. Set along a beautifully paved pathway through our resort grounds, each tent is a private retreat. Inside, you will find cosy, well-appointed beds, ambient lighting, and the raw beauty of an open-air escape. This is glamping redefined — where the wilderness is your backdrop and luxury is your constant companion.',
            'price' => 0,
            'price_from' => 'From KES 10,000 / night',
            'capacity' => 2,
            'size' => '25 m²',
            'image_path' => 'image assets/hotel rooms/tents/20260703_105344.jpg',
            'gallery_images' => [
                'image assets/hotel rooms/tents/20260703_105418.jpg',
                'image assets/hotel rooms/tents/20260703_105423.jpg',
                'image assets/hotel rooms/tents/20260703_105441.jpg',
                'image assets/hotel rooms/tents/20260703_105551.jpg',
                'image assets/hotel rooms/tents/20260703_105557.jpg',
                'image assets/hotel rooms/tents/20260703_105604(0).jpg',
                'image assets/hotel rooms/tents/20260703_105604.jpg',
            ],
        ]);
    }
}
