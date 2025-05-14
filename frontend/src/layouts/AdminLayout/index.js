import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { DashboardOutlined, UserOutlined, AlertOutlined } from '@ant-design/icons';

const { Header, Sider, Content, Footer } = Layout;

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

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

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div style={{ height: 32, margin: 16, color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: '16px', lineHeight: '32px' }}>
          Admin Panel
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={onMenuClick}
        />
      </Sider>

      <Layout>
        <Content style={{ margin: '16px' }}>
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