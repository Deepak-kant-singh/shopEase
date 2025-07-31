import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoEyeOutline, IoEye } from "react-icons/io5"; // Icons for show/hide password
import { signInWithPopup } from 'firebase/auth'; // Firebase Google login
import axios from 'axios';
import { toast } from 'react-toastify';

import Logo from "../assets/logo.png";
import google from '../assets/google.png';
import Loading from '../component/Loading';

import { authDataContext } from '../context/AuthContext'; // Server URL
import { userDataContext } from '../context/UserContext'; // User state context
import { auth, provider } from '../utils/Firebase'; // Firebase auth

function Registration() {
  // Show/hide password toggle
  const [show, setShow] = useState(false);

  // Context: backend URL and user state management
  const { serverUrl } = useContext(authDataContext);
  const { getCurrentUser } = useContext(userDataContext);

  // Local state for form input fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Loading state for button
  const [loading, setLoading] = useState(false);

  // For navigation after successful signup
  const navigate = useNavigate();

  // Handle form-based signup
  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    setLoading(true);   // Show loading animation on button

    try {
      // Send registration data to backend
      const result = await axios.post(
        `${serverUrl}/api/auth/registration`,
        { name, email, password },
        { withCredentials: true }
      );

      // Update user context and navigate to homepage
      getCurrentUser();
      navigate("/");
      toast.success("User Registration Successful");
      console.log(result.data);
    } catch (error) {
      console.error(error);
      toast.error("User Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  // Handle Google-based signup
  const googleSignup = async () => {
    try {
      // Firebase popup login
      const response = await signInWithPopup(auth, provider);
      const user = response.user;

      // Extract name and email from Google account
      const name = user.displayName;
      const email = user.email;

      // Send to backend
      const result = await axios.post(
        `${serverUrl}/api/auth/googlelogin`,
        { name, email },
        { withCredentials: true }
      );

      // Update state and navigate
      console.log(result.data);
      getCurrentUser();
      navigate("/");
      toast.success("User Registration Successful");
    } catch (error) {
      console.error(error);
      toast.error("User Registration Failed");
    }
  };

  return (
    <div className='w-full h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex flex-col items-center'>

      {/* Top Navbar with Logo */}
      <div className='w-full h-[80px] flex items-center justify-start px-8 gap-3 cursor-pointer' onClick={() => navigate("/")}>
        <img className='w-10' src={Logo} alt="Logo" />
        <h1 className='text-2xl font-semibold'>SinghJii-store</h1>
      </div>

      {/* Header */}
      <div className='text-center mt-8'>
        <h2 className='text-3xl font-bold'>Registration Page</h2>
        <p className='text-lg font-semibold text-gray-300'>Welcome to SinghJii-store, Place your order</p>
      </div>

      {/* Form Container */}
      <div className='max-w-[600px] w-[90%] mt-8 bg-gray-900 border border-gray-700 rounded-xl shadow-lg p-8'>
        <form onSubmit={handleSignup} className='flex flex-col gap-6'>

          {/* Google Signup Button */}
          <div className='w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-3 py-3 cursor-pointer' onClick={googleSignup}>
            <img src={google} alt="Google" className='w-5' />
            Registration with Google
          </div>

          {/* Divider */}
          <div className='flex items-center justify-center gap-4'>
            <div className='flex-1 h-px bg-gray-600'></div>
            <span className='text-sm text-gray-400'>OR</span>
            <div className='flex-1 h-px bg-gray-600'></div>
          </div>

          {/* Username Field */}
          <input
            type="text"
            placeholder='UserName'
            className='w-full h-12 px-4 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Email Field */}
          <input
            type="email"
            placeholder='Email'
            className='w-full h-12 px-4 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password Field with show/hide toggle */}
          <div className='relative'>
            <input
              type={show ? "text" : "password"}
              placeholder='Password'
              className='w-full h-12 px-4 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {show ? (
              <IoEye className='absolute top-3 right-3 w-6 h-6 text-gray-300 cursor-pointer' onClick={() => setShow(!show)} />
            ) : (
              <IoEyeOutline className='absolute top-3 right-3 w-6 h-6 text-gray-300 cursor-pointer' onClick={() => setShow(!show)} />
            )}
          </div>

          {/* Submit Button */}
          <button type='submit' className='w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold flex items-center justify-center transition duration-200'>
            {loading ? <Loading /> : "Create Account"}
          </button>

          {/* Link to Login */}
          <p className='text-center text-sm text-gray-300'>
            You have any account?{" "}
            <span className='text-blue-400 hover:underline cursor-pointer' onClick={() => navigate("/login")}>
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Registration;
