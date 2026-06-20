import React from 'react';
import MainLayout from '../Layouts/MainLayout';

export default function Dining() {
    return (
        <MainLayout>
            {/* Header */}
            <header 
                className="hero-section d-flex align-items-center justify-content-center text-white position-relative"
                style={{
                    height: '50vh',
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/image assets/hotel rooms/dining_outdoor_catering_event.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="container hero-content text-center position-relative z-1">
                    <h1 className="display-4 font-serif text-white">Culinary Journeys</h1>
                    <p className="lead">Savor the flavors of the world and local delicacies</p>
                </div>
            </header>

            {/* Restaurants */}
            <section className="container py-5">
                <div className="text-center mb-5">
                    <h2 className="font-serif display-5">Our Dining Venues</h2>
                    <p className="text-muted">A harmonious blend of international culinary craft and local ingredients</p>
                </div>
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="card border-0 shadow-sm overflow-hidden h-100 card-custom hover-lift" style={{ transition: 'all 0.3s ease' }}>
                            <div style={{ height: '260px', overflow: 'hidden' }}>
                                <img 
                                    src="/image assets/hotel rooms/dining_buffet_spread_1.jpg" 
                                    className="w-100 h-100 object-fit-cover hover-zoom" 
                                    alt="Kinga Multi-Cuisine Restaurant" 
                                    loading="lazy"
                                />
                            </div>
                            <div className="card-body p-4 text-center">
                                <h3 className="h4 text-gold mb-3 font-serif">Multi-Cuisine Restaurant</h3>
                                <p className="text-muted small">Our main dining venue offers a rich selection of international dishes, hot entrees, and freshly prepared local delicacies. Available for buffet service and a-la-carte dining.</p>
                                <p className="mb-4 small"><strong>Hours:</strong> 6:30 AM - 10:00 PM</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card border-0 shadow-sm overflow-hidden h-100 card-custom hover-lift" style={{ transition: 'all 0.3s ease' }}>
                            <div style={{ height: '260px', overflow: 'hidden' }}>
                                <img 
                                    src="/image assets/hotel rooms/dining_gala_dinner_table.jpg" 
                                    className="w-100 h-100 object-fit-cover hover-zoom" 
                                    alt="Executive Lounge" 
                                    loading="lazy"
                                />
                            </div>
                            <div className="card-body p-4 text-center">
                                <h3 className="h4 text-gold mb-3 font-serif">Executive Lounge</h3>
                                <p className="text-muted small">Relax in a sophisticated setting. The lounge offers the perfect ambiance for quiet business discussions or wind-downs, serving premium cocktails, beverages, and light bites.</p>
                                <p className="mb-4 small"><strong>Hours:</strong> 11:00 AM - 11:00 PM</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card border-0 shadow-sm overflow-hidden h-100 card-custom hover-lift" style={{ transition: 'all 0.3s ease' }}>
                            <div style={{ height: '260px', overflow: 'hidden' }}>
                                <img 
                                    src="/image assets/hotel rooms/dining_outdoor_catering_event.jpg" 
                                    className="w-100 h-100 object-fit-cover hover-zoom" 
                                    alt="Al Fresco & Garden Dining" 
                                    loading="lazy"
                                />
                            </div>
                            <div className="card-body p-4 text-center">
                                <h3 className="h4 text-gold mb-3 font-serif">Al Fresco & Garden Dining</h3>
                                <p className="text-muted small">Immerse yourself in nature. Savor garden breakfasts, lunches, and themed outdoor catering events set against the scenic, peaceful backdrops of Machakos County.</p>
                                <p className="mb-4 small"><strong>Hours:</strong> 7:00 AM - 9:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
