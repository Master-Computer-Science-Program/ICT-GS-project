import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import { getRecentBookings, getRecentOrders, getUsers } from '../../../services/adminService';

const formatDate = (value) => {
  const date = new Date(value)
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()

  return day+'/'+(month+1)+'/'+year
}

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
            <p>{stats?.total ?? 0}</p>
            </div>
            <div className="card">
            <p>Total Orders</p>
            <p>{ordersData?.total ?? 0}</p>
            </div>
            <div className="card">
            <p>Total Users</p>
            <p>{userData?.total ?? 0}</p>
            </div>
        </div>

        <div className="section">
            <h2>Recent Bookings</h2>
            <table className="table">
            <thead>
                <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Price</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {stats.bookings.map((booking) => (
                <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.booking_type}</td>
                    <td>{booking.total_price}</td>
                    <td>{formatDate(booking.start_date)}</td>
                    <td>{formatDate(booking.end_date)}</td>
                    <td>{booking.status}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>


        <div className="section">
          <h2>Recent Orders</h2>
          {ordersData && ordersData.orders?.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Price</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {ordersData.orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customer_id}</td>
                    <td>{order.totalAmount}</td>
                    <td>{formatDate(order.date)}</td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Loading or no recent orders found.</p>
          )}
        </div>
        </div>
    </AdminLayout>
    );
};

export default Dashboard;