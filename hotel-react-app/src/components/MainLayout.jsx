import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function MainLayout({ children }) {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Scroll restoration: reset viewport to top when route changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        let isScrolledLocal = false;

        const handleScroll = () => {
            // Navbar Scroll Effect
            const scrolled = window.scrollY > 100;
            if (scrolled !== isScrolledLocal) {
                isScrolledLocal = scrolled;
                setIsScrolled(scrolled);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Helper for active navigation link styling
    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Direct Booking Incentive Banner */}
            <div className="incentive-banner" role="banner">
                <i className="fas fa-gift me-2"></i>
                <strong>Best Rate Guarantee:</strong> Book direct and save 15% + Free WiFi + Late Checkout
            </div>

            {/* Navigation */}
            <nav 
                className={`navbar navbar-expand-lg sticky-top ${isScrolled ? 'navbar-scrolled' : ''}`} 
                style={{
                    boxShadow: isScrolled ? '0 2px 20px rgba(0,0,0,0.1)' : '0 2px 10px rgba(0,0,0,0.05)',
                    paddingTop: isScrolled ? '0.5rem' : '1rem',
                    paddingBottom: isScrolled ? '0.5rem' : '1rem',
                    transition: 'all 0.3s ease',
                    backgroundColor: 'var(--navy-dark, #0c192c)'
                }}
                role="navigation" 
                aria-label="Main navigation"
            >
                <div className="container">
                    <Link className="navbar-brand d-flex align-items-center" to="/">
                        <img 
                            src="/image assets/logos/color1-white_icon_transparent_background.png" 
                            alt="Kinga Icon" 
                            className="navbar-icon me-2"
                            style={{ height: '48px', objectFit: 'contain' }}
                        />
                        <div className="d-flex flex-column justify-content-center">
                            <img 
                                src="/image assets/logos/color1-white_textlogo_transparent_background.png" 
                                alt="Kinga Resorts"
                                style={{ height: '48px', objectFit: 'contain' }}
                            />
                            <span className="text-gold text-end" style={{ fontSize: '0.65rem', letterSpacing: '1px', marginTop: '-10px', marginRight: '5px' }}>by OSL</span>
                        </div>
                    </Link>
                    <button 
                        className="navbar-toggler border-0 text-white" 
                        type="button" 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-expanded={isMenuOpen}
                        aria-label="Toggle navigation"
                    >
                        <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} fa-lg`}></i>
                    </button>
                    <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
                        <ul className="navbar-nav ms-auto align-items-center gap-2">
                            <li className="nav-item">
                                <Link 
                                    className={`nav-link text-white ${isActive('/') ? 'active' : ''}`} 
                                    to="/"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link 
                                    className={`nav-link text-white ${isActive('/accommodations') ? 'active' : ''}`} 
                                    to="/accommodations"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Accommodations
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link 
                                    className={`nav-link text-white ${isActive('/dining') ? 'active' : ''}`} 
                                    to="/dining"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Dining
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link 
                                    className={`nav-link text-white ${isActive('/experiences') ? 'active' : ''}`} 
                                    to="/experiences"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Experiences
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link 
                                    className={`nav-link text-white ${isActive('/gallery') ? 'active' : ''}`} 
                                    to="/gallery"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Gallery
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link 
                                    className={`nav-link text-white ${isActive('/contact') ? 'active' : ''}`} 
                                    to="/contact"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Contact
                                </Link>
                            </li>
                            <li className="nav-item ms-lg-3">
                                <Link 
                                    to="/bookings/create" 
                                    className="btn btn-primary-gold"
                                    onClick={() => setIsMenuOpen(false)}
                                    aria-label="Book your stay now"
                                >
                                    Book Now
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main id="main-content" className="flex-grow-1">
                {children}
            </main>

            {/* Footer */}
            <footer role="contentinfo" className="bg-dark text-white py-5 mt-auto" style={{ borderTop: '4px solid var(--gold, #c5a880)' }}>
                <div className="container">
                    <div className="row g-4">
                        <div className="col-md-4">
                            <img 
                                src="/image assets/logos/white_textlogo_dark_background.png" 
                                alt="Kinga Resorts" 
                                className="footer-logo mb-3"
                                style={{ height: '40px', objectFit: 'contain' }}
                            />
                            <p className="small">Adventure in Comfort, Luxury in Nature.</p>
                            <div className="social-icons d-flex gap-3 mt-3">
                                <a href="#" className="text-white text-decoration-none" aria-label="Facebook"><i className="fab fa-facebook-f hover-gold"></i></a>
                                <a href="#" className="text-white text-decoration-none" aria-label="Instagram"><i className="fab fa-instagram hover-gold"></i></a>
                                <a href="#" className="text-white text-decoration-none" aria-label="Twitter"><i className="fab fa-twitter hover-gold"></i></a>
                                <a href="#" className="text-white text-decoration-none" aria-label="LinkedIn"><i className="fab fa-linkedin-in hover-gold"></i></a>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <h5 className="text-gold mb-3">Quick Links</h5>
                            <ul className="list-unstyled d-flex flex-column gap-2">
                                <li><Link href="/" className="text-white-50 text-decoration-none hover-gold">Home</Link></li>
                                <li><Link href="/accommodations" className="text-white-50 text-decoration-none hover-gold">Accommodations</Link></li>
                                <li><Link href="/dining" className="text-white-50 text-decoration-none hover-gold">Dining</Link></li>
                                <li><Link href="/experiences" className="text-white-50 text-decoration-none hover-gold">Experiences</Link></li>
                                <li><Link href="/gallery" className="text-white-50 text-decoration-none hover-gold">Gallery</Link></li>
                                <li><Link href="/contact" className="text-white-50 text-decoration-none hover-gold">Contact</Link></li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <h5 className="text-gold mb-3">Contact Us</h5>
                            <ul className="list-unstyled text-white-50 d-flex flex-column gap-2">
                                <li><i className="fas fa-map-marker-alt me-2 text-gold"></i> P.O. Box 1056-90100 Machakos County, Kenya</li>
                                <li><i className="fas fa-phone me-2 text-gold"></i> <a href="tel:0719525314" className="text-white-50 text-decoration-none hover-gold">0719525314</a> / <a href="tel:0719525428" className="text-white-50 text-decoration-none hover-gold">0719525428</a></li>
                                <li><i className="fas fa-envelope me-2 text-gold"></i> <a href="mailto:info@kingaresort.com" className="text-white-50 text-decoration-none hover-gold">info@kingaresort.com</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="trust-badges d-flex justify-content-center flex-wrap gap-4 mt-5 border-top border-secondary pt-4">
                        <div className="trust-badge text-white-50 d-flex align-items-center gap-2">
                            <i className="fas fa-shield-alt text-gold"></i>
                            <span>Secure Booking</span>
                        </div>
                        <div className="trust-badge text-white-50 d-flex align-items-center gap-2">
                            <i className="fas fa-lock text-gold"></i>
                            <span>SSL Encrypted</span>
                        </div>
                        <div className="trust-badge text-white-50 d-flex align-items-center gap-2">
                            <i className="fas fa-certificate text-gold"></i>
                            <span>Exclusive Offers</span>
                        </div>
                    </div>

                    <div className="row mt-4 pt-3 border-top border-secondary">
                        <div className="col-12 text-center text-white-50 small">
                            <p className="mb-0">&copy; {new Date().getFullYear()} Kinga Resorts. All Rights Reserved. | <a href="#" className="text-white-50 hover-gold">Privacy Policy</a> | <a href="#" className="text-white-50 hover-gold">Terms of Service</a></p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
