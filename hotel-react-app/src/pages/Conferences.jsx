import React from 'react';
import MainLayout from '../components/MainLayout';

export default function Conferences() {
    return (
        <MainLayout>
            {/* Header */}
            <header 
                className="hero-section d-flex align-items-center justify-content-center text-white position-relative"
                style={{
                    height: '50vh',
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/image assets/hotel rooms/conference_banquet_hall_1.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="container hero-content text-center position-relative z-1">
                    <h1 className="display-4 font-serif text-white">Conferences & Events</h1>
                    <p className="lead">Curated venues and professional hosting services for every engagement</p>
                </div>
            </header>

            {/* Activities */}
            <section className="container py-5">
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="card card-custom h-100 border-0 shadow-sm overflow-hidden hover-lift" style={{ transition: 'all 0.3s ease' }}>
                            <img 
                                src="/image assets/hotel rooms/conference_banquet_hall_projector_1.jpg" 
                                className="card-img-top object-fit-cover hover-zoom" 
                                style={{ height: '250px' }}
                                alt="Conference Hall" 
                                loading="lazy"
                            />
                            <div className="card-body p-4 text-center">
                                <h5 className="card-title text-gold font-serif h4 mb-3">Conferences & Seminars</h5>
                                <p className="card-text text-muted small">Host professional meetings, corporate workshops, and seminars in our fully equipped conference halls. Featuring advanced audio-visual technology and smart screens, our property can host up to 500+ delegates.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card card-custom h-100 border-0 shadow-sm overflow-hidden hover-lift" style={{ transition: 'all 0.3s ease' }}>
                            <img 
                                src="/image assets/hotel rooms/experience_kids_trampoline_1.jpg" 
                                className="card-img-top object-fit-cover hover-zoom" 
                                style={{ height: '250px' }}
                                alt="Playground Trampoline" 
                                loading="lazy"
                            />
                            <div className="card-body p-4 text-center">
                                <h5 className="card-title text-gold font-serif h4 mb-3">Kids Activities</h5>
                                <p className="card-text text-muted small">A secure and fun-filled play area for our younger guests. Featuring our high-quality safety-netted trampolines, a dedicated baby pool, football fields, and safe manicured lawn spaces.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card card-custom h-100 border-0 shadow-sm overflow-hidden hover-lift" style={{ transition: 'all 0.3s ease' }}>
                            <img 
                                src="/image assets/hotel rooms/dining_outdoor_catering_event.jpg" 
                                className="card-img-top object-fit-cover hover-zoom" 
                                style={{ height: '250px' }}
                                alt="Banquets & Weddings" 
                                loading="lazy"
                            />
                            <div className="card-body p-4 text-center">
                                <h5 className="card-title text-gold font-serif h4 mb-3">Events & Banqueting</h5>
                                <p className="card-text text-muted small">Host memorable celebrations, banquets, and corporate exhibitions. Our beautiful manicured wedding grounds, cocktail terraces, and outdoor event spaces can hold up to 2,000+ guests.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Clientele & Past Experience */}
            <section className="py-5" style={{ backgroundColor: '#fdfbfa', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                <div className="container">
                    <div className="row g-5 align-items-center">
                        <div className="col-lg-6">
                            <span className="text-gold uppercase tracking-wider text-sm fw-bold">Our Track Record</span>
                            <h2 className="font-serif display-6 mt-2 mb-4">Past Experience & Clientele</h2>
                            <p className="text-muted leading-relaxed small">Our seasoned management team has collectively handled high-profile events and managed complex hospitality operations, ensuring absolute professionalism and seamless execution for all engagements.</p>
                            
                            <div className="row g-3 mt-3">
                                <div className="col-sm-6">
                                    <div className="p-3 bg-white rounded shadow-sm border-start border-gold border-3">
                                        <i className="fas fa-briefcase text-gold mb-2"></i>
                                        <h6 className="fw-bold mb-1">Corporate Retreats</h6>
                                        <span className="text-muted small">Local and multinational company conferences.</span>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="p-3 bg-white rounded shadow-sm border-start border-gold border-3">
                                        <i className="fas fa-landmark text-gold mb-2"></i>
                                        <h6 className="fw-bold mb-1">Government Delegations</h6>
                                        <span className="text-muted small">Assemblies and ministerial retreats.</span>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="p-3 bg-white rounded shadow-sm border-start border-gold border-3">
                                        <i className="fas fa-globe text-gold mb-2"></i>
                                        <h6 className="fw-bold mb-1">NGO Workshops</h6>
                                        <span className="text-muted small">Capacity building retreats in quiet settings.</span>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="p-3 bg-white rounded shadow-sm border-start border-gold border-3">
                                        <i className="fas fa-heart text-gold mb-2"></i>
                                        <h6 className="fw-bold mb-1">Weddings & Parties</h6>
                                        <span className="text-muted small">Bespoke private celebrations on our lawns.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="position-relative">
                                <img 
                                    src="/image assets/hotel rooms/resort_exterior_lawn_view.jpg" 
                                    alt="Resort Grounds" 
                                    className="img-fluid rounded shadow" 
                                    loading="lazy"
                                />
                                <div className="position-absolute bottom-0 start-0 bg-dark text-white p-4 m-4 rounded shadow d-none d-md-block" style={{ borderLeft: '4px solid var(--gold, #c5a880)' }}>
                                    <p className="font-serif h5 mb-1 text-gold">Exceptional Services</p>
                                    <p className="small mb-0 text-white-50">Fully dedicated support team at your service.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Partner Section */}
            <section className="py-5 text-white" style={{ backgroundColor: 'var(--navy-dark, #0c192c)', borderTop: '2px solid var(--gold, #c5a880)' }}>
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="text-gold uppercase tracking-wider text-sm fw-bold">Our Value Proposition</span>
                        <h2 className="font-serif display-5 mt-2 text-white">Why Partner with Kinga Resorts</h2>
                        <div className="mx-auto mt-3" style={{ width: '60px', height: '2px', backgroundColor: 'var(--gold, #c5a880)' }}></div>
                    </div>
                    <div className="row g-4">
                        {[
                            { title: 'Strategic Location', desc: 'Easy access from Nairobi CBD (45 mins) and JKIA (30 mins), keeping you connected yet in serene nature.' },
                            { title: 'Customer-Focused Staff', desc: 'Highly experienced, professional team committed to delivering exceptional, personalized service.' },
                            { title: 'Modern Facilities', desc: 'Tailored state-of-the-art conferencing, leisure spaces, and premium banqueting setups.' },
                            { title: 'Full Legal & Tax Compliance', desc: 'Fully compliant with all Kenyan legal and tax requirements for clean corporate procurement.' },
                            { title: 'Value for Money', desc: 'Uncompromised quality and timely delivery of services at highly competitive rates.' }
                        ].map((item, idx) => (
                            <div key={idx} className="col-md-6 col-lg-4 mx-auto">
                                <div className="card h-100 border-0 p-4 text-white" style={{ backgroundColor: 'rgba(255,255,255,0.03)', transition: 'all 0.3s ease' }}>
                                    <h4 className="h5 text-gold mb-3 font-serif"><i className="fas fa-check-circle me-2 text-gold"></i> {item.title}</h4>
                                    <p className="text-white-50 small mb-0">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
