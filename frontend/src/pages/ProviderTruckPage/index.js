import { useState, useEffect } from 'react';
import { Button, Modal, message } from 'antd';
import TruckTable from '../../components/TruckTable';
import TruckForm from '../../components/TruckForm';
import {
    getMyTrucks,
    createTruck,
    updateTruck,
    deleteTruck,
} from '../../services/truckService';
import ServiceProviderLayout from '../../layouts/ServiceProviderLayout';

const ProviderTruckPage = () => {
    const [trucks, setTrucks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingTruck, setEditingTruck] = useState(null);

    const fetchTrucks = async () => {
        setLoading(true);
        try {
            const res = await getMyTrucks();
            setTrucks(res.data);
        } catch {
            message.error('Failed to load trucks');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchTrucks();
    }, []);

    const handleAdd = async (values) => {
        try {
            await createTruck(values);
            message.success('Truck added');
            fetchTrucks();
            setModalVisible(false);
        } catch {
            message.error('Failed to add truck');
        }
    };

    const handleEdit = async (values) => {
        try {
            await updateTruck(editingTruck.id, values);
            message.success('Truck updated');
            fetchTrucks();
            setModalVisible(false);
            setEditingTruck(null);
        } catch {
            message.error('Failed to update truck');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTruck(id);
            message.success('Truck deleted');
            fetchTrucks();
        } catch {
        message.error('Failed to delete truck');
        }
    };

    const openAddModal = () => {
        setEditingTruck(null);
        setModalVisible(true);
    };

    const openEditModal = (truck) => {
        setEditingTruck(truck);
        setModalVisible(true);
    };

    return (
        <ServiceProviderLayout>
        <Button type="primary" onClick={openAddModal} style={{ marginBottom: 16 }}>
            Add Truck
        </Button>
        <TruckTable data={trucks} loading={loading} onEdit={openEditModal} onDelete={handleDelete} />

        <Modal
            open={modalVisible}
            title={editingTruck ? 'Edit Truck' : 'Add Truck'}
            onCancel={() => setModalVisible(false)}
            footer={null}
        >
            <TruckForm
                initialValues={editingTruck || {}}
                onSubmit={editingTruck ? handleEdit : handleAdd}
                loading={loading}
                isUpdate={!!editingTruck}
            />
        </Modal>
        </ServiceProviderLayout>
    );
};

export default ProviderTruckPage;
