import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import MainLayout from '../../components/MainLayout';
import { rooms } from '../../data/rooms';

export default function Create() {
    const [searchParams] = useSearchParams();
    const selectedRoomId = searchParams.get('room_id');
    const selectedPackage = searchParams.get('package');

    // Dates initialization helper
    const getTodayDateString = (offsetDays = 0) => {
        const d = new Date();
        d.setDate(d.getDate() + offsetDays);
        return d.toISOString().split('T')[0];
    };

    // React Form State
    const [formData, setFormData] = useState({
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

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [processing, setProcessing] = useState(false);

    // Client calculations state
    const [nights, setNights] = useState(1);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [finance, setFinance] = useState({ subtotal: 0, taxes: 0, total: 0 });

    // Date validations and calculations
    useEffect(() => {
        if (formData.check_in && formData.check_out) {
            const checkInDate = new Date(formData.check_in);
            const checkOutDate = new Date(formData.check_out);

            const diffTime = checkOutDate - checkInDate;
            const computedNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            setNights(computedNights > 0 ? computedNights : 0);
        } else {
            setNights(0);
        }
    }, [formData.check_in, formData.check_out]);

    // Track selected room object
    useEffect(() => {
        const room = rooms.find(r => r.id === Number(formData.room_id));
        setSelectedRoom(room || null);
    }, [formData.room_id]);

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
            setFormData(prev => ({ ...prev, room_id: selectedRoomId }));
        }
    }, [selectedRoomId]);

    const handleSelectRoom = (roomId) => {
        setFormData(prev => ({ ...prev, room_id: String(roomId) }));
        // Scroll to guest details
        document.getElementById('step3')?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleFieldChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        
        // Mock processing delay
        setTimeout(() => {
            setProcessing(false);
            setIsSubmitted(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 1500);
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
                    {isSubmitted ? (
                        <div className="row justify-content-center py-5">
                            <div className="col-md-8 text-center bg-white p-5 rounded shadow-sm" style={{ borderTop: '4px solid var(--gold, #c5a880)' }}>
                                <i className="fas fa-check-circle text-gold fa-5x mb-4"></i>
                                <h2 className="font-serif display-6 text-dark mb-3">Booking Request Received!</h2>
                                <p className="lead text-muted mb-4">Thank you, <strong>{formData.first_name} {formData.last_name}</strong>. Your stay at the beautiful <strong>{selectedRoom?.name}</strong> has been requested successfully.</p>
                                
                                <div className="p-4 rounded mb-4 text-start bg-light" style={{ borderLeft: '3px solid var(--gold, #c5a880)' }}>
                                    <h4 className="h6 font-serif text-gold mb-3 text-uppercase fw-bold">Reservation Summary</h4>
                                    <div className="row g-2 small">
                                        <div className="col-sm-6"><strong>Check-In:</strong> {new Date(formData.check_in).toLocaleDateString()}</div>
                                        <div className="col-sm-6"><strong>Check-Out:</strong> {new Date(formData.check_out).toLocaleDateString()}</div>
                                        <div className="col-sm-6"><strong>Guests:</strong> {formData.guest_count} Adults</div>
                                        <div className="col-sm-6"><strong>Duration:</strong> {nights} {nights === 1 ? 'Night' : 'Nights'}</div>
                                        {selectedPackage && <div className="col-sm-12"><strong>Selected Package:</strong> {selectedPackage === 'wellness' ? 'Wellness Retreat Package' : 'Honeymoon Bliss'}</div>}
                                        <div className="col-12 mt-2 border-top pt-2 d-flex justify-content-between">
                                            <strong>Total Estimate (with 10% tax):</strong>
                                            <strong className="text-gold">KES {finance.total.toLocaleString()}</strong>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-muted small mb-4">A confirmation email has been sent to <strong>{formData.email}</strong>. Our guest relations manager will call you at <strong>{formData.phone}</strong> shortly to finalize your custom details.</p>
                                <Link to="/" className="btn btn-primary-gold px-4 py-2">Return Home</Link>
                            </div>
                        </div>
                    ) : (
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
                                                            className="form-control border-start-0"
                                                            value={formData.check_in}
                                                            min={getTodayDateString(0)}
                                                            onChange={(e) => handleFieldChange('check_in', e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <label className="form-label small fw-bold text-muted">Check-out</label>
                                                    <div className="input-group">
                                                        <span className="input-group-text bg-white border-end-0"><i className="fas fa-calendar-check text-gold"></i></span>
                                                        <input 
                                                            type="date" 
                                                            className="form-control border-start-0"
                                                            value={formData.check_out}
                                                            min={formData.check_in ? getTodayDateString(1) : getTodayDateString(1)}
                                                            onChange={(e) => handleFieldChange('check_out', e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <label className="form-label small fw-bold text-muted">Guests</label>
                                                    <div className="input-group">
                                                        <span className="input-group-text bg-white border-end-0"><i className="fas fa-user-friends text-gold"></i></span>
                                                        <select 
                                                            className="form-select border-start-0"
                                                            value={formData.guest_count}
                                                            onChange={(e) => handleFieldChange('guest_count', e.target.value)}
                                                        >
                                                            <option value="1">1 Adult</option>
                                                            <option value="2">2 Adults</option>
                                                            <option value="3">3 Adults</option>
                                                            <option value="4">4 Adults</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 2: Select Room */}
                                    <div className="booking-step mb-5" id="step2">
                                        <h3 className="h5 mb-3 text-gold font-serif"><i className="fas fa-bed me-2"></i>2. Choose Accommodation</h3>
                                        <div className="room-list d-flex flex-column gap-4">
                                            {rooms.map((room) => {
                                                const isSelected = String(room.id) === String(formData.room_id);
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
                                                        className="form-control"
                                                        value={formData.first_name}
                                                        onChange={(e) => handleFieldChange('first_name', e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label small">Last Name</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control"
                                                        value={formData.last_name}
                                                        onChange={(e) => handleFieldChange('last_name', e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label small">Email</label>
                                                    <input 
                                                        type="email" 
                                                        className="form-control"
                                                        value={formData.email}
                                                        onChange={(e) => handleFieldChange('email', e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label small">Phone</label>
                                                    <input 
                                                        type="tel" 
                                                        className="form-control"
                                                        value={formData.phone}
                                                        onChange={(e) => handleFieldChange('phone', e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <label className="form-label small">Special Requests</label>
                                                    <textarea 
                                                        className="form-control" 
                                                        rows="3"
                                                        value={formData.special_requests}
                                                        onChange={(e) => handleFieldChange('special_requests', e.target.value)}
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
                                                <span className="fw-bold small">{formData.check_in ? new Date(formData.check_in).toLocaleDateString() : '-'}</span>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <span className="text-muted small">Check-out:</span>
                                                <span className="fw-bold small">{formData.check_out ? new Date(formData.check_out).toLocaleDateString() : '-'}</span>
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
                                            {selectedRoom && (
                                                <div className="border-top pt-2">
                                                    <div className="d-flex justify-content-between small">
                                                        <span className="text-muted">Subtotal:</span>
                                                        <span>KES {finance.subtotal.toLocaleString()}</span>
                                                    </div>
                                                    <div className="d-flex justify-content-between small">
                                                        <span className="text-muted">Taxes (10%):</span>
                                                        <span>KES {finance.taxes.toLocaleString()}</span>
                                                    </div>
                                                    <div className="d-flex justify-content-between fw-bold text-dark mt-1">
                                                        <span>Total:</span>
                                                        <span className="text-gold">KES {finance.total.toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            )}
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
                    )}
                </div>
            </main>
        </MainLayout>
    );
}
