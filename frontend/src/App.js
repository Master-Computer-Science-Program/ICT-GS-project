import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/AdminPages/Dashboard';
import UserManagement from './pages/AdminPages/UserManagement';
import AlertViewer from './pages/AdminPages/AlertViewer';

const App = () => {
    return (
        <div className="app">
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/admin" element={<Dashboard />} />
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/users" element={<UserManagement />} />
                <Route path="/admin/alerts" element={<AlertViewer />} />
            </Routes>
        </div>
    );
};

export default App;
