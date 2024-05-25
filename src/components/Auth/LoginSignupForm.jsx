import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsEye, BsEyeSlash } from 'react-icons/bs'; 

const LoginSignupForm = ({ setShowLogin, setShowSignup }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const history = useHistory();

    const handleToggleMode = () => {
        setIsSignup(!isSignup);
    };

    const handleSignUpClick = () => {
        setShowSignup(true);
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isSignup) {
                const response = await axios.post('http://localhost:8088/auth/signup', { username, email, password });
                console.log('Signup Response:', response.data);
                toast.success('Signed up successfully! Redirecting to login page...',  {
                    position: 'bottom-left',
                    autoClose: 1000, // 1 second duration
                });
                setTimeout(() => {
                    history.push('/login');
                }, 3000); // Redirect to login page after 3 seconds
            } else {
                const response = await axios.post('http://localhost:8088/auth/login', { email, password });
                console.log('Login Response:', response.data);
                toast.success('Logged successfully!', {
                    position: 'bottom-left',
                    autoClose: 1000, // 1 second duration
                });
                setTimeout(() => {
                    history.push('/');
                }, 3000); // Redirect to home page page after 3 seconds
            }
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
            <ToastContainer />
            <h2 className="text-2xl mb-4">{isSignup ? 'Sign Up' : 'Login'}</h2>
            <form onSubmit={handleSubmit}>
                {isSignup && (
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
                        <input
                            id="username"
                            type="text"
                            className="mt-1 px-4 py-2 block w-full rounded bg-white border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                )}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                    <input
                        id="email"
                        type="email"
                        className="mt-1 px-4 py-2 block w-full rounded bg-white border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
            <div className="relative">
                <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    className="mt-1 px-4 py-2 block w-full rounded bg-white border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type="button"
                    className="absolute text-black right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <BsEyeSlash size={25} /> : <BsEye size={25} />} {/* Use Eye and EyeSlash icons */}
                </button>
            </div>
                </div>
                <button
                    type="submit"
                    className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600"
                >
                    {isSignup ? 'Sign Up' : 'Login'}
                </button>
            </form>
            <p className="mt-2">
                {isSignup ? 'Already have an account?' : 'Don\'t have an account?'}
                <button
                    type="button"
                    className="text-indigo-500 ml-1 hover:underline"
                    onClick={handleToggleMode}
                >
                    {isSignup ? 'Login' : 'Sign Up'}
                </button>
            </p>
        </div>
    );
};

export default LoginSignupForm;
