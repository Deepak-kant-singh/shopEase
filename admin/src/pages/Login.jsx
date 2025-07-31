// Import required modules and components
import React, { useContext, useState } from 'react';
import logo from '../assets/logo.png';                    // Store logo
import { IoEyeOutline, IoEye } from 'react-icons/io5';    // Eye icons for password visibility
import axios from 'axios';                                // For HTTP requests
import { authDataContext } from '../context/AuthContext'; // Context for server URL
import { adminDataContext } from '../context/AdminContext'; // Context to refresh admin state
import { useNavigate } from 'react-router-dom';            // Navigation after login
import { toast } from 'react-toastify';                   // Toast notifications

function Login() {
  // State to toggle password visibility
  const [show, setShow] = useState(false);

  // States to store form input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Access serverUrl and getAdmin from context
  const { serverUrl } = useContext(authDataContext);
  const { getAdmin } = useContext(adminDataContext);

  // Hook to redirect user after login
  const navigate = useNavigate();

  // State to track loading state during login
  const [loading, setLoading] = useState(false);

  // Login function for admin
  const AdminLogin = async (e) => {
    e.preventDefault();      // Prevent default form submission
    setLoading(true);        // Set loading to true while request is in progress

    try {
      // Send login credentials to backend
      const result = await axios.post(
        `${serverUrl}/api/auth/adminlogin`,
        { email, password },
        { withCredentials: true }
      );

      // If successful, show success toast, refresh admin data, and navigate to homepage
      console.log(result.data);
      toast.success('Admin Login Successfully');
      getAdmin();
      navigate('/');
    } catch (error) {
      // If failed, show error toast
      console.error(error);
      toast.error('Admin Login Failed');
    } finally {
      // Always reset loading state
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 text-gray-800 flex flex-col items-center">
      
      {/* Top Header with Logo */}
      <div className="w-full h-[80px] flex items-center px-6 gap-3">
        <img src={logo} alt="logo" className="w-10" />
        <h1 className="text-2xl font-bold font-sans text-[#1e3a8a]">SinghJii-store</h1>
      </div>

      {/* Welcome Text */}
      <div className="w-full text-center mt-8 space-y-2">
        <h2 className="text-3xl font-bold text-[#1e3a8a]">Admin Login</h2>
        <p className="text-base text-gray-600">
          Welcome back! Please enter your admin credentials.
        </p>
      </div>

      {/* Login Form */}
      <div className="w-[90%] max-w-md mt-10 bg-white border border-gray-200 rounded-2xl shadow-2xl p-8">
        <form onSubmit={AdminLogin} className="flex flex-col gap-6">

          {/* Email Field */}
          <input
            type="text"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[50px] rounded-lg px-4 bg-gray-50 border border-gray-300 
                       placeholder-gray-500 text-gray-800 focus:outline-none 
                       focus:ring-2 focus:ring-blue-400 transition-all"
          />

          {/* Password Field with Eye Toggle */}
          <div className="relative w-full">
            <input
              type={show ? 'text' : 'password'}   // Toggle between plain text and password
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[50px] rounded-lg px-4 pr-10 bg-gray-50 border border-gray-300 
                         placeholder-gray-500 text-gray-800 focus:outline-none 
                         focus:ring-2 focus:ring-blue-400 transition-all"
            />

            {/* Password Visibility Icon */}
            <div
              className="absolute top-3.5 right-3 text-gray-500 cursor-pointer hover:text-blue-500"
              onClick={() => setShow((prev) => !prev)}
            >
              {show ? <IoEye size={22} /> : <IoEyeOutline size={22} />}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-[50px] bg-blue-600 hover:bg-blue-700 text-white 
                       rounded-lg font-semibold text-lg transition-all 
                       disabled:opacity-60 cursor-pointer"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
