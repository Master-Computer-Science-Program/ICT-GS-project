import { useState, useEffect } from 'react';
import { Button, Modal, message, Divider } from 'antd';
import FarmerLayout from '../../layouts/FarmerLayout';
import BookingTable from '../../components/BookingTable';
import BookingForm from '../../components/BookingForm';
import { createBooking, getMyBookings } from '../../services/bookingService';

const FarmerBookingPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const res = await getMyBookings();
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

    const handleAdd = async (values) => {
        try {
            console.log('Booking values:', values);
            await createBooking(values);
            message.success('Booking request submitted');
            fetchBookings();
            setModalVisible(false);
        } catch (error) {
            message.error('Failed to submit booking');
        }
    };

    const storageBookings = bookings.filter(b => b.booking_type === 'cold_storage');
    const truckBookings = bookings.filter(b => b.booking_type === 'truck');

    return (
        <FarmerLayout>
            <Button type="primary" onClick={() => setModalVisible(true)} style={{ marginBottom: 16 }}>
                Send Booking Request
            </Button>

            <Divider orientation="left">Cold Storage Requests</Divider>
            <BookingTable data={storageBookings} loading={loading} type="cold_storage" />

            <Divider orientation="left">Truck Requests</Divider>
            <BookingTable data={truckBookings} loading={loading} type="truck" />

            <Modal
                open={modalVisible}
                title="Send Booking Request"
                onCancel={() => setModalVisible(false)}
                footer={null}
            >
                <BookingForm onSuccess={() => { handleAdd; setModalVisible(false); fetchBookings(); }} />
            </Modal>
        </FarmerLayout>
    );
};

export default FarmerBookingPage;
