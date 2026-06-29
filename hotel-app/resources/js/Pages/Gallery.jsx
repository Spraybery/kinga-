import React, { useState } from 'react';
import MainLayout from '../Layouts/MainLayout';

export default function Gallery() {
    const categories = [
        { id: 'all', label: 'All Showcase' },
        { id: 'rooms', label: 'Rooms & Balconies' },
        { id: 'dining', label: 'Dining & Events' },
        { id: 'meetings', label: 'Conferences & Halls' },
        { id: 'gardens', label: 'Gardens & Grounds' }
    ];

    const images = [
        { src: '/image assets/hotel rooms/resort_courtyard_gardens.jpg', category: 'gardens', alt: 'Resort Courtyard Gardens', col: 'col-md-4 col-sm-6' },
        { src: '/image assets/hotel rooms/room_blue_velvet_bed.jpg', category: 'rooms', alt: 'Deluxe Blue Velvet Bedroom', col: 'col-md-4 col-sm-6' },
        { src: '/image assets/hotel rooms/dining_buffet_spread_1.jpg', category: 'dining', alt: 'Deluxe Buffet Service', col: 'col-md-4 col-sm-6' },
        { src: '/image assets/hotel rooms/conference_banquet_hall_projector_1.jpg', category: 'meetings', alt: 'Main Conference Hall', col: 'col-md-6 col-sm-6' },
        { src: '/image assets/hotel rooms/room_desk_tv_balcony.jpg', category: 'rooms', alt: 'Executive Desk & View', col: 'col-md-6 col-sm-6' },
        { src: '/image assets/hotel rooms/dining_gala_dinner_table.jpg', category: 'dining', alt: 'Formal Gala Setting', col: 'col-md-4 col-sm-6' },
        { src: '/image assets/hotel rooms/conference_room_ushape_1.jpg', category: 'meetings', alt: 'Seminar Meeting Room', col: 'col-md-4 col-sm-6' },
        { src: '/image assets/hotel rooms/resort_exterior_building.jpg', category: 'gardens', alt: 'Resort Exterior Building', col: 'col-md-4 col-sm-6' },
        { src: '/image assets/hotel rooms/room_private_balcony_4.jpg', category: 'rooms', alt: 'Private Balcony Seating', col: 'col-md-6 col-sm-6' },
        { src: '/image assets/hotel rooms/dining_outdoor_catering_event.jpg', category: 'dining', alt: 'Outdoor Garden Catering', col: 'col-md-6 col-sm-6' },
        { src: '/image assets/hotel rooms/resort_exterior_lawn_view.jpg', category: 'gardens', alt: 'Lawn Garden Balcony View', col: 'col-md-4 col-sm-6' },
        { src: '/image assets/hotel rooms/room_blue_velvet_bed.jpg', category: 'rooms', alt: 'Blue Velvet Bed Side Angle', col: 'col-md-4 col-sm-6' },
        { src: '/image assets/hotel rooms/dining_garden_breakfast.jpg', category: 'dining', alt: 'Outdoor Garden Breakfast', col: 'col-md-4 col-sm-6' }
    ];

    const [activeCategory, setActiveCategory] = useState('all');

    const filteredImages = activeCategory === 'all' 
        ? images 
        : images.filter(img => img.category === activeCategory);

    return (
        <MainLayout>
            {/* Header */}
            <header 
                className="hero-section d-flex align-items-center justify-content-center text-white position-relative"
                style={{
                    height: '50vh',
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/image assets/hotel rooms/resort_courtyard_gardens.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="container hero-content text-center position-relative z-1">
                    <h1 className="display-4 font-serif text-white">Resort Gallery</h1>
                    <p className="lead">Experience the luxury of Kinga Resorts in photos</p>
                </div>
            </header>

            {/* Category Filter Tabs */}
            <div className="container pt-5 text-center">
                <div className="d-flex justify-content-center flex-wrap gap-2 mb-4" role="tablist" aria-label="Gallery categories">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`btn ${activeCategory === cat.id ? 'btn-primary-gold' : 'btn-outline-gold'}`}
                            onClick={() => setActiveCategory(cat.id)}
                            role="tab"
                            aria-selected={activeCategory === cat.id}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Gallery Grid */}
            <section className="container pb-5">
                <div className="row g-4">
                    {filteredImages.map((img, idx) => (
                        <div key={idx} className={img.col} style={{ transition: 'all 0.4s ease' }}>
                            <div className="overflow-hidden rounded shadow-sm h-100" style={{ maxHeight: '400px', minHeight: '250px' }}>
                                <img 
                                    src={img.src} 
                                    className="img-fluid w-100 h-100 object-fit-cover hover-zoom" 
                                    alt={img.alt} 
                                    loading="lazy"
                                    style={{
                                        transition: 'transform 0.5s ease',
                                        cursor: 'pointer'
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </MainLayout>
    );
}
