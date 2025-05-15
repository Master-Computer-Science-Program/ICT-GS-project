import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import { DashboardOutlined, UserOutlined, AlertOutlined, LogoutOutlined } from '@ant-design/icons';

const { Header, Sider, Content, Footer } = Layout;

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const username = localStorage.getItem('username') || 'Admin';

  const menuItems = [
    {
      key: '/admin/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/admin/users',
      icon: <UserOutlined />,
      label: 'User Management',
    },
    {
      key: '/admin/alerts',
      icon: <AlertOutlined />,
      label: 'System Alerts',
    },
  ];

  const onMenuClick = ({ key }) => {
    navigate(key);
  };

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
      >
        <div>
          <div style={{ height: 32, margin: 16, color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 16, lineHeight: '32px' }}>
            Admin Panel
          </div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={onMenuClick}
          />
        </div>

        <div style={{ padding: '16px', color: 'white', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div style={{ marginBottom: 8 }}>
            Logged in as <strong>{username}</strong>
          </div>
          <Button type="primary" icon={<LogoutOutlined />} block onClick={logout}>
            Logout
          </Button>
        </div>
      </Sider>

      <Layout>
        <Content style={{ margin: 16 }}>
          {children}
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          © 2025 ICT Project
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
