import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/AdminPages/Dashboard';
import UserManagement from './pages/AdminPages/UserManagement';
import FarmerProductPage from './pages/FarmerProductPage';
import FarmerBookingPage from './pages/FarmerBookingPage';
import ProviderStoragePage from './pages/ProviderStoragePage';

import { Navigate, Outlet } from 'react-router-dom';
import ProviderTruckPage from './pages/ProviderTruckPage';
import ProviderBookingPage from './pages/ProviderBookingPage';
import ProviderDiscountPage from './pages/ProviderDiscountPage';

const ProtectedRoute = ({ allowedRoles }) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role'); // Save role after login too

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

const App = () => {
    return (
        <div className="app">
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                {/* Admin Protected Routes */}
                <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                    <Route path="/admin" element={<Dashboard />} />
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                    <Route path="/admin/users" element={<UserManagement />} />
                </Route>

                {/* Farmer Protected Routes */}
                <Route element={<ProtectedRoute allowedRoles={['farmer']} />}>
                    <Route path="/farmer/products" element={<FarmerProductPage />} />
                    <Route path="/farmer/requests" element={<FarmerBookingPage />} />
                </Route>

                {/* Customer Protected Routes */}
                {/* <Route element={<ProtectedRoute allowedRoles={['customer']} />}>
                    <Route path="/customer/catalog" element={<ProductCatalogPage />} />
                    <Route path="/customer/cart" element={<ShoppingCartPage />} />
                    <Route path="/customer/orders" element={<OrderHistoryPage />} />
                </Route> */}

                {/* Service Provider Protected Routes */}
                <Route element={<ProtectedRoute allowedRoles={['service_provider']} />}>
                    <Route path="/provider/storages" element={<ProviderStoragePage />} />
                    <Route path="/provider/trucks" element={<ProviderTruckPage />} />
                    <Route path="/provider/bookings" element={<ProviderBookingPage />} />
                    <Route path="/provider/discounts" element={<ProviderDiscountPage />} />
                </Route>

            </Routes>
        </div>
    );
};


export default App;
