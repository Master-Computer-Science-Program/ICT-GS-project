import { useState, useEffect } from 'react';
import { Button, Modal, message } from 'antd';
import ProductTable from '../../components/ProductTable';
import ProductForm from '../../components/ProductForm';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../services/productService';
import FarmerLayout from '../../layouts/FarmerLayout';

const ProductListPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const fetchProducts = async () => {
        setLoading(true);
        try {
        const res = await getProducts();
        setProducts(res.data);
        } catch (error) {
        message.error('Failed to load products');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAdd = async (values) => {
        try {
        await createProduct(values);
        message.success('Product added');
        fetchProducts();
        setModalVisible(false);
        } catch {
        message.error('Failed to add product');
        }
    };

    const handleEdit = async (values) => {
        try {
        await updateProduct(editingProduct.id, values);
        message.success('Product updated');
        fetchProducts();
        setModalVisible(false);
        setEditingProduct(null);
        } catch {
        message.error('Failed to update product');
        }
    };

    const handleDelete = async (id) => {
        try {
        await deleteProduct(id);
        message.success('Product deleted');
        fetchProducts();
        } catch {
        message.error('Failed to delete product');
        }
    };

    const openAddModal = () => {
        setEditingProduct(null);
        setModalVisible(true);
    };

    const openEditModal = (product) => {
        setEditingProduct(product);
        setModalVisible(true);
    };

    return (
        <FarmerLayout>
            <Button type="primary" onClick={openAddModal} style={{ marginBottom: 16 }}>Add Product</Button>
            <ProductTable data={products} loading={loading} onEdit={openEditModal} onDelete={handleDelete} />

            <Modal
                open={modalVisible}
                title={editingProduct ? 'Edit Product' : 'Add Product'}
                onCancel={() => setModalVisible(false)}
                footer={null}
            >
                <ProductForm
                initialValues={editingProduct || {}}
                onSubmit={editingProduct ? handleEdit : handleAdd}
                />
            </Modal>
        </FarmerLayout>
    );
};

export default ProductListPage;
