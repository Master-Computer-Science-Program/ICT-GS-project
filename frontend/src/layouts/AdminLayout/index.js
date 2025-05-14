import React from 'react';
import { Link } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside className="sidebar">
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
          Admin Panel
        </h2>
        <nav>
          <Link to="/admin/dashboard" className="nav-link">
            Dashboard
          </Link>
          <Link to="/admin/users" className="nav-link">
            User Management
          </Link>
          <Link to="/admin/alerts" className="nav-link">
            System Alerts
          </Link>
        </nav>
      </aside>

      <main style={{ flex: 1, padding: '2rem', backgroundColor: '#fff' }}>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;