import { Layout, Menu } from 'antd';
import { WarehouseOutlined, CarOutlined, CalendarOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Sider, Content, Footer } = Layout;

const ServiceProviderLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            key: '/provider/storages',
            icon: <WarehouseOutlined />,
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

    const currentMenu = menuItems.find(item => item.key === location.pathname);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider>
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
