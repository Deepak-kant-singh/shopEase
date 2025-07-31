// Import required modules and components
import React, { useContext, useState } from 'react';
import logo from '../assets/logo.png';
import { IoEyeOutline, IoEye } from 'react-icons/io5';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { adminDataContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { serverUrl } = useContext(authDataContext);
  const { getAdmin } = useContext(adminDataContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Admin Login Function
  const AdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/adminlogin`,
        { email, password },
        { withCredentials: true }
      );
      console.log(result.data);
      toast.success('Admin Login Successfully');
      getAdmin();
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error('Admin Login Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 text-gray-800 flex flex-col items-center animate-fadeIn">
      
      {/* Top Header */}
      <div className="w-full h-[80px] flex items-center px-6 gap-3">
        <img src={logo} alt="logo" className="w-12 drop-shadow-md" />
        <h1 className="text-2xl font-bold font-sans text-[#1e3a8a] tracking-wide">SinghJii-store</h1>
      </div>

      {/* Welcome Section */}
      <div className="w-full text-center mt-8 space-y-2">
        <h2 className="text-4xl font-extrabold text-[#1e3a8a] drop-shadow-sm">Admin Login</h2>
        <p className="text-lg text-gray-600">Welcome back! Please enter your admin credentials.</p>
      </div>

      {/* Login Form */}
      <div className="w-[90%] max-w-md mt-10 bg-white/70 backdrop-blur-lg border border-gray-200 rounded-3xl shadow-2xl p-10 transition-transform hover:scale-[1.02]">
        <form onSubmit={AdminLogin} className="flex flex-col gap-6">

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[50px] rounded-xl px-4 bg-gray-50/80 border border-gray-300 
                       placeholder-gray-500 text-gray-800 focus:outline-none 
                       focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-200"
          />

          {/* Password Input */}
          <div className="relative w-full">
            <input
              type={show ? 'text' : 'password'}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[50px] rounded-xl px-4 pr-12 bg-gray-50/80 border border-gray-300 
                         placeholder-gray-500 text-gray-800 focus:outline-none 
                         focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-200"
            />
            {/* Eye Icon */}
            <div
              className="absolute top-3.5 right-3 text-gray-500 cursor-pointer hover:text-blue-600 hover:scale-110 transition-all duration-200"
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
                       rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl 
                       transform hover:scale-[1.02] transition-all duration-200 
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
