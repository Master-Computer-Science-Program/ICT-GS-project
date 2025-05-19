import { useEffect, useState, useContext } from 'react';
import { Input, Button, message } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { getProducts, searchProducts } from '../../services/productService';
import { CartContext } from '../../contexts/CartContext';
import CustomerLayout from '../../layouts/CustomerLayout';
import ProductTable from '../../components/ProductTable';

const { Search } = Input;

const CustomerCatalogPage = () => {
    const { addToCart } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');

    const fetchAllProducts = async () => {
        setLoading(true);
        try {
            const res = await getProducts();
            setProducts(res.data);
        } catch {
            message.error('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const fetchSearchResults = async (query) => {
        setLoading(true);
        try {
            const res = await searchProducts({ params: { title: query } });
            setProducts(res.data);
        } catch {
            message.error('Search failed');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllProducts();
    }, []);

    const onSearch = (value) => {
        const trimmed = value.trim();
        if (trimmed) {
            fetchSearchResults(trimmed);
        } else {
            fetchAllProducts();
        }
        setSearchText(trimmed);
    };

    return (
        <CustomerLayout>
            <Search
                placeholder="Search products by title..."
                enterButton
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onSearch={onSearch}
                style={{ width: '100%' }}
            />

            <ProductTable
                data={products}
                loading={loading}
                actionRenderer={(product) => (
                    <Button
                        type="primary"
                        icon={<ShoppingCartOutlined />}
                        onClick={() => addToCart(product)}
                        style={{ marginLeft: 8 }}
                    >
                        Add to Cart
                    </Button>
                )}
            />
        </CustomerLayout>
    );
};

export default CustomerCatalogPage;