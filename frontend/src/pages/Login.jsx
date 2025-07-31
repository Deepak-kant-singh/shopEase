// Importing necessary hooks and modules from React and other libraries
import React, { useState, useContext } from 'react'

// Importing logo image
import Logo from "../assets/logo.png"

// Hook used to navigate between routes/pages
import { useNavigate } from 'react-router-dom'

// Importing Google logo for Google login button
import google from '../assets/google.png'

// Eye icons for toggling password visibility
import { IoEyeOutline, IoEye } from "react-icons/io5";

// Context to get backend server URL
import { authDataContext } from '../context/AuthContext';

// Axios is used to make HTTP requests
import axios from 'axios';

// Firebase function to handle Google popup login
import { signInWithPopup } from 'firebase/auth';

// Firebase auth and Google provider setup
import { auth, provider } from '../utils/Firebase';

// Context to get current user data after login
import { userDataContext } from '../context/UserContext';

// Loading component to show spinner while logging in
import Loading from '../component/Loading';

// For showing toast notifications (like success/error popups)
import { toast } from 'react-toastify';

function Login() {
    // Show/hide password toggle
    const [show, setShow] = useState(false);

    // State for user's email
    const [email, setEmail] = useState("");

    // State for user's password
    const [password, setPassword] = useState("");

    // Getting server URL from context (helps avoid hardcoding it)
    const { serverUrl } = useContext(authDataContext);

    // Function to fetch and store current logged-in user info
    const { getCurrentUser } = useContext(userDataContext);

    // State to show loading spinner during login request
    const [loading, setLoading] = useState(false);

    // Hook to navigate programmatically
    const navigate = useNavigate();

    // Handles normal email/password login form submission
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent page reload on form submit
        setLoading(true); // Show loading spinner

        try {
            // Sending POST request to backend to login user
            const result = await axios.post(`${serverUrl}/api/auth/login`, { email, password }, { withCredentials: true });
            
            console.log(result.data); // Log response for debugging

            setLoading(false); // Hide loading spinner
            getCurrentUser(); // Update context with logged-in user
            navigate("/"); // Redirect to homepage
            toast.success("User Login Successful"); // Show success message
        } catch (error) {
            console.log(error); // Log any error

            setLoading(false); // Hide loading

            // Show appropriate error toast
            if (error.response && error.response.status === 401) {
                toast.error("Wrong password or email");
            } else {
                toast.error("User Login Failed");
            }
        }
    }

    // Handles login with Google account using Firebase
    const googlelogin = async () => {
        try {
            // Open Google sign-in popup
            const response = await signInWithPopup(auth, provider);

            // Extract user info from Google response
            const user = response.user;
            const name = user.displayName;
            const email = user.email;

            // Send user info to backend for Google login/register
            const result = await axios.post(`${serverUrl}/api/auth/googlelogin`, { name, email }, { withCredentials: true });

            console.log(result.data); // Log backend response

            getCurrentUser(); // Update context
            navigate("/"); // Redirect to homepage
        } catch (error) {
            console.log(error); // Log any error during Google login
        }
    }

    // Main return block - the JSX (UI) part
    return (
        <div className='w-full h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex flex-col items-center'>

            {/* Top Navbar - Logo and Store Name */}
            <div className='w-full h-[80px] flex items-center justify-start px-8 gap-3 cursor-pointer' onClick={() => navigate("/")}>
                <img className='w-10' src={Logo} alt="Logo" />
                <h1 className='text-2xl font-semibold'>SinghJii-store</h1>
            </div>

            {/* Page Title and Welcome Text */}
            <div className='text-center mt-8'>
                <h2 className='text-3xl font-bold'>Login Page</h2>
                <p className='text-xl font-bold text-gray-300'>Welcome to SinghJii-store, Place your order</p>
            </div>

            {/* Login Card/Form */}
            <div className='max-w-[600px] w-[90%] mt-8 bg-gray-900 border border-gray-700 rounded-xl shadow-lg p-8'>

                {/* Login Form */}
                <form onSubmit={handleLogin} className='flex flex-col gap-6'>

                    {/* Google Login Button */}
                    <div className='w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-3 py-3 cursor-pointer' onClick={googlelogin}>
                        <img src={google} alt="Google" className='w-5' /> Login with Google
                    </div>

                    {/* Divider line between Google and email login */}
                    <div className='flex items-center justify-center gap-4'>
                        <div className='flex-1 h-px bg-gray-600'></div>
                        <span className='text-sm text-gray-400'>OR</span>
                        <div className='flex-1 h-px bg-gray-600'></div>
                    </div>

                    {/* Email Input Field */}
                    <div className='relative'>
                        <input
                            type="email"
                            placeholder='Email'
                            className='w-full h-12 px-4 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password Input with Show/Hide Toggle */}
                    <div className='relative'>
                        <input
                            type={show ? "text" : "password"}
                            placeholder='Password'
                            className='w-full h-12 px-4 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {/* Eye icon to toggle password visibility */}
                        {show ? (
                            <IoEye className='absolute top-3 right-3 w-6 h-6 text-gray-300 cursor-pointer' onClick={() => setShow(!show)} />
                        ) : (
                            <IoEyeOutline className='absolute top-3 right-3 w-6 h-6 text-gray-300 cursor-pointer' onClick={() => setShow(!show)} />
                        )}
                    </div>

                    {/* Login Submit Button */}
                    <button
                        type="submit"
                        className='w-full h-12 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold flex items-center justify-center transition duration-200'
                    >
                        {loading ? <Loading /> : "Login"}
                    </button>

                    {/* Link to Signup Page */}
                    <p className='text-center text-sm text-gray-300'>
                        You haven't any account? <span className='text-blue-400 hover:underline cursor-pointer' onClick={() => navigate("/signup")}>Create New Account</span>
                    </p>
                </form>
            </div>
        </div>
    )
}

// Export the component so it can be used in other files
export default Login;
