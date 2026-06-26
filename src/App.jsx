import { Routes, Route, Navigate } from "react-router-dom";

import useAnonAuth from "./hooks/useAnonAuth";
import BootstrapDiagnostics from "./BootstrapDiagnostics";

import Marketplace from "./pages/Marketplace";
import ListingDetail from "./pages/ListingDetail";

import PrivacyPolicy from "./components/PrivacyPolicy";


import SellerProtectedRoute from "./components/SellerProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

import SellerSignup from "./pages/SellerSignup";
import SellerLogin from "./pages/SellerLogin";
import SellerDashboard from "./pages/SellerDashboard";
import HireTeam from "./pages/HireTeam";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

import Home from "./pages/Home";

export default function App() {

  // Silent anonymous auth for all visitors (buyers).
  // Provides stable uid for chat security.
  useAnonAuth();

  return (
    <>
      <BootstrapDiagnostics />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />


        {/* Marketplace */}
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/marketplace/:listingId" element={<ListingDetail />} />
        <Route path="/hire-team" element={<HireTeam />} />

        {/* Seller */}
        <Route path="/sell/signup" element={<SellerSignup />} />
        <Route path="/sell/login" element={<SellerLogin />} />
        <Route
          path="/sell/dashboard"
          element={
            <SellerProtectedRoute>
              <SellerDashboard />
            </SellerProtectedRoute>
          }
        />

        {/* Blog post */}
        <Route path="/blog/:slug" element={<div />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />


        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

