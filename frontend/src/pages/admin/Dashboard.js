import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const res = await axios.get('/api/admin/transactions/stats');
//         setStats(res.data);
//       } catch (err) {
//         console.error('Failed to fetch transaction stats:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

    useEffect(() => {
    // mock fetchStats instead of axios
    const mockData = {
        totalBookings: 42,
        totalRevenue: 12900,
        activeUsers: 9,
        recentBookings: [
        { id: 'B001', username: 'user1', service: 'Chennai Cold Storage', date: new Date() },
        { id: 'B002', username: 'user2', service: 'Truck - Coimbatore', date: new Date() }
        ]
    };

    setTimeout(() => {
        setStats(mockData);
        setLoading(false);
    }, 500); // simulate network delay
    }, []);

  if (loading || !stats) return <div>Loading dashboard...</div>;

    return (
    <AdminLayout>
        <div>
        <h1 className="page-title">System Admin Dashboard</h1>

        <div className="card-grid">
            <div className="card">
            <p>Total Bookings</p>
            <p>{stats.totalBookings}</p>
            </div>
            <div className="card">
            <p>Total Revenue</p>
            <p>₹ {stats.totalRevenue}</p>
            </div>
            <div className="card">
            <p>Active Users</p>
            <p>{stats.activeUsers}</p>
            </div>
        </div>

        <div className="section">
            <h2>Recent Bookings</h2>
            <table className="table">
            <thead>
                <tr>
                <th>Booking ID</th>
                <th>User</th>
                <th>Service</th>
                <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {stats.recentBookings.map((booking) => (
                <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.username}</td>
                    <td>{booking.service}</td>
                    <td>{new Date(booking.date).toLocaleString()}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    </AdminLayout>
    );
};

export default Dashboard;