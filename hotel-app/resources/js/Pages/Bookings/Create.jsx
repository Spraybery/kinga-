import React, { useEffect, useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';
import { route } from 'ziggy-js';

export default function Create({ rooms = [], selectedRoomId = null }) {
    // Default fallback rooms if DB is empty
    const defaultRooms = [
        {
            id: 1,
            name: "Garden Villas",
            description: "Hidden amongst the vibrant flora of our tropical gardens, these villas offer privacy and tranquility. Feature a private plunge pool and outdoor rain shower.",
            price: 52500,
            image_path: "image assets/hotel rooms/gabriel-alenius-lTrbjFd8Iwo-unsplash.jpg"
        },
        {
            id: 2,
            name: "Ocean Suites",
            description: "Wake up to the sound of waves. Our Ocean Suites sit perched on the cliffside, offering uninterrupted views of the azure waters.",
            price: 82500,
            image_path: "image assets/hotel rooms/linus-mimietz-p3UWyaujtQo-unsplash.jpg"
        },
        {
            id: 3,
            name: "Royal Penthouse",
            description: "The crown jewel of Kinga Resorts. A two-bedroom sanctuary with a massive living area, full kitchen, and private infinity pool.",
            price: 180000,
            image_path: "image assets/hotel rooms/point3d-commercial-imaging-ltd-oxeCZrodz78-unsplash.jpg"
        }
    ];

    const displayRooms = rooms.length > 0 ? rooms : defaultRooms;

    // Dates initialization helper
    const getTodayDateString = (offsetDays = 0) => {
        const d = new Date();
        d.setDate(d.getDate() + offsetDays);
        return d.toISOString().split('T')[0];
    };

    // Inertia Form Setup
    const { data, setData, post, processing, errors } = useForm({
        check_in: getTodayDateString(0),
        check_out: getTodayDateString(1),
        guest_count: 2,
        room_id: selectedRoomId || '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        special_requests: ''
    });

    // Client calculations state
    const [nights, setNights] = useState(1);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [finance, setFinance] = useState({ subtotal: 0, taxes: 0, total: 0 });

    // Date validations and calculations
    useEffect(() => {
        if (data.check_in && data.check_out) {
            const checkInDate = new Date(data.check_in);
            const checkOutDate = new Date(data.check_out);

            const diffTime = checkOutDate - checkInDate;
            const computedNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            setNights(computedNights > 0 ? computedNights : 0);
        } else {
            setNights(0);
        }
    }, [data.check_in, data.check_out]);

    // Track selected room object
    useEffect(() => {
        const room = displayRooms.find(r => r.id === Number(data.room_id));
        setSelectedRoom(room || null);
    }, [data.room_id, displayRooms]);

    // Financial breakdown calculations
    useEffect(() => {
        if (selectedRoom && nights > 0) {
            const subtotal = Number(selectedRoom.price) * nights;
            const taxes = subtotal * 0.10;
            const total = subtotal + taxes;
            setFinance({ subtotal, taxes, total });
        } else {
            setFinance({ subtotal: 0, taxes: 0, total: 0 });
        }
    }, [selectedRoom, nights]);

    // Pre-select room from URL query if applicable
    useEffect(() => {
        if (selectedRoomId) {
            setData('room_id', String(selectedRoomId));
        }
    }, [selectedRoomId]);

    const handleSelectRoom = (roomId) => {
        setData('room_id', String(roomId));
        // Scroll to guest details
        document.getElementById('step3')?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('bookings.store'));
    };

    return (
        <MainLayout>
            {/* Booking Hero */}
            <header 
                className="booking-hero d-flex align-items-center justify-content-center text-white position-relative" 
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/image assets/hotel rooms/dad-hotel-Y-bJWAjPzsY-unsplash.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '350px'
                }}
            >
                <div className="container position-relative text-center z-1">
                    <h1 className="display-4 font-serif text-white mb-2">Reserve Your Sanctuary</h1>
                    <p className="lead">Begin your journey to relaxation.</p>
                </div>
            </header>

            <main className="py-5 bg-cream-light">
                <div className="container">
                    <form onSubmit={handleSubmit} id="bookingForm">
                        <div className="row g-4">
                            <div className="col-lg-8">
                                {/* Step 1: Dates & Party */}
                                <div className="booking-step active mb-5" id="step1">
                                    <h3 className="h5 mb-3 text-gold font-serif"><i className="fas fa-calendar-alt me-2"></i>1. Your Dates & Party</h3>
                                    <div className="card border-0 shadow-sm p-4">
                                        <div className="row g-3">
                                            <div className="col-md-4">
                                                <label className="form-label small fw-bold text-muted">Check-in</label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-white border-end-0"><i className="fas fa-calendar-day text-gold"></i></span>
                                                    <input 
                                                        type="date" 
                                                        className={`form-control border-start-0 ${errors.check_in ? 'is-invalid' : ''}`}
                                                        value={data.check_in}
                                                        min={getTodayDateString(0)}
                                                        onChange={(e) => setData('check_in', e.target.value)}
                                                        required
                                                    />
                                                    {errors.check_in && <div className="invalid-feedback">{errors.check_in}</div>}
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <label className="form-label small fw-bold text-muted">Check-out</label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-white border-end-0"><i className="fas fa-calendar-check text-gold"></i></span>
                                                    <input 
                                                        type="date" 
                                                        className={`form-control border-start-0 ${errors.check_out ? 'is-invalid' : ''}`}
                                                        value={data.check_out}
                                                        min={data.check_in ? getTodayDateString(1) : getTodayDateString(1)}
                                                        onChange={(e) => setData('check_out', e.target.value)}
                                                        required
                                                    />
                                                    {errors.check_out && <div className="invalid-feedback">{errors.check_out}</div>}
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <label className="form-label small fw-bold text-muted">Guests</label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-white border-end-0"><i className="fas fa-user-friends text-gold"></i></span>
                                                    <select 
                                                        className={`form-select border-start-0 ${errors.guest_count ? 'is-invalid' : ''}`}
                                                        value={data.guest_count}
                                                        onChange={(e) => setData('guest_count', e.target.value)}
                                                    >
                                                        <option value="1">1 Adult</option>
                                                        <option value="2">2 Adults</option>
                                                        <option value="3">3 Adults</option>
                                                        <option value="4">4 Adults</option>
                                                    </select>
                                                    {errors.guest_count && <div className="invalid-feedback">{errors.guest_count}</div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 2: Select Room */}
                                <div className="booking-step mb-5" id="step2">
                                    <h3 className="h5 mb-3 text-gold font-serif"><i className="fas fa-bed me-2"></i>2. Choose Accommodation</h3>
                                    <div className="room-list d-flex flex-column gap-4">
                                        {displayRooms.map((room) => {
                                            const isSelected = String(room.id) === String(data.room_id);
                                            const resolvedImg = room.image_path.startsWith('http') ? room.image_path : `/${room.image_path}`;
                                            
                                            return (
                                                <div 
                                                    key={room.id} 
                                                    onClick={() => handleSelectRoom(room.id)}
                                                    className={`card room-select-card border-2 cursor-pointer shadow-sm overflow-hidden ${isSelected ? 'border-gold selected' : 'border-transparent'}`}
                                                    style={{ transition: 'all 0.3s ease', cursor: 'pointer' }}
                                                >
                                                    <div className="row g-0">
                                                        <div className="col-md-4 position-relative">
                                                            <img 
                                                                src={resolvedImg} 
                                                                className="img-fluid h-100 object-fit-cover w-100" 
                                                                style={{ minHeight: '180px' }}
                                                                alt={room.name} 
                                                            />
                                                            {isSelected && (
                                                                <span className="badge bg-gold text-white position-absolute top-0 start-0 m-3 px-3 py-2">
                                                                    Selected
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="col-md-8">
                                                            <div className="card-body p-4 d-flex flex-column h-100">
                                                                <div className="d-flex justify-content-between align-items-start mb-2">
                                                                    <h4 className="h5 card-title font-serif mb-0">{room.name}</h4>
                                                                </div>
                                                                <p className="card-text text-muted small flex-grow-1">{room.description}</p>
                                                                <div className="d-flex justify-content-between align-items-center mt-3">
                                                                    <span className="text-muted small"><i className="fas fa-user-friends me-1"></i> Max {room.capacity || 2} Adults</span>
                                                                    <button 
                                                                        type="button" 
                                                                        className={`btn btn-sm ${isSelected ? 'btn-primary-gold' : 'btn-outline-gold'}`}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleSelectRoom(room.id);
                                                                        }}
                                                                    >
                                                                        {isSelected ? 'Selected' : 'Select Room'}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        {errors.room_id && <div className="text-danger small mt-1"><i className="fas fa-exclamation-circle me-1"></i>{errors.room_id}</div>}
                                    </div>
                                </div>

                                {/* Step 3: Guest Details */}
                                <div className="booking-step mb-5" id="step3">
                                    <h3 className="h5 mb-3 text-gold font-serif"><i className="fas fa-user me-2"></i>3. Guest Details</h3>
                                    <div className="card border-0 shadow-sm p-4">
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <label className="form-label small">First Name</label>
                                                <input 
                                                    type="text" 
                                                    className={`form-control ${errors.first_name ? 'is-invalid' : ''}`}
                                                    value={data.first_name}
                                                    onChange={(e) => setData('first_name', e.target.value)}
                                                    required
                                                />
                                                {errors.first_name && <div className="invalid-feedback">{errors.first_name}</div>}
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label small">Last Name</label>
                                                <input 
                                                    type="text" 
                                                    className={`form-control ${errors.last_name ? 'is-invalid' : ''}`}
                                                    value={data.last_name}
                                                    onChange={(e) => setData('last_name', e.target.value)}
                                                    required
                                                />
                                                {errors.last_name && <div className="invalid-feedback">{errors.last_name}</div>}
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label small">Email</label>
                                                <input 
                                                    type="email" 
                                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                                    value={data.email}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    required
                                                />
                                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label small">Phone</label>
                                                <input 
                                                    type="tel" 
                                                    className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                                    value={data.phone}
                                                    onChange={(e) => setData('phone', e.target.value)}
                                                    required
                                                />
                                                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label small">Special Requests</label>
                                                <textarea 
                                                    className="form-control" 
                                                    rows="3"
                                                    value={data.special_requests}
                                                    onChange={(e) => setData('special_requests', e.target.value)}
                                                    placeholder="Specify any dietary restrictions, bedding preferences, or package notes..."
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar Booking Summary */}
                            <div className="col-lg-4">
                                <div className="booking-summary-box p-4 rounded bg-white shadow-sm" style={{ position: 'sticky', top: '100px' }}>
                                    <h4 className="h5 mb-4 border-bottom pb-2 font-serif text-dark"><i className="fas fa-receipt me-2 text-gold"></i>Booking Summary</h4>
                                    <div className="summary-details d-flex flex-column gap-3 mb-4 border-bottom pb-3">
                                        <div className="d-flex justify-content-between">
                                            <span className="text-muted small">Check-in:</span>
                                            <span className="fw-bold small">{data.check_in ? new Date(data.check_in).toLocaleDateString() : '-'}</span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <span className="text-muted small">Check-out:</span>
                                            <span className="fw-bold small">{data.check_out ? new Date(data.check_out).toLocaleDateString() : '-'}</span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <span className="text-muted small">Nights:</span>
                                            <span className="fw-bold small">{nights} {nights === 1 ? 'Night' : 'Nights'}</span>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mt-2">
                                            <span className="text-muted small">Room Type:</span>
                                            <span className="fw-bold text-end text-gold small" style={{ maxWidth: '60%' }}>
                                                {selectedRoom ? selectedRoom.name : 'Select accommodation'}
                                            </span>
                                        </div>
                                    </div>

                                    <button 
                                        type="submit" 
                                        id="confirmBookingBtn" 
                                        className="btn btn-primary-gold w-100 py-3 d-flex align-items-center justify-content-center gap-2"
                                        disabled={processing || !selectedRoom || nights <= 0}
                                    >
                                        {processing ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                Requesting...
                                            </>
                                        ) : (
                                            <>
                                                <i className="fas fa-paper-plane"></i>
                                                Request Booking
                                            </>
                                        )}
                                    </button>
                                    <div className="text-center text-muted small mt-3" style={{ fontSize: '0.75rem' }}>
                                        <i className="fas fa-check-circle me-1 text-gold"></i> Your reservation request is free and secure
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </MainLayout>
    );
}
