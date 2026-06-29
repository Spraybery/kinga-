import React, { useState } from 'react';
import MainLayout from '../Layouts/MainLayout';

export default function Contact() {
    // Contact Form State
    const [contactForm, setContactForm] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });
    const [contactSuccess, setContactSuccess] = useState(false);
    
    // Itinerary Form State
    const [itineraryForm, setItineraryForm] = useState({ activity: 'Select Activity', date: '', requests: '' });
    const [itinerarySuccess, setItinerarySuccess] = useState(false);

    const handleContactSubmit = (e) => {
        e.preventDefault();
        // Mock submission
        setContactSuccess(true);
        setTimeout(() => {
            setContactForm({ name: '', email: '', subject: 'General Inquiry', message: '' });
            setContactSuccess(false);
        }, 3000);
    };

    const handleItinerarySubmit = (e) => {
        e.preventDefault();
        // Mock submission
        setItinerarySuccess(true);
        setTimeout(() => {
            setItineraryForm({ activity: 'Select Activity', date: '', requests: '' });
            setItinerarySuccess(false);
        }, 3000);
    };

    return (
        <MainLayout>
            {/* Header */}
            <header 
                className="hero-section d-flex align-items-center justify-content-center text-white position-relative"
                style={{
                    height: '50vh',
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/image assets/hotel rooms/resort_exterior_lawn_view.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="container hero-content text-center position-relative z-1">
                    <h1 className="display-4 font-serif text-white">Contact Us</h1>
                    <p className="lead">We're here to help plan your perfect stay</p>
                </div>
            </header>

            {/* Contact Form & Info */}
            <section className="container py-5">
                <div className="row g-5">
                    <div className="col-md-6">
                        <h3>Get in Touch</h3>
                        <p className="text-muted mb-4">Have questions about our rooms, dining, or experiences? Fill out the form below and we will get back to you shortly.</p>
                        
                        {contactSuccess && (
                            <div className="alert alert-success" role="alert">
                                <i className="fas fa-check-circle me-2"></i>
                                Thank you! Your message has been sent successfully. We will get back to you soon.
                            </div>
                        )}

                        <form onSubmit={handleContactSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="name" 
                                    placeholder="Your Full Name"
                                    value={contactForm.name}
                                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    id="email" 
                                    placeholder="name@example.com"
                                    value={contactForm.email}
                                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="subject" class="form-label">Subject</label>
                                <select 
                                    className="form-select" 
                                    id="subject"
                                    value={contactForm.subject}
                                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                                >
                                    <option>General Inquiry</option>
                                    <option>Reservations</option>
                                    <option>Events & Weddings</option>
                                    <option>Feedback</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="message" className="form-label">Message</label>
                                <textarea 
                                    className="form-control" 
                                    id="message" 
                                    rows="5"
                                    value={contactForm.message}
                                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary-gold">Send Message</button>
                        </form>
                    </div>

                    <div className="col-md-6">
                        <div className="ps-md-5">
                            <h3>Contact Information</h3>
                            <ul className="list-unstyled mt-4">
                                <li className="mb-4 d-flex">
                                    <i className="fas fa-map-marker-alt text-gold mt-1 me-3 fa-lg"></i>
                                    <div>
                                        <strong>Address:</strong><br />
                                        P.O. Box 1056-90100<br />
                                        Machakos County, Kenya
                                    </div>
                                </li>
                                <li className="mb-4 d-flex">
                                    <i className="fas fa-phone text-gold mt-1 me-3 fa-lg"></i>
                                    <div>
                                        <strong>Phone:</strong><br />
                                        <a href="tel:0719525314" className="text-dark text-decoration-none hover-gold">0719525314</a> / <a href="tel:0719525428" className="text-dark text-decoration-none hover-gold">0719525428</a><br />
                                        <small className="text-muted">Available 24/7 for inquiries</small>
                                    </div>
                                </li>
                                <li className="mb-4 d-flex">
                                    <i className="fas fa-envelope text-gold mt-1 me-3 fa-lg"></i>
                                    <div>
                                        <strong>Email:</strong><br />
                                        <a href="mailto:info@kingaresort.com" className="text-dark text-decoration-none hover-gold">info@kingaresort.com</a>
                                    </div>
                                </li>
                            </ul>

                            {/* Map Placeholder */}
                            <div 
                                className="bg-light p-4 text-center text-muted rounded shadow-sm d-flex align-items-center justify-content-center"
                                style={{ height: '250px', border: '1px solid #ddd' }}
                            >
                                <div className="d-flex flex-column align-items-center">
                                    <i className="fas fa-map fa-3x text-gold mb-3"></i>
                                    <span className="fw-semibold">Machakos County, Kenya</span>
                                    <span className="small text-muted">Conveniently located approx. 30 mins from JKIA & 45 mins from Nairobi CBD.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Schedule Activities Section */}
            <section id="schedule" className="bg-light py-5">
                <div className="container">
                    <div className="section-title text-center mb-5">
                        <h2 className="font-serif">Plan Your Itinerary</h2>
                        <p className="text-muted">Schedule your experiences before you arrive</p>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card border-0 shadow-sm p-4">
                                {itinerarySuccess && (
                                    <div className="alert alert-success" role="alert">
                                        <i className="fas fa-check-circle me-2"></i>
                                        Thank you! Your itinerary request has been received. Our concierge team will reach out.
                                    </div>
                                )}
                                <form onSubmit={handleItinerarySubmit}>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label small">Activity Type</label>
                                            <select 
                                                className="form-select"
                                                value={itineraryForm.activity}
                                                onChange={(e) => setItineraryForm({ ...itineraryForm, activity: e.target.value })}
                                                required
                                            >
                                                <option disabled value="Select Activity">Select Activity</option>
                                                <option>Conference Hall Booking</option>
                                                <option>Kids Play Zone / Activities</option>
                                                <option>Wedding & Outdoor Banquet</option>
                                                <option>Accommodation Stay</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small">Preferred Date</label>
                                            <input 
                                                type="date" 
                                                className="form-control"
                                                value={itineraryForm.date}
                                                onChange={(e) => setItineraryForm({ ...itineraryForm, date: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label small">Additional Requests</label>
                                            <textarea 
                                                className="form-control" 
                                                rows="3"
                                                value={itineraryForm.requests}
                                                onChange={(e) => setItineraryForm({ ...itineraryForm, requests: e.target.value })}
                                            ></textarea>
                                        </div>
                                        <div className="col-12 text-center">
                                            <button type="submit" className="btn btn-primary-gold">Request Schedule</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
