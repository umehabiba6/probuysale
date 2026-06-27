# TODO — ProBuySale single-seller rebuild

## 1) Repo analysis
- [x] Read `src/App.jsx` routes + dependencies.
- [x] Read `src/components/Navbar.jsx`, `src/components/Footer.jsx`.
- [x] Read `src/pages/Home.jsx`, `src/pages/Marketplace.jsx`.
- [x] Read `src/components/Hero.jsx`, `src/components/About.jsx`, `src/components/Contact.jsx`.
- [x] Read `src/pages/AdminDashboard.jsx` (current marketplace overview).
- [x] Read `src/pages/ListingDetail.jsx` (marketplace listing detail).
- [x] Read auth helpers: `src/hooks/useAnonAuth.js`, `src/components/AdminProtectedRoute.jsx`, `src/components/SellerProtectedRoute.jsx`.
- [x] Read `src/pages/HireTeam.jsx` to ensure it remains.

## 2) New public homepage build (anchor navigation)
- [ ] Update homepage structure per spec (Navbar → Hero → Products(#products) → Categories → About(#about) → Testimonials → Contact(#contact) → Footer).
- [ ] Implement Firestore-backed products section: query `products` where `status == 'published'` ordered by `createdAt desc`.
- [ ] Add skeleton loading + empty state.
- [ ] Remove multi-seller/marketplace UI usage.

## 3) Routing + component removal
- [ ] Update `src/App.jsx`: remove marketplace + seller routes/imports.
- [ ] Remove routes/imports per instructions (SellerSignup/Login/Dashboard, Marketplace, ListingDetail).
- [ ] Remove seller/protected route components and anonymous auth if no longer required.

## 4) Navbar + Footer update
- [ ] Update `src/components/Navbar.jsx` to only show Home, Books(#products), About(#about), Contact(#contact) + CTA.
- [ ] Update `src/components/Footer.jsx` with required columns/links and Hire a Team + Admin.

## 5) Admin dashboard rewrite
- [ ] Rewrite `src/pages/AdminDashboard.jsx` to have two tabs: Products + Blog.
- [ ] Build Products CRUD UI that writes to Firestore `products` collection with `createdAt` timestamp.
- [ ] Keep Blog tab “exactly as is” (after reading current blog tab implementation).

## 6) Firestore security rules
- [ ] Locate existing Firestore rules file in repo (or add new one) and update per spec.
- [ ] Provide final rules snippet for `products` and `blogPosts`, removing `sellers`, `listings`, `conversations`.

## 7) File operations checklist
- [ ] Delete files per instructions (Marketplace, Seller* pages, SellerProtectedRoute, ChatWidget, LeadMagnet, Partners, Ratings, etc.).
- [ ] Ensure build passes.

## 8) Final deliverables
- [ ] Produce complete list of deleted/created/modified files.
- [ ] Explain how to add first product from admin panel.
- [ ] Output final Firestore rules to paste into Firebase console.

