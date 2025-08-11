import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContect';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Form, Input, Button, Card, Typography } from 'antd';

const { Title, Text } = Typography;

const Login = () => {
    const { backend_Url, navigate, setToken } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await axios.post(backend_Url + '/api/user/login', { email, password });

            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                toast.success('Login Successful!');
                setEmail('');
                setPassword('');
                navigate('/dashboard');
            } else {
                toast.error(response.data.message);
                setEmail('');
                setPassword('');
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <Card className="shadow-lg w-full max-w-md">
                <Title level={2} className="text-center">Login</Title>
                <Form layout="vertical" onFinish={handleLogin}>
                    <Form.Item label="Email" required>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                    </Form.Item>
                    <Form.Item label="Password" required>
                        <Input.Password
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={loading}>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
                <div className="text-center">
                    <Text>Don't have an account? </Text>
                    <Button type="link" onClick={() => navigate('/signup')}>Sign Up</Button>
                </div>
            </Card>
        </div>
    );
};

export default Login;
