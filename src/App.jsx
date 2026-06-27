import { Routes, Route, Navigate } from "react-router-dom";

import BootstrapDiagnostics from "./BootstrapDiagnostics";

import AdminProtectedRoute from "./components/AdminProtectedRoute";

import HireTeam from "./pages/HireTeam";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

import Home from "./pages/Home";
import Books from "./pages/Books";
import PrivacyPolicy from "./components/PrivacyPolicy";


export default function App() {
  return (
    <>
      <BootstrapDiagnostics />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />


        <Route path="/hire-team" element={<HireTeam />} />

        {/* Blog post (placeholder) */}
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


