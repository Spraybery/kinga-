import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import { rooms } from '../data/rooms';
import { Carousel } from 'bootstrap';

export default function Home() {
    const navigate = useNavigate();

    const handleQuickBook = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const params = new URLSearchParams(formData).toString();
        navigate(`/bookings/create?${params}`);
    };

    // Hero Carousel State
    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselRef = useRef(null);
    const autoPlayRef = useRef(null);

    const slides = [
        {
            image: "/image assets/hero/hero_1.jpg",
            title: "Adventure In Comfort,\nLuxury In Nature",
            lead: "Experience the ultimate escape in our pristine sanctuary.",
            btnText: "Explore Your Stay",
            btnLink: "/accommodations"
        },
        {
            image: "/image assets/hero/hero_bedroom.jpg",
            title: "Unparalleled Elegance",
            lead: "Where modern luxury meets timeless sophistication.",
            btnText: "View Accommodations",
            btnLink: "/accommodations"
        },
        {
            image: "/image assets/hero/hero_3.jpg",
            title: "Host Your Events With Us",
            lead: "Premium conference and banquet facilities.",
            btnText: "Discover Experiences",
            btnLink: "/conferences"
        },
        {
            image: "/image assets/hero/hero_buffet.jpg",
            title: "Culinary Delights",
            lead: "Savor exquisite international and local cuisines.",
            btnText: "Explore Dining",
            btnLink: "/dining"
        }
    ];

    const showNextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const showPrevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const startAutoPlay = () => {
        stopAutoPlay();
        autoPlayRef.current = setInterval(showNextSlide, 5000);
    };

    const stopAutoPlay = () => {
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
        }
    };

    useEffect(() => {
        startAutoPlay();
        return () => stopAutoPlay();
    }, []);

    // Keyboard Navigation for Carousel
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft') {
            showPrevSlide();
            startAutoPlay();
        } else if (e.key === 'ArrowRight') {
            showNextSlide();
            startAutoPlay();
        }
    };

    // FAQ Accordion State
    const [faqOpen, setFaqOpen] = useState({ 0: true, 1: false, 2: false });
    const toggleFaq = (idx) => {
        setFaqOpen(prev => ({ ...prev, [idx]: !prev[idx] }));
    };

    // Programmatic initialization of the Philosophy Carousel to ensure auto-scroll in built output
    useEffect(() => {
        const carouselEl = document.getElementById('mvvCarousel');
        if (carouselEl) {
            const carousel = new Carousel(carouselEl, {
                interval: 5000,
                ride: 'carousel',
                wrap: true
            });
            carousel.cycle();
            return () => {
                carousel.dispose();
            };
        }
    }, []);

    const displayRooms = rooms.slice(0, 3);

    return (
        <MainLayout>
            {/* Hero Carousel */}
            <header 
                className="hero-carousel position-relative overflow-hidden" 
                role="banner" 
                ref={carouselRef}
                tabIndex="0" 
                onKeyDown={handleKeyDown}
                onMouseEnter={stopAutoPlay}
                onMouseLeave={startAutoPlay}
                aria-label="Resort showcase carousel"
                style={{ height: '85vh', outline: 'none' }}
            >
                {slides.map((slide, idx) => (
                    <div 
                        key={idx}
                        className={`carousel-slide position-absolute w-100 h-100 top-0 start-0 d-flex align-items-center ${idx === currentSlide ? 'active' : ''}`}
                        style={{
                            backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('${slide.image}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: idx === currentSlide ? 1 : 0,
                            visibility: idx === currentSlide ? 'visible' : 'hidden',
                            transition: 'opacity 1s ease-in-out, visibility 1s ease-in-out',
                            zIndex: idx === currentSlide ? 1 : 0
                        }}
                    >
                        <div className="container hero-content text-white position-relative z-2">
                            <h1 className="display-3 fw-bold mb-3 font-serif" style={{ whiteSpace: 'pre-line' }}>{slide.title}</h1>
                            <p className="lead fs-4 mb-4">{slide.lead}</p>
                            {slide.btnLink.startsWith('#') ? (
                                 <a href={slide.btnLink} className="btn btn-primary-gold btn-lg">{slide.btnText}</a>
                             ) : (
                                 <Link to={slide.btnLink} className="btn btn-primary-gold btn-lg">{slide.btnText}</Link>
                             )}
                        </div>
                    </div>
                ))}

                {/* Quick Booking Bar */}
                <div className="position-absolute bottom-0 start-50 translate-middle-x w-100 z-3 px-3" style={{ maxWidth: '1100px', marginBottom: '8vh' }}>
                    <div className="bg-white p-4 shadow-lg rounded">
                        <form className="row g-3 align-items-end" onSubmit={handleQuickBook}>
                            <div className="col-md-3">
                                <label className="form-label small fw-bold text-muted mb-1"><i className="far fa-calendar-alt me-2 text-gold"></i>CHECK-IN</label>
                                <input type="date" className="form-control form-control-lg border-0 bg-light" name="check_in" required />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label small fw-bold text-muted mb-1"><i className="far fa-calendar-alt me-2 text-gold"></i>CHECK-OUT</label>
                                <input type="date" className="form-control form-control-lg border-0 bg-light" name="check_out" required />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label small fw-bold text-muted mb-1"><i className="far fa-user me-2 text-gold"></i>GUESTS</label>
                                <select className="form-select form-select-lg border-0 bg-light" name="guests" defaultValue="2">
                                    <option value="1">1 Adult</option>
                                    <option value="2">2 Adults</option>
                                    <option value="3">3 Adults</option>
                                    <option value="4">4 Adults</option>
                                    <option value="5">5+ Adults</option>
                                </select>
                            </div>
                            <div className="col-md-3">
                                <button type="submit" className="btn btn-primary-gold btn-lg w-100 h-100 py-3">Check Availability</button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Navigation Arrows */}
                <button 
                    className="carousel-arrow prev position-absolute top-50 start-0 translate-middle-y border-0 bg-transparent text-white px-4 py-3"
                    onClick={() => { showPrevSlide(); startAutoPlay(); }}
                    aria-label="Previous slide"
                    style={{ zIndex: 10, cursor: 'pointer' }}
                >
                    <i className="fas fa-chevron-left fa-2x"></i>
                </button>
                <button 
                    className="carousel-arrow next position-absolute top-50 end-0 translate-middle-y border-0 bg-transparent text-white px-4 py-3"
                    onClick={() => { showNextSlide(); startAutoPlay(); }}
                    aria-label="Next slide"
                    style={{ zIndex: 10, cursor: 'pointer' }}
                >
                    <i className="fas fa-chevron-right fa-2x"></i>
                </button>

                {/* Carousel Indicators */}
                <div 
                    className="carousel-indicators position-absolute bottom-0 start-50 translate-middle-x d-flex gap-2 mb-4" 
                    role="tablist" 
                    aria-label="Carousel navigation"
                    style={{ zIndex: 10 }}
                >
                    {slides.map((_, idx) => (
                        <button 
                            key={idx}
                            className={`carousel-dot border-0 rounded-circle ${idx === currentSlide ? 'active' : ''}`}
                            onClick={() => { setCurrentSlide(idx); startAutoPlay(); }}
                            aria-label={`Go to slide ${idx + 1}`} 
                            role="tab"
                            aria-selected={idx === currentSlide}
                            style={{ 
                                width: '12px', 
                                height: '12px', 
                                backgroundColor: idx === currentSlide ? 'var(--gold, #c5a880)' : 'rgba(255,255,255,0.5)',
                                transition: 'background-color 0.3s ease'
                            }}
                        ></button>
                    ))}
                </div>
            </header>

            {/* Intro Section */}
            <section className="philosophy-section py-5 bg-white" aria-labelledby="philosophy-title" data-aos="fade-up">
                <div className="row align-items-center">
                    <div className="col-md-6 mb-4 mb-md-0">
                        <img 
                            src="/image assets/hotel rooms/room_blue_velvet_bed.jpg" 
                            alt="Elegant resort interior with modern furnishings" 
                            className="img-fluid rounded shadow-sm"
                            loading="lazy"
                        />
                    </div>
                    <div className="col-md-6 ps-md-5">
                        <h2 id="intro-heading" className="font-serif display-5 mb-3">A Sanctuary for the Soul</h2>
                        <p className="text-muted leading-relaxed">Kinga Resorts is a premier hospitality establishment located in Machakos County, approximately 30 minutes from JKIA and 45 minutes from Nairobi CBD. Our property is designed to serve both local and international guests, with a strong focus on delivering exceptional service standards and memorable experiences.</p>
                        <p className="text-muted leading-relaxed">Offering world-class accommodation, state-of-the-art conferencing, and multi-cuisine dining options, we blend adventure in comfort and luxury in nature. Our property also features robust leisure facilities including secure play areas, safety-netted trampolines, a baby pool, and football fields for family retreats.</p>
                        <a href="#experiences" className="btn btn-outline-gold mt-3">Discover Experiences</a>
                    </div>
                </div>
            </section>

            {/* Mission, Vision & Values Section */}
            <section className="py-5 text-white" style={{ backgroundColor: 'var(--navy-dark, #0c192c)', borderTop: '2px solid var(--gold, #c5a880)', borderBottom: '2px solid var(--gold, #c5a880)' }} aria-labelledby="mvv-heading">
                <div className="container py-4">
                    <div className="text-center mb-5">
                        <span className="text-gold uppercase tracking-wider text-sm fw-bold">Our Philosophy</span>
                        <h2 id="mvv-heading" className="font-serif display-5 mt-2 text-white">Mission, Vision & Values</h2>
                        <div className="mx-auto mt-3" style={{ width: '60px', height: '2px', backgroundColor: 'var(--gold, #c5a880)' }}></div>
                    </div>
                    <div id="mvvCarousel" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-indicators" style={{ bottom: '-50px' }}>
                            <button type="button" data-bs-target="#mvvCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#mvvCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#mvvCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner pb-5">
                            <div className="carousel-item active">
                                <div className="col-md-8 col-lg-6 mx-auto">
                                    <div className="card h-100 border-0 p-4 text-center text-white" style={{ backgroundColor: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)', transition: 'all 0.3s ease' }}>
                                        <div className="mb-4 text-gold">
                                            <i className="fas fa-bullseye fa-3x"></i>
                                        </div>
                                        <h3 className="h4 font-serif text-gold mb-3">Mission</h3>
                                        <p className="text-white-50 leading-relaxed small">To consistently exceed guest expectations through personalized service, innovative experiences, and sustainable hospitality practices.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="col-md-8 col-lg-6 mx-auto">
                                    <div className="card h-100 border-0 p-4 text-center text-white" style={{ backgroundColor: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)', transition: 'all 0.3s ease' }}>
                                        <div className="mb-4 text-gold">
                                            <i className="fas fa-eye fa-3x"></i>
                                        </div>
                                        <h3 className="h4 font-serif text-gold mb-3">Vision</h3>
                                        <p className="text-white-50 leading-relaxed small">To be the first choice hospitality destination in Kenya, recognized for exceptional service and unforgettable experiences.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="col-md-8 col-lg-6 mx-auto">
                                    <div className="card h-100 border-0 p-4 text-white" style={{ backgroundColor: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)', transition: 'all 0.3s ease' }}>
                                        <div className="text-center mb-3 text-gold">
                                            <i className="fas fa-gem fa-3x"></i>
                                        </div>
                                        <h3 className="h4 font-serif text-gold text-center mb-4">Core Values</h3>
                                        <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
                                            <li className="d-flex align-items-start gap-3">
                                                <i className="fas fa-star text-gold mt-1"></i>
                                                <div>
                                                    <strong className="text-white d-block">Excellence</strong>
                                                    <span className="text-white-50 small">Striving for the highest quality in every service we deliver.</span>
                                                </div>
                                            </li>
                                            <li className="d-flex align-items-start gap-3">
                                                <i className="fas fa-shield-alt text-gold mt-1"></i>
                                                <div>
                                                    <strong className="text-white d-block">Integrity</strong>
                                                    <span className="text-white-50 small">Conducting ourselves with absolute honesty and transparency.</span>
                                                </div>
                                            </li>
                                            <li className="d-flex align-items-start gap-3">
                                                <i className="fas fa-heart text-gold mt-1"></i>
                                                <div>
                                                    <strong className="text-white d-block">Customer-Centric</strong>
                                                    <span className="text-white-50 small">Putting our guests' comfort and happiness at the center of everything.</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#mvvCarousel" data-bs-slide="prev" style={{ width: '5%' }}>
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#mvvCarousel" data-bs-slide="next" style={{ width: '5%' }}>
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Featured Accommodations */}
            <section id="accommodations" className="accommodations-section py-5" aria-labelledby="accommodations-title" data-aos="fade-up">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 id="accommodations-heading" className="font-serif display-5">Accommodations</h2>
                        <p className="text-muted">Elegance meets wilderness</p>
                    </div>
                    <div className="row g-4">
                        {displayRooms.map((room) => (
                            <div key={room.id} className="col-md-4">
                                <article className="card card-custom border-0 shadow-sm h-100 overflow-hidden" tabIndex="0">
                                    <div style={{ height: '250px', overflow: 'hidden' }}>
                                        <img 
                                            src={room.image_path.startsWith('http') ? room.image_path : `/${room.image_path}`} 
                                            className="card-img-top w-100 h-100 object-fit-cover hover-zoom" 
                                            alt={room.name} 
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="card-body text-center p-4">
                                        <h3 className="card-title h5 font-serif">{room.name}</h3>
                                        <p className="card-text text-muted small">{room.description}</p>
                                        <Link to={`/bookings/create?room_id=${room.id}`} className="btn btn-outline-gold btn-sm mt-3">Book This Room</Link>
                                    </div>
                                </article>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Capacity Highlights Section */}
            <section className="py-5" style={{ backgroundColor: '#fdfbfa' }} aria-labelledby="capacity-heading">
                <div className="container py-4">
                    <div className="text-center mb-5">
                        <span className="text-gold uppercase tracking-wider text-sm fw-bold">Our Capacity</span>
                        <h2 id="capacity-heading" className="font-serif display-5 mt-2">Built for Exceptional Experiences</h2>
                        <p className="text-muted max-w-2xl mx-auto">Whether hosting private getaways, large conventions, or outdoor banquets, our resort features modern infrastructure designed to accommodate your needs perfectly.</p>
                    </div>
                    <div className="row g-4 text-center">
                        <div className="col-md-4">
                            <div className="p-4 bg-white rounded shadow-sm border border-light h-100 hover-lift" style={{ transition: 'all 0.3s ease' }}>
                                <div className="text-gold mb-3"><i className="fas fa-bed fa-2x"></i></div>
                                <h3 className="display-4 fw-bold text-navy" style={{ color: 'var(--navy-dark, #0c192c)' }}>100+</h3>
                                <h4 className="h5 font-serif mb-2">Luxury Accommodation Guests</h4>
                                <p className="text-muted small mb-0">Fully serviced, modern rooms and suites featuring top-tier comfort and amenities.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-4 bg-white rounded shadow-sm border border-light h-100 hover-lift" style={{ transition: 'all 0.3s ease' }}>
                                <div className="text-gold mb-3"><i className="fas fa-users fa-2x"></i></div>
                                <h3 className="display-4 fw-bold text-navy" style={{ color: 'var(--navy-dark, #0c192c)' }}>500+</h3>
                                <h4 className="h5 font-serif mb-2">Conference Delegates</h4>
                                <p className="text-muted small mb-0">State-of-the-art meeting halls equipped with full audio-visual technologies.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-4 bg-white rounded shadow-sm border border-light h-100 hover-lift" style={{ transition: 'all 0.3s ease' }}>
                                <div className="text-gold mb-3"><i className="fas fa-tree fa-2x"></i></div>
                                <h3 className="display-4 fw-bold text-navy" style={{ color: 'var(--navy-dark, #0c192c)' }}>2,000+</h3>
                                <h4 className="h5 font-serif mb-2">Outdoor Event Attendees</h4>
                                <p className="text-muted small mb-0">Lush manicured wedding grounds, cocktail terraces, and exhibition lawns.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Resort Experiences Section */}
            <section id="experiences" className="experiences-section py-5 bg-white" aria-labelledby="experiences-title" data-aos="fade-up" style={{ scrollMarginTop: '80px' }}>
                <div className="container py-4">
                    <div className="text-center mb-5">
                        <span className="text-gold uppercase tracking-wider text-sm fw-bold">Recreation & Leisure</span>
                        <h2 id="experiences-heading" className="font-serif display-5 mt-2">Resort Experiences</h2>
                        <div className="mx-auto mt-3" style={{ width: '60px', height: '2px', backgroundColor: 'var(--gold, #c5a880)' }}></div>
                        <p className="text-muted max-w-2xl mx-auto mt-3">Immerse yourself in our serene environment with activities designed to relax, rejuvenate, and reconnect with nature.</p>
                    </div>
                    <div className="row g-4">
                        {[
                            {
                                title: "Swimming Pools",
                                image: "/image assets/hotel rooms/resort_swimming_pool.jpg",
                                desc: "Relax in our crystal-clear main pool or let the kids splash safely in the dedicated, safety-monitored baby pool.",
                                icon: "fa-swimming-pool"
                            },
                            {
                                title: "Bird Watching",
                                image: "/image assets/hotel rooms/resort_bird_watching.jpg",
                                desc: "Discover the vibrant local bird species nesting in our quiet, sun-dappled botanical courtyard gardens.",
                                icon: "fa-binoculars"
                            },
                            {
                                title: "Jogging & Nature Walk",
                                image: "/image assets/hotel rooms/resort_jogging_path.jpg",
                                desc: "Invigorate your mornings with clean country air along our scenic nature trails winding through green canopies.",
                                icon: "fa-running"
                            },
                            {
                                title: "Bike Riding",
                                image: "/image assets/hotel rooms/resort_bike_riding.jpg",
                                desc: "Explore the resort's extensive paths and scenic scenery at your own pace with complimentary leisure bicycles.",
                                icon: "fa-bicycle"
                            }
                        ].map((exp, idx) => (
                            <div key={idx} className="col-md-6 col-lg-3">
                                <article className="card card-custom border-0 shadow-sm h-100 overflow-hidden hover-lift" style={{ transition: 'all 0.3s ease' }}>
                                    <div className="position-relative" style={{ height: '200px', overflow: 'hidden' }}>
                                        <img 
                                            src={exp.image} 
                                            className="card-img-top w-100 h-100 object-fit-cover hover-zoom" 
                                            alt={exp.title} 
                                            loading="lazy"
                                        />
                                        <div className="position-absolute top-0 start-0 m-3 bg-dark text-gold rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(12, 25, 44, 0.85)', border: '1px solid rgba(197, 168, 128, 0.3)' }}>
                                            <i className={`fas ${exp.icon}`}></i>
                                        </div>
                                    </div>
                                    <div className="card-body p-4 text-center">
                                        <h3 className="h5 font-serif mb-2">{exp.title}</h3>
                                        <p className="card-text text-muted small mb-0">{exp.desc}</p>
                                    </div>
                                </article>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Corporate & Event Partnerships Section */}
            <section className="py-5" style={{ backgroundColor: 'var(--navy-dark, #0c192c)', borderTop: '2px solid var(--gold, #c5a880)', borderBottom: '2px solid var(--gold, #c5a880)' }} aria-labelledby="corporate-heading">
                <div className="container py-4 text-white">
                    <div className="row g-5 align-items-center">
                        <div className="col-lg-6">
                            <span className="text-gold uppercase tracking-wider text-sm fw-bold">Event Excellence</span>
                            <h2 id="corporate-heading" className="font-serif display-5 mt-2 text-white">Corporate Conferences & Bespoke Events</h2>
                            <p className="text-white-50 leading-relaxed small mt-3">
                                With the resources, expertise, and operational systems to deliver large-scale hospitality services, Kinga Resorts is equipped for both short and long-term engagements. Our seasoned management team has collectively handled high-profile events and managed hospitality operations for some of the region's leading organizations.
                            </p>
                            
                            <ul className="list-unstyled d-flex flex-column gap-3 mt-4">
                                <li className="d-flex align-items-start gap-3">
                                    <i className="fas fa-check-circle text-gold mt-1"></i>
                                    <div>
                                        <strong className="text-white d-block">Corporate Conferences & Retreats</strong>
                                        <span className="text-white-50 small">Tailored setups for local and multinational company workshops.</span>
                                    </div>
                                </li>
                                <li className="d-flex align-items-start gap-3">
                                    <i className="fas fa-check-circle text-gold mt-1"></i>
                                    <div>
                                        <strong className="text-white d-block">Government & NGO Delegations</strong>
                                        <span className="text-white-50 small">Secure, private environment ideal for retreats, workshops, and high-level assemblies.</span>
                                    </div>
                                </li>
                                <li className="d-flex align-items-start gap-3">
                                    <i className="fas fa-check-circle text-gold mt-1"></i>
                                    <div>
                                        <strong className="text-white d-block">High-Profile Weddings & Banquets</strong>
                                        <span className="text-white-50 small">Stunning outdoor spaces, cocktail terraces, and manicured lawns hosting up to 2,000+ guests.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="col-lg-6">
                            <div className="p-4 rounded border border-secondary" style={{ backgroundColor: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(5px)' }}>
                                <h3 className="h4 font-serif text-gold mb-4 text-center">Why Partner With Us</h3>
                                <div className="row g-3">
                                    <div className="col-sm-6">
                                        <div className="p-3 rounded h-100" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                                            <i className="fas fa-map-marker-alt text-gold mb-2"></i>
                                            <h6 className="fw-bold text-white mb-1 small">Strategic Location</h6>
                                            <span className="text-white-50" style={{ fontSize: '0.75rem', lineHeight: '1.2' }}>Easy access from Nairobi & Machakos Town.</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="p-3 rounded h-100" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                                            <i className="fas fa-users text-gold mb-2"></i>
                                            <h6 className="fw-bold text-white mb-1 small">Professional Staff</h6>
                                            <span className="text-white-50" style={{ fontSize: '0.75rem', lineHeight: '1.2' }}>Experienced, customer-focused team.</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="p-3 rounded h-100" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                                            <i className="fas fa-handshake text-gold mb-2"></i>
                                            <h6 className="fw-bold text-white mb-1 small">Full Compliance</h6>
                                            <span className="text-white-50" style={{ fontSize: '0.75rem', lineHeight: '1.2' }}>Proven compliance with Kenyan legal & tax codes.</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="p-3 rounded h-100" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                                            <i className="fas fa-dollar-sign text-gold mb-2"></i>
                                            <h6 className="fw-bold text-white mb-1 small">Value For Money</h6>
                                            <span className="text-white-50" style={{ fontSize: '0.75rem', lineHeight: '1.2' }}>Strong commitment to quality and timeliness.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Guest Reviews Section */}
            <section className="container py-5 my-3" aria-labelledby="reviews-heading">
                <div className="text-center mb-5">
                    <h2 id="reviews-heading" className="font-serif display-5">What Our Guests Say</h2>
                    <p className="text-muted">Verified reviews from our valued guests</p>
                </div>
                <div className="row g-4">
                    <div className="col-md-6">
                        <div className="review-card p-4 rounded bg-white shadow-sm" style={{ borderLeft: '4px solid var(--gold, #c5a880)' }}>
                            <div className="review-stars text-gold mb-3" aria-label="5 out of 5 stars">
                                <i className="fas fa-star me-1"></i>
                                <i className="fas fa-star me-1"></i>
                                <i className="fas fa-star me-1"></i>
                                <i className="fas fa-star me-1"></i>
                                <i className="fas fa-star"></i>
                            </div>
                            <p className="font-italic text-muted">"An absolutely magical experience. The staff went above and beyond to make our honeymoon unforgettable. The Garden Villa was pure paradise!"</p>
                            <p className="review-author fw-bold text-gold mb-0 mt-3">- Sarah M., New York</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="review-card p-4 rounded bg-white shadow-sm" style={{ borderLeft: '4px solid var(--gold, #c5a880)' }}>
                            <div className="review-stars text-gold mb-3" aria-label="5 out of 5 stars">
                                <i className="fas fa-star me-1"></i>
                                <i className="fas fa-star me-1"></i>
                                <i className="fas fa-star me-1"></i>
                                <i className="fas fa-star me-1"></i>
                                <i className="fas fa-star"></i>
                            </div>
                            <p className="font-italic text-muted">"The perfect blend of luxury and nature. Waking up to ocean views every morning was a dream. Highly recommend the spa treatments!"</p>
                            <p className="review-author fw-bold text-gold mb-0 mt-3">- James T., London</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Guest Services */}
            <section className="py-5 bg-light" aria-labelledby="services-heading">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 id="services-heading" className="font-serif display-5">Guest Services</h2>
                        <p className="text-muted">Experience world-class hospitality</p>
                    </div>
                    <div className="row g-4 text-center">
                        {[
                            { icon: 'fa-clock', title: 'Round-the-Clock', desc: '24/7 Front Desk & Concierge Service' },
                            { icon: 'fa-wifi', title: 'High-Speed WiFi', desc: 'Complimentary access throughout the resort' },
                            { icon: 'fa-spa', title: 'Wellness Spa', desc: 'Rejuvenate your body and mind' },
                            { icon: 'fa-shuttle-van', title: 'Airport Transfer', desc: 'Seamless travel to and from the airport' }
                        ].map((srv, idx) => (
                            <div key={idx} className="col-md-3 col-sm-6">
                                <div className="service-icon-box p-4 bg-white rounded shadow-sm h-100 d-flex flex-column align-items-center justify-content-center">
                                    <i className={`fas ${srv.icon} fa-2x text-gold mb-3`}></i>
                                    <h4 className="h5 font-serif mb-2">{srv.title}</h4>
                                    <p className="small text-muted mb-0">{srv.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Special Offers & Packages */}
            <section className="py-5" aria-labelledby="offers-heading">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 id="offers-heading" className="font-serif display-5">Exclusive Packages</h2>
                        <p className="text-muted">Curated experiences just for you</p>
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-6">
                            <div className="card card-custom border-0 shadow overflow-hidden h-100">
                                <div className="row g-0 h-100">
                                    <div className="col-md-5 position-relative" style={{ minHeight: '200px' }}>
                                        <img 
                                            src="/image assets/hotel rooms/room_private_balcony_4.jpg" 
                                            className="h-100 w-100 object-fit-cover position-absolute top-0 start-0" 
                                            alt="Spa treatment" 
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="col-md-7">
                                        <div className="card-body d-flex flex-column justify-content-center h-100 p-4">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <span className="badge bg-gold text-white">Most Popular</span>
                                                <small className="text-muted">3 Days / 2 Nights</small>
                                            </div>
                                            <h3 className="h5 font-serif">Wellness Retreat Package</h3>
                                            <p className="card-text small text-muted">Includes daily spa treatments, yoga sessions, and healthy organic meals.</p>
                                            <div className="mt-3">
                                                <Link to="/bookings/create?package=wellness" className="btn btn-sm btn-outline-gold">Book Package</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card card-custom border-0 shadow overflow-hidden h-100">
                                <div className="row g-0 h-100">
                                    <div className="col-md-5 position-relative" style={{ minHeight: '200px' }}>
                                        <img 
                                            src="/image assets/hotel rooms/room_deluxe_canopy_bed_close.jpg" 
                                            className="h-100 w-100 object-fit-cover position-absolute top-0 start-0" 
                                            alt="Romantic dinner" 
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="col-md-7">
                                        <div className="card-body d-flex flex-column justify-content-center h-100 p-4">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <span className="badge bg-dark text-white">Couples</span>
                                                <small className="text-muted">4 Days / 3 Nights</small>
                                            </div>
                                            <h3 className="h5 font-serif">Honeymoon Bliss</h3>
                                            <p className="card-text small text-muted">Garden villa stay, romantic candlelight dinner on the beach, and couple's massage.</p>
                                            <div className="mt-3">
                                                <Link to="/bookings/create?package=honeymoon" className="btn btn-sm btn-outline-gold">Book Package</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Hotel Policies & FAQ */}
            <section className="py-5 bg-light" aria-labelledby="faq-heading">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-5">
                            <h2 id="faq-heading" className="font-serif display-6 mb-4">Essential Information</h2>
                            <div className="card border-0 shadow-sm p-4 mb-4 bg-white">
                                <h4 className="h5 text-gold mb-3 font-serif"><i className="fas fa-clock me-2"></i>Check-in & Check-out</h4>
                                <ul className="list-unstyled mb-0">
                                    <li className="d-flex justify-content-between border-bottom py-2">
                                        <span>Check-in Time</span>
                                        <strong>14:00 (2:00 PM)</strong>
                                    </li>
                                    <li className="d-flex justify-content-between border-bottom py-2">
                                        <span>Check-out Time</span>
                                        <strong>11:00 (11:00 AM)</strong>
                                    </li>
                                    <li className="pt-2 text-muted small">
                                        <i className="fas fa-info-circle me-1"></i> Early check-in and late check-out are available upon request and subject to availability.
                                    </li>
                                </ul>
                            </div>
                            <div className="card border-0 shadow-sm p-4 bg-white">
                                <h4 className="h5 text-gold mb-3 font-serif"><i className="fas fa-calendar-check me-2"></i>Scheduling</h4>
                                <p className="small text-muted mb-3">Plan your stay activities and dining reservations in advance.</p>
                                <Link to="/contact#schedule" className="btn btn-outline-dark w-100">Schedule Activities</Link>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <h3 className="font-serif h4 mb-4">Frequently Asked Questions</h3>
                            <div className="accordion d-flex flex-column gap-3">
                                {[
                                    {
                                        q: "What is the cancellation policy?",
                                        a: "We offer free cancellation up to 48 hours before your scheduled check-in time. Cancellations made within 48 hours will be charged for the first night of the stay."
                                    },
                                    {
                                        q: "Are pets allowed at the resort?",
                                        a: "We are a pet-friendly resort! We welcome well-behaved pets in our Garden Villas. A small cleaning fee applies, and advanced notice is required."
                                    },
                                    {
                                        q: "Do you offer dietary specific menus?",
                                        a: "Absolutely. Our culinary team is happy to cater to vegetarian, vegan, gluten-free, and other dietary requirements. Please inform us upon booking or at check-in."
                                    }
                                ].map((faq, idx) => (
                                    <div key={idx} className="accordion-item border-0 shadow-sm rounded bg-white overflow-hidden">
                                        <h2 className="accordion-header m-0">
                                            <button 
                                                className={`accordion-button border-0 w-100 text-start px-4 py-3 bg-white font-serif d-flex justify-content-between align-items-center ${faqOpen[idx] ? '' : 'collapsed'}`} 
                                                type="button"
                                                onClick={() => toggleFaq(idx)}
                                                style={{ color: faqOpen[idx] ? 'var(--gold, #c5a880)' : 'inherit', fontWeight: '500', outline: 'none' }}
                                            >
                                                {faq.q}
                                                <i className={`fas ${faqOpen[idx] ? 'fa-chevron-up' : 'fa-chevron-down'} text-muted`}></i>
                                            </button>
                                        </h2>
                                        <div 
                                            className={`accordion-collapse collapse ${faqOpen[idx] ? 'show' : ''}`}
                                            style={{
                                                maxHeight: faqOpen[idx] ? '200px' : '0px',
                                                transition: 'all 0.3s ease-out',
                                                overflow: 'hidden'
                                            }}
                                        >
                                            <div className="accordion-body px-4 pb-4 text-muted small leading-relaxed">
                                                {faq.a}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-5 bg-dark text-white text-center">
                <div className="container">
                    <div className="row align-items-center text-md-start">
                        <div className="col-md-6 mb-4 mb-md-0">
                            <h2 className="h3 font-serif mb-2 text-white">Subscribe to our Newsletter</h2>
                            <p className="text-white-50 mb-0">Stay updated with our latest offers, special rates, and seasonal events.</p>
                        </div>
                        <div className="col-md-6">
                            <form className="row g-2" onSubmit={(e) => e.preventDefault()}>
                                <div className="col-sm-8">
                                    <input type="email" className="form-control border-0 py-2" placeholder="Enter your email" required />
                                </div>
                                <div className="col-sm-4">
                                    <button type="submit" className="btn btn-primary-gold w-100 py-2">Subscribe</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
