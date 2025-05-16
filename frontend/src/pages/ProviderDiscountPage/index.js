import { useState, useEffect } from 'react';
import { Button, Modal, message } from 'antd';
import DiscountTable from '../../components/DiscountTable';
import DiscountForm from '../../components/DiscountForm';
import { getMyDiscounts, createDiscount, deleteDiscount } from '../../services/discountService';
import ServiceProviderLayout from '../../layouts/ServiceProviderLayout';

const ProviderDiscountPage = () => {
    const [discounts, setDiscounts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const fetchDiscounts = async () => {
        setLoading(true);
        try {
            const res = await getMyDiscounts();
            setDiscounts(res.data);
        } catch {
            message.error('Failed to load discounts');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchDiscounts();
    }, []);

    const handleAdd = async (values) => {
        try {
            await createDiscount(values);
            message.success('Discount added');
            fetchDiscounts();
            setModalVisible(false);
        } catch {
            message.error('Failed to add discount');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteDiscount(id);
            message.success('Discount deleted');
            fetchDiscounts();
        } catch {
            message.error('Failed to delete discount');
        }
    };

    return (
        <ServiceProviderLayout>
            <Button type="primary" onClick={() => setModalVisible(true)} style={{ marginBottom: 16 }}>
                Add Discount
            </Button>
            <DiscountTable data={discounts} loading={loading} onDelete={handleDelete} />

            <Modal
                open={modalVisible}
                title="Add Discount"
                onCancel={() => setModalVisible(false)}
                footer={null}
                destroyOnClose
            >
                <DiscountForm
                    onSubmit={handleAdd}
                />
            </Modal>
        </ServiceProviderLayout>
    );
};

export default ProviderDiscountPage;
