import { Layout, Menu, Button } from 'antd';
import { AppstoreOutlined, ShoppingCartOutlined, HistoryOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Sider, Content, Footer } = Layout;

const CustomerLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const username = localStorage.getItem('username') || 'Customer';

    const menuItems = [
        {
            key: '/customer/catalog',
            icon: <AppstoreOutlined />,
            label: 'Product Catalog',
        },
        {
            key: '/customer/cart',
            icon: <ShoppingCartOutlined />,
            label: 'Shopping Cart',
        },
        {
            key: '/customer/orders',
            icon: <HistoryOutlined />,
            label: 'Order History',
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
                        Customer Panel
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

export default CustomerLayout;
