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

            {/* Navigation */}
            <nav 
                className={`navbar navbar-expand-lg sticky-top p-0 ${isScrolled ? 'navbar-scrolled' : ''}`} 
                style={{
                    boxShadow: isScrolled ? '0 4px 20px rgba(0,0,0,0.2)' : '0 2px 10px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                    background: '#231c0a'
                }}
                role="navigation" 
                aria-label="Main navigation"
            >
                <div className="w-100">
                    {/* Top Main Navbar Content */}
                    <div className="container py-2 d-flex align-items-center justify-content-between">
                        <Link className="navbar-brand d-flex align-items-center text-decoration-none py-1 m-0" to="/">
                            <div className="navbar-logo-container me-3">
                                <img 
                                    src="/image assets/logos/full_logo_1.png" 
                                    alt="Kinga Resorts Logo" 
                                    style={{ height: '54px', width: 'auto', objectFit: 'contain' }}
                                />
                            </div>
                            <div className="d-flex flex-column justify-content-center align-items-center text-center">
                                <span className="navbar-brand-title" style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.75rem', fontWeight: '700', color: '#ffffff', letterSpacing: '1.5px', lineHeight: '1.1', display: 'block', textAlign: 'center' }}>KINGA RESORTS</span>
                                <span className="navbar-brand-subtitle" style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic', color: '#c69c43', fontSize: '0.72rem', marginTop: '2px', display: 'block', textAlign: 'center', width: '100%' }}>Adventure in Comfort, Luxury in Nature</span>
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
                                        className={`nav-link text-white ${isActive('/rooms') ? 'active' : ''}`} 
                                        to="/rooms"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Rooms
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link 
                                        className={`nav-link text-white ${isActive('/services') ? 'active' : ''}`} 
                                        to="/services"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Services
                                    </Link>
                                </li>
                                <li className="nav-item ms-lg-3">
                                    <a 
                                        href="https://osltravels.co.ke/property/hotel/8?name=KINGA%20RESORTS&price=%2460%20%2F%20KES%207%2C800" 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-primary-gold"
                                        onClick={() => setIsMenuOpen(false)}
                                        aria-label="Book your stay securely with OSL Travels"
                                    >
                                        Book Now
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Gold Divider Line */}
                    <div style={{ height: '2px', backgroundColor: '#c69c43', width: '100%' }}></div>

                    {/* Sub-bar: Managed by OSL Travel */}
                    <div style={{ backgroundColor: '#181307', padding: '5px 0' }}>
                        <div className="container">
                            <span style={{ 
                                color: '#a09888', 
                                fontSize: '0.68rem', 
                                fontWeight: '600', 
                                letterSpacing: '2.5px', 
                                textTransform: 'uppercase',
                                display: 'block'
                            }}>
                                A PROPERTY MANAGED BY ONE SOLID LINK
                            </span>
                        </div>
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
                            <div className="d-flex flex-column mb-3" style={{ width: 'fit-content' }}>
                                <img 
                                    src="/image assets/logos/kinga_script_logo.png" 
                                    alt="Kinga Resorts" 
                                    className="footer-logo"
                                    style={{ height: '55px', objectFit: 'contain' }}
                                />
                                <span className="text-end w-100" style={{ fontSize: '0.9rem', fontFamily: "'Allura', cursive", color: '#e8c97a', marginTop: '-12px', marginRight: '5px' }}>by Osl</span>
                            </div>
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
                                <li><Link to="/" className="text-white-50 text-decoration-none hover-gold">Home</Link></li>
                                <li><Link to="/rooms" className="text-white-50 text-decoration-none hover-gold">Rooms</Link></li>
                                <li><Link to="/services" className="text-white-50 text-decoration-none hover-gold">Services</Link></li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <h5 className="text-gold mb-3">Contact Us</h5>
                            <ul className="list-unstyled text-white-50 d-flex flex-column gap-2">
                                <li><i className="fas fa-map-marker-alt me-2 text-gold"></i> P.O. Box 1056-90100 Machakos County, Kenya</li>
                                <li><i className="fas fa-phone me-2 text-gold"></i> <a href="tel:0719525314" className="text-white-50 text-decoration-none hover-gold">0719525314</a> / <a href="tel:0797437447" className="text-white-50 text-decoration-none hover-gold">0797437447</a></li>
                                <li><i className="fas fa-envelope me-2 text-gold"></i> <a href="mailto:info@kingaresorts.com" className="text-white-50 text-decoration-none hover-gold">info@kingaresorts.com</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Google Preferred Source */}
                    <div className="row mt-4">
                        <div className="col-12 text-center">
                            <a href="https://www.google.com/preferences/source?q=kingaresorts.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-sm rounded-pill d-inline-flex align-items-center gap-2" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                </svg>
                                Add as Preferred Source on Google
                            </a>
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
