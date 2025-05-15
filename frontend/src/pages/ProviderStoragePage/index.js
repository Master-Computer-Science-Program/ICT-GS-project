import { useState, useEffect } from 'react';
import { Button, Modal, message } from 'antd';
import StorageTable from '../../components/StorageTable';
import StorageForm from '../../components/StorageForm';
import { getMyColdStorages, createColdStorage, updateColdStorage, deleteColdStorage } from '../../services/coldStorageService';
import ServiceProviderLayout from '../../layouts/ServiceProviderLayout';

const ProviderStoragePage = () => {
    const [storages, setStorages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingStorage, setEditingStorage] = useState(null);

    const fetchStorages = async () => {
        setLoading(true);
        try {
            const res = await getMyColdStorages();
            setStorages(res.data);
        } catch {
            message.error('Failed to load storages');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchStorages();
    }, []);

    const handleAdd = async (values) => {
        try {
            await createColdStorage(values);
            message.success('Storage added');
            fetchStorages();
            setModalVisible(false);
        } catch {
            message.error('Failed to add storage');
        }
    };

    const handleEdit = async (values) => {
        try {
            await updateColdStorage(editingStorage.id, values);
            message.success('Storage updated');
            fetchStorages();
            setModalVisible(false);
            setEditingStorage(null);
        } catch {
            message.error('Failed to update storage');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteColdStorage(id);
            message.success('Storage deleted');
            fetchStorages();
        } catch {
            message.error('Failed to delete storage');
        }
    };

    const openAddModal = () => {
        setEditingStorage(null);
        setModalVisible(true);
    };

    const openEditModal = (storage) => {
        setEditingStorage(storage);
        setModalVisible(true);
    };

    return (
        <ServiceProviderLayout>
            <Button type="primary" onClick={openAddModal} style={{ marginBottom: 16 }}>
                Add Storage
            </Button>
            <StorageTable data={storages} loading={loading} onEdit={openEditModal} onDelete={handleDelete} />

            <Modal
                open={modalVisible}
                title={editingStorage ? 'Edit Storage' : 'Add Storage'}
                onCancel={() => setModalVisible(false)}
                footer={null}
                destroyOnClose
            >
                <StorageForm
                    initialValues={editingStorage || {}}
                    onSubmit={editingStorage ? handleEdit : handleAdd}
                />
            </Modal>
        </ServiceProviderLayout>
    );
};

export default ProviderStoragePage;
