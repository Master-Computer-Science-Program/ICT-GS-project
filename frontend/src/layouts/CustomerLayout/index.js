import { Layout, Menu } from 'antd';
import { AppstoreOutlined, ShoppingCartOutlined, HistoryOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Sider, Content, Footer } = Layout;

const CustomerLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

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

    const currentMenu = menuItems.find(item => item.key === location.pathname);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider>
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
