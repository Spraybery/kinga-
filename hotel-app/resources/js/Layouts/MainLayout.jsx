import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';

import AOS from 'aos';
import 'aos/dist/aos.css';

export default function MainLayout({ children }) {
    const { url } = usePage();
    const { flash, errors } = usePage().props;

    // Scroll restoration: reset viewport to top when route changes
    useEffect(() => {
        window.scrollTo(0, 0);
        AOS.init({ duration: 1000, once: true, offset: 150 });
        AOS.refresh();
    }, [url]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
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

    // Helper for active navigation link styling using Ziggy
    const isActive = (name) => {
        return route().current(name);
    };

    return (
        <div className="d-flex flex-column min-vh-100">

            {/* Navigation */}
            <nav 
                className={`navbar navbar-expand-lg sticky-top ${isScrolled ? 'navbar-scrolled' : ''}`} 
                style={{
                    boxShadow: isScrolled ? '0 2px 20px rgba(0,0,0,0.1)' : '0 2px 10px rgba(0,0,0,0.05)',
                    paddingTop: isScrolled ? '0.5rem' : '1rem',
                    paddingBottom: isScrolled ? '0.5rem' : '1rem',
                    transition: 'all 0.3s ease',
                    background: '#41350e'
                }}
                role="navigation" 
                aria-label="Main navigation"
            >
                <div className="container">
                    <Link className="navbar-brand d-flex align-items-center" href={route('home')}>
                        <img 
                            src="/image assets/logos/k_icon_gold.png" 
                            alt="Kinga Icon" 
                            className="navbar-icon me-2"
                        />
                        <div className="d-flex flex-column justify-content-center">
                            <img 
                                src="/image assets/logos/kinga_script_logo.png" 
                                alt="Kinga Resorts"
                                className="navbar-logo"
                            />
                            <span className="text-end" style={{ fontSize: '0.9rem', fontFamily: "'Allura', cursive", color: '#e8c97a', marginTop: '-12px', marginRight: '5px' }}>by Osl</span>
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
                                    className={`nav-link text-white ${isActive('home') ? 'active' : ''}`} 
                                    href={route('home')}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link 
                                    className={`nav-link text-white ${isActive('rooms.*') ? 'active' : ''}`} 
                                    href={route('rooms.index')}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Rooms
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link 
                                    className={`nav-link text-white ${isActive('services') ? 'active' : ''}`} 
                                    href={route('services')}
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
            </nav>

            {/* Flash Messages */}
            {flash && flash.success && (
                <div className="container mt-3">
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        <i className="fas fa-check-circle me-2"></i>
                        {flash.success}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>
            )}
            {flash && flash.error && (
                <div className="container mt-3">
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <i className="fas fa-exclamation-circle me-2"></i>
                        {flash.error}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>
            )}

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
                                <li><Link href={route('home')} className="text-white-50 text-decoration-none hover-gold">Home</Link></li>
                                <li><Link href={route('rooms.index')} className="text-white-50 text-decoration-none hover-gold">Rooms</Link></li>
                                <li><Link href={route('services')} className="text-white-50 text-decoration-none hover-gold">Services</Link></li>
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
