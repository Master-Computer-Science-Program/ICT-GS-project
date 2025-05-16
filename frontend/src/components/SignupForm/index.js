import React, { useState } from 'react';
import { Form, Input, Button, Select, Typography, message } from 'antd';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';

const { Option } = Select;
const { Text, Title } = Typography;

const SignupForm = () => {
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        // console.log('Form submitted with values:', values);
        setLoading(true);
        try {
            const data = {
                email: values.email,
                password: values.password,
                role: values.role,
                name: values.name,
                location: values.location || '',
                contact: values.contact || '',
            };
    
            await signup(data);
            message.success('Signup successful!');
            navigate('/login');
        } catch (error) {
            const errorMsg =
                error?.response?.data?.message ||
                error?.message ||
                'Signup failed! Please try again.';
            message.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 450, margin: 'auto', padding: '40px 20px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: 8, backgroundColor: '#fff' }}>
            <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
                Create an Account
            </Title>

            <Form name="signup" onFinish={onFinish} layout="vertical">
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'Please enter a valid email!' }
                    ]}
                >
                    <Input placeholder="Enter your email" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password placeholder="Create a password" />
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
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input placeholder="Your full name" />
                </Form.Item>

                <Form.Item label="Location" name="location">
                    <Input placeholder="Optional" />
                </Form.Item>

                <Form.Item label="Contact" name="contact">
                    <Input placeholder="Optional contact number" />
                </Form.Item>

                <Form.Item style={{ textAlign: 'center' }}>
                    <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
                        Sign up
                    </Button>
                </Form.Item>
            </Form>

            <div style={{ textAlign: 'center', marginTop: 16 }}>
                <Text>
                    Already have an account?{' '}
                    <Link to="/login" style={{ fontWeight: '600' }}>
                        Log in
                    </Link>
                </Text>
            </div>
        </div>
    );
};

export default SignupForm;
