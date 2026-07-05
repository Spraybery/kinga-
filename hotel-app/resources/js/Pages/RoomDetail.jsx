import React, { useState } from "react";
import { Link, Head } from "@inertiajs/react";
import MainLayout from "../Layouts/MainLayout";
import { route } from "ziggy-js";

export default function RoomDetail({ room }) {
    const [activeImg, setActiveImg] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    if (!room) {
        return (
            <MainLayout>
                <div className="container py-5 text-center">
                    <h2>Room not found</h2>
                    <Link href={route("rooms.index")} className="btn btn-primary-gold mt-3">Back to Rooms</Link>
                </div>
            </MainLayout>
        );
    }

    const allImages = [room.image_path, ...(room.gallery_images || [])];
    const resolvedAll = allImages.map((img) => (img.startsWith("http") ? img : `/${img}`));

    const prevImg = () => setActiveImg((prev) => (prev === 0 ? resolvedAll.length - 1 : prev - 1));
    const nextImg = () => setActiveImg((prev) => (prev === resolvedAll.length - 1 ? 0 : prev + 1));

    return (
        <MainLayout>
            <Head>
                <title>{`${room.name} | Kinga Resorts`}</title>
                <meta name="description" content={`Book the ${room.name} at Kinga Resorts. ${room.tagline}`} />
            </Head>
            {/* Breadcrumb */}
            <div style={{ background: "#f5f2eb", padding: "14px 0", borderBottom: "1px solid #ebe3cc" }}>
                <div className="container">
                    <nav style={{ fontSize: "0.85rem", color: "#9a8060" }}>
                        <Link href={route("home")} style={{ color: "#9a8060", textDecoration: "none" }}>Home</Link>
                        <span className="mx-2">/</span>
                        <Link href={route("rooms.index")} style={{ color: "#9a8060", textDecoration: "none" }}>Rooms</Link>
                        <span className="mx-2">/</span>
                        <span style={{ color: "#41350e", fontWeight: 600 }}>{room.name}</span>
                    </nav>
                </div>
            </div>

            {/* Main Hero Image + Gallery */}
            <div style={{ background: "#0e0b06" }}>
                <div className="container-fluid px-0">
                    <div
                        style={{ position: "relative", height: "65vh", overflow: "hidden", cursor: "pointer" }}
                        onClick={() => setLightboxOpen(true)}
                    >
                        <img
                            src={resolvedAll[activeImg]}
                            alt={`${room.name} - image ${activeImg + 1}`}
                            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.35s ease" }}
                        />
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(14,11,6,0.6) 0%, transparent 40%)" }} />
                        <button onClick={(e) => { e.stopPropagation(); prevImg(); }} style={{ position: "absolute", top: "50%", left: "20px", transform: "translateY(-50%)", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(6px)", color: "#fff", border: "none", borderRadius: "50%", width: "48px", height: "48px", fontSize: "1.1rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <i className="fas fa-chevron-left" />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); nextImg(); }} style={{ position: "absolute", top: "50%", right: "20px", transform: "translateY(-50%)", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(6px)", color: "#fff", border: "none", borderRadius: "50%", width: "48px", height: "48px", fontSize: "1.1rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <i className="fas fa-chevron-right" />
                        </button>
                        <div style={{ position: "absolute", bottom: "20px", right: "20px", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)", color: "#fff", borderRadius: "20px", padding: "5px 14px", fontSize: "0.8rem", fontWeight: 500 }}>
                            <i className="fas fa-expand me-2" />{activeImg + 1} / {resolvedAll.length}
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: "4px", overflowX: "auto", background: "#0e0b06", padding: "6px", scrollbarWidth: "none" }}>
                        {resolvedAll.map((img, idx) => (
                            <div key={idx} onClick={() => setActiveImg(idx)} style={{ flexShrink: 0, width: "100px", height: "68px", borderRadius: "6px", overflow: "hidden", cursor: "pointer", border: activeImg === idx ? "2px solid #c9a84c" : "2px solid transparent", opacity: activeImg === idx ? 1 : 0.55, transition: "all 0.25s ease" }}>
                                <img src={img} alt={`thumb ${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Room Details */}
            <section style={{ background: "#faf9f7", padding: "70px 0 90px" }}>
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-7" data-aos="fade-right">
                            <p style={{ color: "#c9a84c", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: "10px" }}>{room.tagline}</p>
                            <h1 className="font-serif" style={{ fontSize: "2.8rem", fontWeight: 300, color: "#1a1208", marginBottom: "6px", lineHeight: 1.15 }}>{room.name}</h1>

                            <div className="d-flex gap-4 mb-5" style={{ borderBottom: "1px solid #e8dfc8", paddingBottom: "24px", marginTop: "20px" }}>
                                <div style={{ textAlign: "center" }}>
                                    <i className="fas fa-ruler-combined" style={{ color: "#c9a84c", fontSize: "1.1rem" }} />
                                    <p style={{ margin: "4px 0 0", fontSize: "0.8rem", color: "#888" }}>Size</p>
                                    <p style={{ margin: 0, fontSize: "0.95rem", fontWeight: 600, color: "#41350e" }}>{room.size}</p>
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    <i className="fas fa-user-friends" style={{ color: "#c9a84c", fontSize: "1.1rem" }} />
                                    <p style={{ margin: "4px 0 0", fontSize: "0.8rem", color: "#888" }}>Guests</p>
                                    <p style={{ margin: 0, fontSize: "0.95rem", fontWeight: 600, color: "#41350e" }}>Up to {room.capacity}</p>
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    <i className="fas fa-images" style={{ color: "#c9a84c", fontSize: "1.1rem" }} />
                                    <p style={{ margin: "4px 0 0", fontSize: "0.8rem", color: "#888" }}>Gallery</p>
                                    <p style={{ margin: 0, fontSize: "0.95rem", fontWeight: 600, color: "#41350e" }}>{resolvedAll.length} photos</p>
                                </div>
                            </div>

                            <h3 className="font-serif" style={{ fontSize: "1.3rem", fontWeight: 400, color: "#41350e", marginBottom: "16px" }}>The Experience</h3>
                            <p style={{ color: "#5a4a2e", lineHeight: 1.9, fontSize: "1.02rem", marginBottom: "40px" }}>{room.long_description || room.description}</p>

                            {room.features && (
                                <>
                                    <h3 className="font-serif" style={{ fontSize: "1.3rem", fontWeight: 400, color: "#41350e", marginBottom: "20px" }}>Room Features</h3>
                                    <div className="row g-2 mb-5">
                                        {room.features.map((feat, fIdx) => (
                                            <div key={fIdx} className="col-6">
                                                <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", background: "#fff", borderRadius: "8px", border: "1px solid #ebe3cc", fontSize: "0.88rem", color: "#5a4a2e" }}>
                                                    <i className="fas fa-check-circle" style={{ color: "#c9a84c", flexShrink: 0 }} />
                                                    {feat}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="col-lg-5" data-aos="fade-left">
                            <div style={{ background: "#fff", borderRadius: "16px", boxShadow: "0 12px 48px rgba(65,53,14,0.14)", padding: "36px", position: "sticky", top: "100px" }}>
                                <p style={{ color: "#9a8060", fontSize: "0.85rem", marginBottom: "6px" }}>Starting from</p>
                                <h2 className="font-serif" style={{ fontSize: "1.9rem", fontWeight: 400, color: "#41350e", marginBottom: "28px" }}>{room.price_from}</h2>
                                <div style={{ height: "1px", background: "#ebe3cc", marginBottom: "28px" }} />
                                <p style={{ color: "#6b5c3e", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "28px" }}>Reserve your stay at Kinga Resorts and begin an experience crafted just for you. Our team is available 24/7 to make your time here perfect.</p>
                                <Link href={route("bookings.create", { room_id: room.id })} style={{ display: "block", width: "100%", padding: "15px 0", background: "linear-gradient(135deg, #c9a84c, #a07830)", color: "#fff", borderRadius: "10px", textAlign: "center", textDecoration: "none", fontSize: "1rem", fontWeight: 700, letterSpacing: "0.06em", boxShadow: "0 4px 20px rgba(160,120,48,0.35)", marginBottom: "12px" }}>Book This Room</Link>
                                <Link href={route("rooms.index")} style={{ display: "block", width: "100%", padding: "13px 0", background: "transparent", color: "#41350e", border: "1.5px solid #c9a84c", borderRadius: "10px", textAlign: "center", textDecoration: "none", fontSize: "0.9rem", fontWeight: 600 }}>
                                    <i className="fas fa-arrow-left me-2" />View All Rooms
                                </Link>
                                <p style={{ marginTop: "20px", fontSize: "0.78rem", color: "#aaa", textAlign: "center" }}>
                                    <i className="fas fa-shield-alt me-1" style={{ color: "#c9a84c" }} />Free cancellation · Best rate guaranteed
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {lightboxOpen && (
                <div onClick={() => setLightboxOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.92)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img src={resolvedAll[activeImg]} alt="Fullscreen" style={{ maxWidth: "90vw", maxHeight: "90vh", borderRadius: "8px", boxShadow: "0 0 60px rgba(0,0,0,0.8)" }} onClick={(e) => e.stopPropagation()} />
                    <button onClick={(e) => { e.stopPropagation(); prevImg(); }} style={{ position: "absolute", left: "24px", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", borderRadius: "50%", width: "52px", height: "52px", fontSize: "1.2rem", cursor: "pointer" }}><i className="fas fa-chevron-left" /></button>
                    <button onClick={(e) => { e.stopPropagation(); nextImg(); }} style={{ position: "absolute", right: "24px", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", borderRadius: "50%", width: "52px", height: "52px", fontSize: "1.2rem", cursor: "pointer" }}><i className="fas fa-chevron-right" /></button>
                    <button onClick={() => setLightboxOpen(false)} style={{ position: "absolute", top: "20px", right: "24px", background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", borderRadius: "50%", width: "44px", height: "44px", fontSize: "1rem", cursor: "pointer" }}><i className="fas fa-times" /></button>
                </div>
            )}
        </MainLayout>
    );
}
