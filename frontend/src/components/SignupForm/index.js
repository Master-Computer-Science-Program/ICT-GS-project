import React, { useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const SignupForm = () => {
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('username', values.username);
            formData.append('password', values.password);
            
            await signup(formData);
            message.success('Signup successful!');
            navigate('/login');
        } catch (error) {
            message.error('Signup failed!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form name="signup" onFinish={onFinish}>
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label="Role"
                name="role"
                rules={[{ required: true, message: 'Please select your role!' }]}
            >
                <Select placeholder="Select a role">
                    <Option value="farmer">Farmer</Option>
                    <Option value="admin">Admin</Option>
                    <Option value="customer">Customer</Option>
                    <Option value="service_provider">Service Provider</Option>
                </Select>
            </Form.Item>

            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: false, message: 'Please input your name!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Location"
                name="location"
                rules={[{ required: false, message: 'Please input your location!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Contact"
                name="contact"
                rules={[{ required: false, message: 'Please input your contact number!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Sign up
                </Button>
            </Form.Item>
        </Form>
    );
};

export default SignupForm;