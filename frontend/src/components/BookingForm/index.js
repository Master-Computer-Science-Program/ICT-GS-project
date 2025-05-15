import React, { useState, useEffect } from 'react';
import { Form, Select, DatePicker, InputNumber, Button, message } from 'antd';
import { getAllColdStorages } from '../../services/coldStorageService';
import { getAllTrucks } from '../../services/truckService';
import { createBooking } from '../../services/bookingService';

const { Option } = Select;

const BookingForm = ({ onSuccess }) => {
    const [form] = Form.useForm();
    const [bookingType, setBookingType] = useState(null);
    const [storages, setStorages] = useState([]);
    const [trucks, setTrucks] = useState([]);
    const [loadingStorages, setLoadingStorages] = useState(false);
    const [loadingTrucks, setLoadingTrucks] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (bookingType === 'cold_storage') {
        setLoadingStorages(true);
        getAllColdStorages()
            .then(res => setStorages(res.data))
            .catch(() => message.error('Failed to load storages'))
            .finally(() => setLoadingStorages(false));
        } else if (bookingType === 'truck') {
        setLoadingTrucks(true);
        getAllTrucks()
            .then(res => setTrucks(res.data))
            .catch(() => message.error('Failed to load trucks'))
            .finally(() => setLoadingTrucks(false));
        }
    }, [bookingType]);

    const onBookingTypeChange = value => {
        setBookingType(value);
        form.resetFields([
        'cold_storage_id',
        'start_date',
        'end_date',
        'truck_id',
        'distance',
        ]);
    };

    const onFinish = async values => {
        setSubmitting(true);

        try {
        // Prepare payload based on booking type
        const payload = { booking_type: bookingType };

        if (bookingType === 'cold_storage') {
            payload.cold_storage_id = values.cold_storage_id;
            payload.start_date = values.start_date.format('YYYY-MM-DD');
            payload.end_date = values.end_date.format('YYYY-MM-DD');
        } else if (bookingType === 'truck') {
            payload.truck_id = values.truck_id;
            payload.distance = values.distance;
        }

        await createBooking(payload);
        message.success('Booking created successfully');
        form.resetFields();
        setBookingType(null);
        if (onSuccess) onSuccess();
        } catch (error) {
        message.error('Failed to create booking');
        } finally {
        setSubmitting(false);
        }
    };

    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
            label="Booking Type"
            name="booking_type"
            rules={[{ required: true, message: 'Please select booking type' }]}
        >
            <Select placeholder="Select booking type" onChange={onBookingTypeChange}>
            <Option value="cold_storage">Cold Storage</Option>
            <Option value="truck">Truck</Option>
            </Select>
        </Form.Item>

        {bookingType === 'cold_storage' && (
            <>
            <Form.Item
                label="Cold Storage"
                name="cold_storage_id"
                rules={[{ required: true, message: 'Please select cold storage' }]}
            >
                <Select
                placeholder="Select cold storage"
                loading={loadingStorages}
                allowClear
                >
                {storages.map(storage => (
                    <Option key={storage.id} value={storage.id}>
                    {storage.location} - Capacity: {storage.capacity}
                    </Option>
                ))}
                </Select>
            </Form.Item>

            <Form.Item
                label="Start Date"
                name="start_date"
                rules={[{ required: true, message: 'Please select start date' }]}
            >
                <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
                label="End Date"
                name="end_date"
                rules={[{ required: true, message: 'Please select end date' }]}
            >
                <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            </>
        )}

        {bookingType === 'truck' && (
            <>
            <Form.Item
                label="Truck"
                name="truck_id"
                rules={[{ required: true, message: 'Please select truck' }]}
            >
                <Select
                placeholder="Select truck"
                loading={loadingTrucks}
                allowClear
                >
                {trucks.map(truck => (
                    <Option key={truck.id} value={truck.id}>
                    {truck.route} - Capacity: {truck.capacity}
                    </Option>
                ))}
                </Select>
            </Form.Item>

            <Form.Item
                label="Distance (km)"
                name="distance"
                rules={[
                { required: true, message: 'Please enter distance' },
                { type: 'number', min: 1, message: 'Distance must be positive' },
                ]}
            >
                <InputNumber style={{ width: '100%' }} min={1} />
            </Form.Item>
            </>
        )}

        <Form.Item>
            <Button type="primary" htmlType="submit" loading={submitting} disabled={!bookingType}>
            Submit Booking
            </Button>
        </Form.Item>
        </Form>
    );
};

export default BookingForm;
