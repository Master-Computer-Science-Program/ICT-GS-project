import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../../layouts/AdminLayout';
import { getUsers, deleteUser as deleteById } from '../../../services/adminService';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsers()
        setUsers(res.data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await deleteById(userId)
      setUsers({
        ...users,
        users: users.users.filter(user => user.id !== userId)
      });
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  if (loading) return <div>Loading users...</div>;

    return (
    <AdminLayout>
        <div>
        <h1 className="page-title">User Management</h1>

        <div className="section">
            <table className="table">
            <thead>
                <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Location</th>
                <th>Contact</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.users.map((user) => (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.location}</td>
                    <td>{user.contact}</td>
                    <td>
                    <button
                        onClick={() => deleteUser(user.id)}
                        style={{
                        backgroundColor: '#dc2626',
                        color: '#fff',
                        padding: '0.4rem 0.75rem',
                        borderRadius: '4px',
                        border: 'none',
                        fontWeight: '500',
                        cursor: 'pointer',
                        }}
                    >
                        Delete
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    </AdminLayout>
    );
};

export default UserManagement;