import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Button, Checkbox } from 'antd';

const TruckForm = ({ initialValues = {}, onSubmit, loading, isUpdate = false }) => {
    const [form] = Form.useForm();

    // Set initial values when provided (important for update)
    useEffect(() => {
        form.setFieldsValue({
        availability: true, // default to true if not provided
        ...initialValues,
        });
    }, [initialValues, form]);

    const handleFinish = (values) => {
        onSubmit(values);
    };

    return (
        <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ availability: true, ...initialValues }}
        style={{ maxWidth: 400, margin: 'auto' }}
        >
        <Form.Item
            label="Route"
            name="route"
            rules={[{ required: true, message: 'Please input the route!' }]}
        >
            <Input placeholder="Enter route" />
        </Form.Item>

        <Form.Item
            label="Capacity"
            name="capacity"
            rules={[
            { required: true, message: 'Please input the capacity!' },
            { type: 'number', min: 1, message: 'Capacity must be at least 1' },
            ]}
        >
            <InputNumber style={{ width: '100%' }} min={1} placeholder="Enter capacity" />
        </Form.Item>

        <Form.Item
            label="Price Per Km"
            name="pricePerKm"
            rules={[
            { required: true, message: 'Please input the price per km!' },
            { type: 'number', min: 0, message: 'Price must be a positive number' },
            ]}
        >
            <InputNumber
            style={{ width: '100%' }}
            min={0}
            step={0.01}
            placeholder="Enter price per km"
            formatter={(value) => `$ ${value}`}
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            />
        </Form.Item>

        <Form.Item name="availability" valuePropName="checked" style={{ marginBottom: 24 }}>
            <Checkbox>Available</Checkbox>
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
            {isUpdate ? 'Update Truck' : 'Create Truck'}
            </Button>
        </Form.Item>
        </Form>
    );
};

export default TruckForm;
