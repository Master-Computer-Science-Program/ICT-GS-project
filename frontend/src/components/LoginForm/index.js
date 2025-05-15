import React, { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';

const { Text, Title } = Typography;

const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await login(values);
            message.success('Login successful!');
            navigate('/');
        } catch (error) {
            message.error('Login failed!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: 'auto', padding: '40px 20px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: 8, backgroundColor: '#fff' }}>
            <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
                Welcome Back
            </Title>

            <Form name="login" onFinish={onFinish} layout="vertical">
                <Form.Item
                    label="Email"
                    name="username"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input placeholder="Enter your username" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password placeholder="Enter your password" />
                </Form.Item>

                <Form.Item style={{ textAlign: 'center' }}>
                    <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
                        Log in
                    </Button>
                </Form.Item>
            </Form>

            <div style={{ textAlign: 'center', marginTop: 16 }}>
                <Text>
                    Don&apos;t have an account?{' '}
                    <Link to="/signup" style={{ fontWeight: '600' }}>
                        Sign up
                    </Link>
                </Text>
            </div>
        </div>
    );
};

export default LoginForm;
