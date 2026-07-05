import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import RoomDetail from './pages/RoomDetail';
import Services from './pages/Services';
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
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/rooms/:slug" element={<RoomDetail />} />
                <Route path="/services" element={<Services />} />
                <Route path="/bookings/create" element={<CreateBooking />} />
            </Routes>
        </BrowserRouter>
    );
}
