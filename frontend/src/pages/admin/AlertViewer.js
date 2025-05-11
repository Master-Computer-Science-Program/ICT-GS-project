import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../components/AdminLayout';

const AlertViewer = () => {
  const [alerts, setAlerts] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchAlerts = async () => {
    try {
      const res = await axios.get('/api/admin/alerts');
      setAlerts(res.data);
    } catch (err) {
      console.error('Failed to fetch alerts:', err);
    } finally {
      setLoading(false);
    }
  };

  const sendAlert = async () => {
    if (!message.trim()) return;
    try {
      await axios.post('/api/admin/alerts', { message });
      setMessage('');
      fetchAlerts(); // refresh list
    } catch (err) {
      console.error('Failed to send alert:', err);
    }
  };

//   useEffect(() => {
//     fetchAlerts();
//   }, []);

  useEffect(() => {
    // simulate API fetch
    const mockAlerts = [
      { id: 1, message: 'System restart scheduled for 6PM', timestamp: new Date() },
      { id: 2, message: 'New version deployed successfully', timestamp: new Date() }
    ];
    setTimeout(() => {
      setAlerts(mockAlerts);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) return <div>Loading alerts...</div>;

    return (
    <AdminLayout>
        <div>
        <h1 className="page-title">System Alerts</h1>

        <div className="section">
            <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter system-wide alert message"
            rows={3}
            style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '1rem',
                marginBottom: '1rem',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontFamily: 'inherit',
            }}
            />
            <button
            onClick={sendAlert}
            style={{
                backgroundColor: '#2563eb',
                color: '#fff',
                padding: '0.5rem 1.25rem',
                borderRadius: '4px',
                border: 'none',
                fontWeight: '500',
                cursor: 'pointer'
            }}
            >
            Send Alert
            </button>
        </div>

        <div className="section">
            <h2>Sent Alerts</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
            {alerts.map((alert) => (
                <li
                key={alert.id}
                style={{
                    border: '1px solid #ddd',
                    padding: '1rem',
                    borderRadius: '6px',
                    marginBottom: '0.75rem',
                }}
                >
                <p style={{ fontSize: '0.85rem', color: '#666' }}>
                    {new Date(alert.timestamp).toLocaleString()}
                </p>
                <p style={{ marginTop: '0.25rem' }}>{alert.message}</p>
                </li>
            ))}
            </ul>
        </div>
        </div>
    </AdminLayout>
    );
};

export default AlertViewer;