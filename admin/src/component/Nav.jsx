import React, { useContext } from 'react'
// Hook to navigate programmatically
import { useNavigate } from 'react-router-dom'
// App logo image
import logo from "../assets/logo.png"
// Axios for making API requests
import axios from 'axios'
// Contexts for server URL and admin state
import { authDataContext } from '../context/AuthContext'
import { adminDataContext } from '../context/AdminContext'
// Toast for user notifications
import { toast } from 'react-toastify'

function Nav() {
  // Used to navigate between pages
  let navigate = useNavigate()

  // Get server URL from auth context
  let { serverUrl } = useContext(authDataContext)

  // Get admin context function to clear admin info after logout
  let { getAdmin } = useContext(adminDataContext)

  // Function to handle logout
  const logOut = async () => {
    try {
      // Call logout API with credentials (cookies)
      const result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })

      // Log response to console
      console.log(result.data)

      // Show toast message on success
      toast.success("LogOut Successfully")

      // Clear current admin context
      getAdmin()

      // Redirect to login page
      navigate("/login")
    } catch (error) {
      // Log error
      console.log(error)

      // Show error toast
      toast.error("LogOut Failed")
    }
  }

  return (
    // Navigation container: full width, fixed at top, styled with Tailwind
    <div className='w-[100vw] h-[70px] bg-[#dcdbdbf8] z-10 fixed top-0 flex items-center justify-between px-[30px] overflow-x-hidden shadow-md shadow-black '>

      {/* Left Section: Logo and brand title. Navigates to home on click */}
      <div className='w-[30%] flex items-center justify-start gap-[10px] cursor-pointer' onClick={() => navigate("/")}>
        <img src={logo} alt="" className='w-[30px]' />
        <h1 className='text-[25px] text-[black] font-sans'>SinghJii-store</h1>
      </div>

      {/* Right Section: Logout Button */}
      <button
        className='text-[15px] hover:border-[2px] border-[#89daea] cursor-pointer bg-[#000000ca] py-[10px] px-[20px] rounded-2xl text-white'
        onClick={logOut}
      >
        LogOut
      </button>
    </div>
  )
}

export default Nav
