import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContect';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

    const { backend_Url, navigate, setToken } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.post(backend_Url + '/api/user/login', { email, password })
            if (response.data.success) {
                setToken(response.data.token)
                localStorage.setItem('token', response.data.token)
                localStorage.setItem("user", JSON.stringify(response.data.user));
                toast.success('Login Successful!')
                setEmail('')
                setPassword('')
                navigate('/dashboard')
            }
            else {
                toast.error(response.data.message)
                setEmail('')
                setPassword('')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const navigateTOSingUp = () => {
        navigate('/signup')
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white text-white text-md shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className='prata-regular text-4xl  text-black text-center mb-6'>Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="mb-2 text-black">
                        <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="bg-white border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-2 text-black">
                        <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="bg-white border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex justify-center mt-8"> {/* Centering the button */}
                        <button
                            type="submit"
                            className="text-white bg-blue-600 w-full cursor-pointer hover:bg-blue-700 font-bold py-3 rounded"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <div className="mt-4 text-center text-blue-500">

                    <span className='text-gray-700'>Don't have an account?{' '}</span>
                    <button
                        className="text-blue-500 font-bold cursor-pointer hover:underline"
                        onClick={navigateTOSingUp}
                    >
                        SignUp
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
