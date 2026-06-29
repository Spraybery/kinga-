import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Accommodations from './pages/Accommodations';
import Dining from './pages/Dining';
import Conferences from './pages/Conferences';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import CreateBooking from './pages/Bookings/Create';

import AOS from 'aos';
import 'aos/dist/aos.css';

export default function App() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 150,
        });
    }, []);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/accommodations" element={<Accommodations />} />
                <Route path="/dining" element={<Dining />} />
                <Route path="/conferences" element={<Conferences />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/bookings/create" element={<CreateBooking />} />
            </Routes>
        </BrowserRouter>
    );
}
