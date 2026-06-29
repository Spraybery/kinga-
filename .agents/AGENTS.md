# Kinga Resorts Repository Rules & Guidelines

This workspace uses a dual-application architecture. These rules must be strictly adhered to by any AI coding assistant to maintain consistency and prevent synchronization drift.

---

## 1. Dual-Application Architecture
The repository consists of two parallel applications:
1. **React SPA (`hotel-react-app`):** A standalone client-side React single-page application.
2. **Laravel Application (`hotel-app`):** A Laravel backend rendering React page components through Inertia.js.

> [!IMPORTANT]
> **Synchronized Updates:** Any change to frontend components, views, styles, data, or static assets must be implemented in both directories:
> - Standalone: `c:/xampp/htdocs/kingaa/hotel-react-app/`
> - Laravel: `c:/xampp/htdocs/kingaa/hotel-app/`

---

## 2. Route & Layout Synchronization
- **React Router:** Uses standard client-side `<Link to="/path">` and `<Route path="/path" element={<Component />} />` in `App.jsx`.
- **Inertia/Ziggy Routes:** Uses `<Link href={route('name')}>` in Inertia pages, defined in `routes/web.php`.
- **Navigation Components:** Keep `MainLayout.jsx` menu items, links, and styling in sync:
  - React SPA: `hotel-react-app/src/components/MainLayout.jsx`
  - Laravel: `hotel-app/resources/js/Layouts/MainLayout.jsx`

---

## 3. Public Asset Management
- Logos are located in `/image assets/logos/`.
- Room and resort images are located in `/image assets/hotel rooms/`.
- **Asset Replication:** When adding or updating images (e.g., dining, conferences, leisure experiences), ensure they are copied to:
  - `hotel-react-app/public/image assets/`
  - `hotel-app/public/image assets/`

---

## 4. CSS & Responsiveness Guidelines
- The core design system resides in `hotel-react-app/src/index.css` and `hotel-app/resources/css/app.scss`.
- Ensure custom layout adjustments preserve the responsive design system, especially for MacBook screen resolutions (breakpoints between 993px and 1440px).
- Navigation bar styling (e.g., background color `#41350e`) must be kept identical in both layout inline styles.
