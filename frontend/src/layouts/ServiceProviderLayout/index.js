import { Layout, Menu, Button } from 'antd';
import { ShopOutlined, CarOutlined, CalendarOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Sider, Content, Footer } = Layout;

const ServiceProviderLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const username = localStorage.getItem('username') || 'Provider';

    const menuItems = [
        {
            key: '/provider/storages',
            icon: <ShopOutlined />,
            label: 'Manage Cold Storages',
        },
        {
            key: '/provider/trucks',
            icon: <CarOutlined />,
            label: 'Manage Trucks',
        },
        {
            key: '/provider/bookings',
            icon: <CalendarOutlined />,
            label: 'Manage Bookings',
        },
    ];

    const onMenuClick = ({ key }) => {
        navigate(key);
    };

    const logout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const currentMenu = menuItems.find(item => item.key === location.pathname);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                    <div style={{ height: 32, margin: 16, color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
                        Service Provider Panel
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
                <Content style={{ margin: '16px' }}>
                    <h2>{currentMenu ? currentMenu.label : ''}</h2>
                    {children}
                </Content>

                <Footer style={{ textAlign: 'center' }}>
                    © 2025 ICT Project
                </Footer>
            </Layout>
        </Layout>
    );
};

export default ServiceProviderLayout;
