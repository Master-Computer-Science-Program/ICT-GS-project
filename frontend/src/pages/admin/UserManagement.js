import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../components/AdminLayout';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateRole = async (userId, newRole) => {
    try {
      await axios.put(`/api/admin/users/${userId}/role`, { role: newRole });
      fetchUsers(); // refresh list
    } catch (err) {
      console.error('Failed to update user role:', err);
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`/api/admin/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

  useEffect(() => {
    // simulate API call
    const mockUsers = [
      { id: 1, username: 'alice', email: 'alice@example.com', role: 'admin' },
      { id: 2, username: 'bob', email: 'bob@example.com', role: 'farmer' },
      { id: 3, username: 'carol', email: 'carol@example.com', role: 'provider' }
    ];

    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 500);
  }, []);

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
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                    <select
                        value={user.role}
                        onChange={(e) => updateRole(user.id, e.target.value)}
                        style={{
                        padding: '0.4rem',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        fontFamily: 'inherit',
                        }}
                    >
                        <option value="farmer">Farmer</option>
                        <option value="provider">Service Provider</option>
                        <option value="admin">Admin</option>
                    </select>
                    </td>
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