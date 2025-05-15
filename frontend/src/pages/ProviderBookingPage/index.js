import { useState, useEffect } from 'react';
import { Modal, message, Divider } from 'antd';
import ProviderBookingTable from '../../components/ProviderBookingTable';
import ProviderBookingForm from '../../components/ProviderBookingForm';

import { getProviderBookings, updateBooking } from '../../services/bookingService';
import { getColdStorageById } from '../../services/coldStorageService';
import { getTruckById } from '../../services/truckService';

import ServiceProviderLayout from '../../layouts/ServiceProviderLayout';
import dayjs from 'dayjs';


const ProviderBookingPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const res = await getProviderBookings();
            setBookings(res.data);
        } catch (error) {
            message.error('Failed to load bookings');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await updateBooking(id, { status: newStatus });
            message.success('Booking status updated');
            fetchBookings();
        } catch (error) {
            message.error('Failed to update status');
        }
    };

    const handleViewDetail = async (record) => {
        try {
            let detailedInfo = {};

            if (record.booking_type === 'cold_storage') {
                const res = await getColdStorageById(record.cold_storage_id);
                detailedInfo = res.data;
            } else if (record.booking_type === 'truck') {
                const res = await getTruckById(record.truck_id);
                detailedInfo = res.data;
            }

            setSelectedBooking({ ...record, ...detailedInfo });
            setModalVisible(true);
        } catch (error) {
            message.error('Failed to fetch booking details');
        }
    };

    const storageBookings = bookings.filter((b) => b.booking_type === 'cold_storage');
    const truckBookings = bookings.filter((b) => b.booking_type === 'truck');

    return (
        <ServiceProviderLayout>
            <Divider orientation="left">Cold Storage Bookings</Divider>
            <ProviderBookingTable
                data={storageBookings}
                loading={loading}
                type="cold_storage"
                onStatusChange={handleStatusChange}
                onViewDetail={handleViewDetail}
            />

            <Divider orientation="left">Truck Bookings</Divider>
            <ProviderBookingTable
                data={truckBookings}
                loading={loading}
                type="truck"
                onStatusChange={handleStatusChange}
                onViewDetail={handleViewDetail}
            />

            <Modal
                open={modalVisible}
                title="Booking Detail"
                onCancel={() => setModalVisible(false)}
                footer={null}
            >
                {selectedBooking && (
                    <ProviderBookingForm
                        booking_type={selectedBooking.booking_type}
                        cold_storage_id={selectedBooking.cold_storage_id}
                        truck_id={selectedBooking.truck_id}
                        start_date={selectedBooking.start_date ? dayjs(selectedBooking.start_date) : null}
                        end_date={selectedBooking.end_date ? dayjs(selectedBooking.end_date) : null}
                        distance={selectedBooking.distance}
                        availability={selectedBooking.availability ? "available" : "unavailable"}
                    />
                )}
            </Modal>
        </ServiceProviderLayout>
    );
};

export default ProviderBookingPage;
