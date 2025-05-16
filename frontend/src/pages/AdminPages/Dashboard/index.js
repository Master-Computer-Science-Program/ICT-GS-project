import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import { getRecentBookings, getRecentOrders, getUsers } from '../../../services/adminService';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [ordersData, setOrders] = useState(null)
  const [userData, setUsers] = useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getRecentBookings()
        setStats(res.data);

        const order_res = await getRecentOrders()
        setOrders(order_res.data);

        const user_res = await getUsers()
        setUsers(user_res.data)

      } catch (err) {
        console.error('Failed to fetch transaction stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading || !stats) return <div>Loading dashboard...</div>;

    return (
    <AdminLayout>
        <div>
        <h1 className="page-title">System Admin Dashboard</h1>

        <div className="card-grid">
            <div className="card">
            <p>Total Bookings</p>
            <p>{stats.total}</p>
            </div>
            <div className="card">
            <p>Total Revenue</p>
            <p>₹ {ordersData.orders.reduce((res, order) => res + order.totalAmount, 0)}</p>
            </div>
            <div className="card">
            <p>Active Users</p>
            <p>{userData.total}</p>
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
                {stats.bookings.map((booking) => (
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


        <div className="section">
            <h2>Recent Orders</h2>
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
                {ordersData.orders.map((order) => (
                <tr key={order.id}>
                    <td>{order.totalAmount}</td>
                    <td>{order.status}</td>
                    <td>{new Date(order.date).toLocaleString()}</td>
                    <td>{order.customer_id}</td>
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