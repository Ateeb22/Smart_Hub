// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";

import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Products from "./pages/admin/Products";
import Orders from "./pages/admin/Orders";
import Settings from "./pages/admin/Settings";
import StoreLocator from "./pages/StoreLocator";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Users — Admin + Manager */}
        <Route
          path="/admin/users"
          element={
            <AdminRoute allowedRoles={["admin", "manager"]}>
              <MainLayout>
                <Users />
              </MainLayout>
            </AdminRoute>
          }
        />

        {/* Products — Admin + Manager */}
        <Route
          path="/admin/products"
          element={
            <AdminRoute allowedRoles={["admin", "manager"]}>
              <MainLayout>
                <Products />
              </MainLayout>
            </AdminRoute>
          }
        />

        {/* Orders — Admin + Manager */}
        <Route
          path="/admin/orders"
          element={
            <AdminRoute allowedRoles={["admin", "manager"]}>
              <MainLayout>
                <Orders />
              </MainLayout>
            </AdminRoute>
          }
        />

        {/* Settings — Admin only */}
        <Route
          path="/admin/settings"
          element={
            <AdminRoute allowedRoles={["admin"]}>
              <MainLayout>
                <Settings />
              </MainLayout>
            </AdminRoute>
          }
        />

        {/* Store Locator — All logged in users */}
        <Route
          path="/store-locator"
          element={
            <ProtectedRoute>
              <MainLayout>
                <StoreLocator />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* 404 — Always last */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
