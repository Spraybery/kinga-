import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import MainLayout from "../components/MainLayout";
import { rooms } from "../data/rooms";

export default function Rooms() {
    const [hoveredId, setHoveredId] = useState(null);

    return (
        <MainLayout>
            <Helmet>
                <title>Rooms & Glamping Tents | Kinga Resorts</title>
                <meta name="description" content="Explore our luxurious rooms and glamping tents. Three distinct experiences crafted for the ultimate comfort and nature discovery." />
            </Helmet>
            <header
                className="d-flex align-items-center justify-content-center text-white position-relative"
                style={{
                    minHeight: "55vh",
                    backgroundImage: `linear-gradient(to bottom, rgba(10,8,5,0.55) 0%, rgba(30,20,5,0.75) 100%), url("/image assets/hotel rooms/standard/20260703_104819.jpg")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center top",
                }}
            >
                <div className="container text-center position-relative z-1" style={{ paddingTop: "80px" }}>
                    <p className="text-uppercase letter-spacing mb-3" style={{ color: "#c9a84c", fontSize: "0.85rem", fontWeight: 600 }}>
                        KINGA RESORTS
                    </p>
                    <h1 className="display-3 font-serif text-white mb-4" style={{ fontWeight: 300, lineHeight: 1.2 }}>
                        Choose Your<br />
                        <em style={{ fontStyle: "italic", color: "#e8c97a" }}>Perfect Retreat</em>
                    </h1>
                    <p className="lead mb-0" style={{ color: "rgba(255,255,255,0.8)", maxWidth: "500px", margin: "0 auto", fontSize: "1.1rem" }}>
                        Three distinct experiences, each crafted to deliver the ultimate in rest and discovery.
                    </p>
                </div>
                <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0, height: "80px",
                    background: "linear-gradient(to bottom, transparent, #faf9f7)"
                }} />
            </header>

            <section style={{ background: "#faf9f7", padding: "80px 0 100px" }}>
                <div className="container">
                    <div className="row g-4 justify-content-center">
                        {rooms.map((room, index) => {
                            const isHovered = hoveredId === room.id;
                            const resolvedImg = room.image_path.startsWith("http") ? room.image_path : `/${room.image_path}`;

                            return (
                                <div
                                    key={room.id}
                                    className="col-12 col-md-4"
                                    onMouseEnter={() => setHoveredId(room.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    data-aos="fade-up"
                                    data-aos-delay={index * 120}
                                >
                                    <div
                                        style={{
                                            borderRadius: "16px",
                                            overflow: "hidden",
                                            background: "#fff",
                                            boxShadow: isHovered
                                                ? "0 24px 60px rgba(65,53,14,0.22)"
                                                : "0 8px 32px rgba(65,53,14,0.10)",
                                            transform: isHovered ? "translateY(-10px)" : "translateY(0)",
                                            transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                                            display: "flex",
                                            flexDirection: "column",
                                            height: "100%",
                                        }}
                                    >
                                        <div style={{ position: "relative", height: "300px", overflow: "hidden" }}>
                                            <img
                                                src={resolvedImg}
                                                alt={room.name}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                    transform: isHovered ? "scale(1.07)" : "scale(1)",
                                                    transition: "transform 0.6s ease",
                                                }}
                                            />
                                            <div style={{
                                                position: "absolute", inset: 0,
                                                background: "linear-gradient(to top, rgba(10,8,5,0.65) 0%, transparent 55%)",
                                            }} />
                                            <div style={{
                                                position: "absolute", bottom: "16px", left: "16px",
                                                color: "#fff", fontSize: "0.8rem", fontWeight: 600,
                                                letterSpacing: "0.04em",
                                                textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                                            }}>
                                                {room.price_from}
                                            </div>
                                            <div style={{
                                                position: "absolute", top: "14px", right: "14px",
                                                background: "rgba(0,0,0,0.45)",
                                                backdropFilter: "blur(6px)",
                                                color: "#fff",
                                                borderRadius: "20px",
                                                padding: "4px 12px",
                                                fontSize: "0.75rem",
                                                fontWeight: 500,
                                            }}>
                                                <i className="fas fa-images me-1" />
                                                {(room.gallery_images?.length || 0) + 1} photos
                                            </div>
                                        </div>

                                        <div style={{ padding: "28px 28px 32px", flex: 1, display: "flex", flexDirection: "column" }}>
                                            <p style={{
                                                color: "#c9a84c", fontSize: "0.75rem", fontWeight: 700,
                                                textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "8px"
                                            }}>
                                                {room.tagline}
                                            </p>

                                            <h2 className="font-serif" style={{ fontSize: "1.6rem", fontWeight: 400, marginBottom: "12px", color: "#1a1208" }}>
                                                {room.name}
                                            </h2>

                                            <p style={{ color: "#6b5c3e", fontSize: "0.92rem", lineHeight: 1.7, marginBottom: "20px", flex: 1 }}>
                                                {room.description}
                                            </p>

                                            <div className="d-flex gap-3 mb-24" style={{ marginBottom: "20px" }}>
                                                <span style={{ fontSize: "0.8rem", color: "#888", display: "flex", alignItems: "center", gap: "5px" }}>
                                                    <i className="fas fa-ruler-combined" style={{ color: "#c9a84c" }} /> {room.size}
                                                </span>
                                                <span style={{ fontSize: "0.8rem", color: "#888", display: "flex", alignItems: "center", gap: "5px" }}>
                                                    <i className="fas fa-user-friends" style={{ color: "#c9a84c" }} /> {room.capacity} guests
                                                </span>
                                            </div>

                                            <div className="d-flex flex-wrap gap-2 mb-4">
                                                {room.features.slice(0, 3).map((feat, fIdx) => (
                                                    <span key={fIdx} style={{
                                                        background: "#fdf5e8",
                                                        color: "#7a5c1e",
                                                        borderRadius: "20px",
                                                        padding: "4px 12px",
                                                        fontSize: "0.75rem",
                                                        fontWeight: 500,
                                                        border: "1px solid #edd99a",
                                                    }}>
                                                        {feat}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="d-flex gap-2">
                                                <Link
                                                    to={`/rooms/${room.slug}`}
                                                    style={{
                                                        flex: 1,
                                                        padding: "11px 0",
                                                        background: isHovered ? "#41350e" : "#c9a84c",
                                                        color: "#fff",
                                                        borderRadius: "8px",
                                                        textAlign: "center",
                                                        textDecoration: "none",
                                                        fontSize: "0.88rem",
                                                        fontWeight: 600,
                                                        letterSpacing: "0.04em",
                                                        transition: "background 0.3s ease",
                                                    }}
                                                >
                                                    View Room
                                                </Link>
                                                <Link
                                                    to={`/bookings/create?room_id=${room.id}`}
                                                    style={{
                                                        flex: 1,
                                                        padding: "11px 0",
                                                        background: "transparent",
                                                        color: "#41350e",
                                                        border: "1.5px solid #c9a84c",
                                                        borderRadius: "8px",
                                                        textAlign: "center",
                                                        textDecoration: "none",
                                                        fontSize: "0.88rem",
                                                        fontWeight: 600,
                                                        letterSpacing: "0.04em",
                                                        transition: "all 0.3s ease",
                                                    }}
                                                >
                                                    Book Now
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="text-center mt-5" data-aos="fade-up">
                        <p style={{ color: "#9a8060", fontSize: "0.9rem" }}>
                            <i className="fas fa-concierge-bell me-2" style={{ color: "#c9a84c" }} />
                            All rooms include complimentary breakfast, 24/7 concierge, and access to resort facilities.
                        </p>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
