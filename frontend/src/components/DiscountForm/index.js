import React from 'react';
import { Form, Input, InputNumber, DatePicker, Button } from 'antd';
import dayjs from 'dayjs';

const DiscountForm = ({ initialValues = {}, onSubmit }) => {
    const [form] = Form.useForm();

    const handleFinish = (values) => {
        onSubmit({
            ...values,
            valid_until: values.valid_until ? values.valid_until.format('YYYY-MM-DD') : null,
        });
    };

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={{
                ...initialValues,
                valid_until: initialValues.valid_until ? dayjs(initialValues.valid_until) : null,
            }}
            onFinish={handleFinish}
        >
            <Form.Item
                label="ID"
                name="id"
                rules={[{ required: true, message: 'Please input discount ID' }]}
            >
                <Input disabled={!!initialValues.id} />
            </Form.Item>

            <Form.Item
                label="Percentage"
                name="percentage"
                rules={[
                    { required: true, message: 'Please input percentage' },
                    { type: 'number', min: 0, max: 100, message: 'Percentage must be between 0 and 100' },
                ]}
            >
                <InputNumber min={0} max={100} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
                label="Valid Until"
                name="valid_until"
                rules={[{ required: true, message: 'Please select valid until date' }]}
            >
                <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                    {initialValues?.id ? 'Update Discount' : 'Create Discount'}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default DiscountForm;
