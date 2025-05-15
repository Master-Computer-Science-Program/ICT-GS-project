import React from 'react';
import { Form, Select, DatePicker, InputNumber } from 'antd';
import dayjs from 'dayjs';

const { Option } = Select;

const availabilityColors = {
    available: 'green',
    unavailable: 'red',
};

const ProviderBookingForm = ({
    booking_type,
    cold_storage_id,
    truck_id,
    start_date,
    end_date,
    distance,
    availability,
    disabled = true,
}) => {
    const availabilityColor = disabled ? 'inherit' : (availabilityColors[availability] || 'inherit');

    return (
        // Remove disabled prop from Form
        <Form layout="vertical">

            {booking_type === 'cold_storage' && (
                <>
                <Form.Item label="Cold Storage" name="cold_storage_id" initialValue={cold_storage_id}>
                    <Select disabled={disabled}>
                    {cold_storage_id && <Option value={cold_storage_id}>{cold_storage_id}</Option>}
                    </Select>
                </Form.Item>

                <Form.Item label="Start Date" name="start_date" initialValue={start_date}>
                    <DatePicker style={{ width: '100%' }} disabled={disabled} value={start_date ? dayjs(start_date) : null} />
                </Form.Item>

                <Form.Item label="End Date" name="end_date" initialValue={end_date}>
                    <DatePicker style={{ width: '100%' }} disabled={disabled} value={end_date ? dayjs(end_date) : null} />
                </Form.Item>

                <Form.Item label="Availability" name="availability" initialValue={availability}>
                    <span style={{ fontWeight: 'bold', color: availabilityColor, minWidth: 80, display: 'inline-block' }}>
                    {availability === 'available' ? 'Available' : availability === 'unavailable' ? 'Unavailable' : 'N/A'}
                    </span>
                </Form.Item>
                </>
            )}

            {booking_type === 'truck' && (
                <>
                <Form.Item label="Truck" name="truck_id" initialValue={truck_id}>
                    <Select disabled={disabled}>
                    {truck_id && <Option value={truck_id}>{truck_id}</Option>}
                    </Select>
                </Form.Item>

                <Form.Item label="Distance (km)" name="distance" initialValue={distance}>
                    <InputNumber style={{ width: '100%' }} min={1} disabled={disabled} value={distance} />
                </Form.Item>

                <Form.Item label="Availability" name="availability" initialValue={availability}>
                    <span style={{ fontWeight: 'bold', color: availabilityColor, minWidth: 80, display: 'inline-block' }}>
                    {availability === 'available' ? 'Available' : availability === 'unavailable' ? 'Unavailable' : 'N/A'}
                    </span>
                </Form.Item>
                </>
            )}

        </Form>
    );
};

export default ProviderBookingForm;
