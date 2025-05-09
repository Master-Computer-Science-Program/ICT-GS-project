import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

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
        <Form name="login" initialValues={{ remember: true }} onFinish={onFinish}>
            <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Log in
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
