import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContect';
import { Form, Input, Button, Card, Typography } from 'antd';

const { Title, Text } = Typography;

const SignUp = () => {
    const { backend_Url, navigate, setToken } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await axios.post(backend_Url + '/api/user/register', { name, email, password });

            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                toast.success('Signup successful!');
                setName('');
                setEmail('');
                setPassword('');
                navigate('/login');
            } else {
                toast.error(response.data.message);
                setName('');
                setEmail('');
                setPassword('');
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <Card className="shadow-lg w-full max-w-md">
                <Title level={2} className="text-center">Sign Up</Title>
                <Form layout="vertical" onFinish={handleSubmit}>
                    <Form.Item label="Name" required>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                        />
                    </Form.Item>
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
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
                <div className="text-center">
                    <Text>Already have an account? </Text>
                    <Button type="link" onClick={() => navigate('/login')}>Login here</Button>
                </div>
            </Card>
        </div>
    );
};

export default SignUp;
