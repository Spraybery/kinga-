import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Accommodations from './pages/Accommodations';
import Dining from './pages/Dining';
import Experiences from './pages/Experiences';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import CreateBooking from './pages/Bookings/Create';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/accommodations" element={<Accommodations />} />
                <Route path="/dining" element={<Dining />} />
                <Route path="/experiences" element={<Experiences />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/bookings/create" element={<CreateBooking />} />
            </Routes>
        </BrowserRouter>
    );
}
