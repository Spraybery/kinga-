<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'tagline',
        'description',
        'long_description',
        'price',
        'price_from',
        'capacity',
        'size',
        'image_path',
        'gallery_images',
    ];

    protected $casts = [
        'gallery_images' => 'array',
    ];
}
