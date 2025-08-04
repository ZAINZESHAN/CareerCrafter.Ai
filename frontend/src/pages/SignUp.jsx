import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Ensure you have toast notifications set up
import { AuthContext } from '../context/AuthContect';

const SignUp = () => {

    const { backend_Url, navigate, setToken } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
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
                navigate('/dashboard')
            } else {
                toast.error(response.data.message);
                setName('');
                setEmail('');
                setPassword('');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const navigateToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white text-white text-md shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className='prata-regular text-4xl  text-black text-center mb-6'>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2 text-black">
                        <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="bg-white border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
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
                            Sign Up
                        </button>
                    </div>
                </form>
                <div className="mt-4 text-center text-blue-500">

                    <span className='text-gray-700'>Already have an account?{' '}</span>
                    <button
                        className="text-blue-500 font-bold cursor-pointer hover:underline"
                        onClick={navigateToLogin}
                    >
                        Login here
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
