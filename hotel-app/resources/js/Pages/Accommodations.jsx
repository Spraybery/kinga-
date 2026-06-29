import React from 'react';
import { Link } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import { route } from 'ziggy-js';

export default function Accommodations({ rooms = [] }) {
    // Fallback data if DB has no rooms yet
    const defaultRooms = [
        {
            id: 1,
            name: "Garden Villas",
            description: "Hidden amongst the vibrant flora of our tropical gardens, these villas offer privacy and tranquility. Feature a private plunge pool and outdoor rain shower.",
            price: 52500,
            image_path: "image assets/hotel rooms/room_blue_velvet_bed.jpg",
            capacity: 2,
            size: "75 m²",
            features: ["King Size Bed", "High-Speed Wifi", "Outdoor Rain Shower", "Private Plunge Pool"]
        },
        {
            id: 3,
            name: "Royal Penthouse",
            description: "The crown jewel of Kinga Resorts. A two-bedroom sanctuary with a massive living area, full kitchen, and private infinity pool overlooking the entire resort.",
            price: 180000,
            image_path: "image assets/hotel rooms/resort_exterior_building.jpg",
            capacity: 6,
            size: "240 m²",
            features: ["Sleeps up to 6", "Private Infinity Pool", "24/7 Butler Service", "Full Chef Kitchen"]
        }
    ];

    const listRooms = rooms.length > 0 ? rooms : defaultRooms;

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
                    <h1 className="display-4 font-serif text-white">Our Accommodations</h1>
                    <p className="lead">Rest in comfort surrounded by nature</p>
                </div>
            </header>

            {/* Room List */}
            <section className="container py-5">
                {listRooms.map((room, index) => {
                    const isEven = index % 2 === 0;
                    const resolvedImg = room.image_path.startsWith('http') ? room.image_path : `/${room.image_path}`;
                    
                    return (
                        <div key={room.id}>
                            <div className={`row mb-5 align-items-center ${!isEven ? 'flex-md-row-reverse' : ''}`}>
                                <div className="col-md-6">
                                    <div className="overflow-hidden rounded shadow-sm">
                                        <img 
                                            src={resolvedImg} 
                                            alt={room.name} 
                                            className="img-fluid w-100 object-fit-cover hover-zoom" 
                                            style={{ height: '380px', transition: 'transform 0.5s ease' }}
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                                <div className={`col-md-6 mt-4 mt-md-0 ${isEven ? 'ps-md-5' : 'pe-md-5 text-md-end'}`}>
                                    <h2 className="font-serif display-6 mb-3">{room.name}</h2>
                                    <p className="text-muted mb-4">{room.description}</p>
                                    
                                    <ul className={`list-unstyled mb-4 d-flex flex-column gap-2 ${!isEven ? 'align-items-md-end' : ''}`}>
                                        {room.features ? (
                                            room.features.map((feat, fIdx) => (
                                                <li key={fIdx} className="small text-muted">
                                                    {isEven ? <i className="fas fa-check text-gold me-2"></i> : null}
                                                    {feat}
                                                    {!isEven ? <i className="fas fa-check text-gold ms-2"></i> : null}
                                                </li>
                                            ))
                                        ) : (
                                            <>
                                                <li className="small text-muted">
                                                    {isEven ? <i className="fas fa-bed text-gold me-2"></i> : null}
                                                    King Size Bed
                                                    {!isEven ? <i className="fas fa-bed text-gold ms-2"></i> : null}
                                                </li>
                                                <li className="small text-muted">
                                                    {isEven ? <i className="fas fa-users text-gold me-2"></i> : null}
                                                    Capacity: {room.capacity} Guests
                                                    {!isEven ? <i className="fas fa-users text-gold ms-2"></i> : null}
                                                </li>
                                            </>
                                        )}
                                    </ul>
                                    
                                    <Link href={route('bookings.create', { room_id: room.id })} className="btn btn-primary-gold mt-3">
                                        Book This Accommodation
                                    </Link>
                                </div>
                            </div>
                            {index < listRooms.length - 1 && <hr className="my-5 opacity-25" />}
                        </div>
                    );
                })}
            </section>
        </MainLayout>
    );
}
