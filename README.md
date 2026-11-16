# STYLON OFFICIAL (STO) — Premium E-Commerce Frontend

Complete storefront + admin dashboard for **STYLON OFFICIAL** — *Shop Smart. Live Stylish.*
Built with **HTML5 + CSS3 + Vanilla JavaScript** (Bootstrap-compatible grid patterns), **Font Awesome 6**, and **SweetAlert2**. No build step required.

## Quick Start
1. Open `index.html` in a browser — that's the storefront (works from `file://` or any static host).
2. Open `admin.html` — the admin dashboard.
3. Demo admin login: **admin@stylon.co.ke / admin123**

## Storefront Features
- Hero carousel, category mega-menus, mobile hamburger menu, sticky bottom nav
- 56 seeded products across all 43 subcategories (Fashion, Perfumes, Watches, Jewellery, Accessories, Tech)
- Product cards: badges, ratings, views, wishlist toggle, quick view, Add to Cart / Buy Now
- Shop page: search, category/price/rating/availability filters, 8 sort options, load-more
- Product pages: gallery with zoom, variants (size/color), reviews, related products, WhatsApp inquiry
- Cart page + slide-out cart drawer, coupons (**STYLON10**, **WELCOME15**, **STO20**, **FLAT200**)
- 4-step checkout (details → delivery with all Kenyan counties → M-Pesa/Card/COD/Bank → review), simulated STK push
- Order success + printable receipt, order tracking timeline
- Wishlist, account dashboard (register/login demo), CMS info pages, contact page
- **18+ Intimate Wellness section** with age-verification gate
- Floating WhatsApp button (+254 743166763) with pre-filled messages
- Everything persists in `localStorage`

## Admin Dashboard Features (`admin.html`)
- KPI cards, sales bar chart, top categories, recent orders, best sellers
- **Full product CRUD** — new products appear on the storefront instantly (shared state)
- Category manager (add/rename/delete categories & subcategories → live nav sync)
- Inventory (adjust stock, low/out-of-stock alerts → live storefront availability)
- Orders (change status → reflects in customer tracking), printable invoices
- Customers, review moderation (approved reviews show on product pages)
- Coupons CRUD → usable at checkout immediately
- Hero slide / banner manager → homepage carousel updates live
- Website pages CMS → info pages update live
- Media library with local upload previews
- Analytics, users & roles, store settings (contact, socials, shipping fees → storefront sync)
- Reset demo data button

## Project Structure
stylon-official/
├── index.html / admin.html
├── assets/css/style.css (storefront) · admin.css
├── assets/js/data.js (56 products, categories, coupons, hero slides)
├── assets/js/store.js (shared state layer — swap STO_API with real API later)
├── assets/js/app.js (storefront SPA) · admin.js (dashboard SPA)
└── assets/img/… (replaceable JPG/SVG placeholders: sneakers_1.jpg, power_bank_2.jpg, …)

## Replacing Placeholder Images
Drop your photos into `assets/img/products/` using the **exact filenames** in `data.js`
(e.g. `sneakers_1.jpg`, `perfume_mens_1.jpg`) — no code changes needed.
Missing images automatically fall back to elegant branded SVG placeholders.

## Future Backend Integration
All data access goes through the `STO_API` abstraction in `store.js`
(`products()`, `saveProducts()`, `orders()`, `coupons()`, `reviews()`…).
Replace these with `fetch()` calls to Flask/FastAPI + PostgreSQL without touching the UI.

> ⚠️ **Demo notices:** checkout payments (M-Pesa STK push), authentication, and the 18+ age gate
> are frontend simulations only. Enforce real payments, authz, and age verification server-side
> before production.

© 2026 STYLON OFFICIAL. All Rights Reserved.
