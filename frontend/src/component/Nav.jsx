import React, { useContext, useState } from 'react';

// Logo image
import logo from '../assets/logo.png';

// React icons
import { IoSearchCircleOutline, IoSearchCircleSharp } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineShoppingCart, MdContacts } from "react-icons/md";
import { HiOutlineCollection } from "react-icons/hi";
import { IoMdHome } from "react-icons/io";

// Contexts for user, authentication and shop data
import { userDataContext } from '../context/UserContext';
import { authDataContext } from '../context/authContext';
import { shopDataContext } from '../context/ShopContext';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Nav() {
  // Get user data and logout method
  const { getCurrentUser, userData, setUserData } = useContext(userDataContext);

  // Get server URL
  const { serverUrl } = useContext(authDataContext);

  // Get data related to search and cart
  const { showSearch, setShowSearch, search, setSearch, getCartCount } = useContext(shopDataContext);

  // Show/hide profile menu
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();

  // Logout user and clear user data
  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true });
      console.log("Logout successful:", result.data);

      setUserData(null);      // Clear user data
      navigate("/login");     // Go to login page
    } catch (error) {
      console.log("Logout error:", error);
    }
  }

  return (
    <div className='w-[100vw] h-[70px] bg-[#ecfafaec] z-10 fixed top-0 flex items-center justify-between px-[30px] shadow-md shadow-black'>

      {/* Left side: logo */}
      <div className='w-[20%] lg:w-[30%] flex items-center justify-start gap-[10px]'>
        <img src={logo} alt="logo" className='w-[30px]' />
        <h1 className='text-[25px] text-black font-sans'>SinghJii</h1>
      </div>

      {/* Center: menu links (desktop only) */}
      <div className='w-[50%] lg:w-[40%] hidden md:flex'>
        <ul className='flex items-center justify-center gap-[19px] text-white'>
          <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl' onClick={() => navigate("/")}>HOME</li>
          <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl' onClick={() => navigate("/collection")}>COLLECTIONS</li>
          <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl' onClick={() => navigate("/about")}>ABOUT</li>
          <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl' onClick={() => navigate("/contact")}>CONTACT</li>
        </ul>
      </div>

      {/* Right side: search, profile, cart icons */}
      <div className='w-[30%] flex items-center justify-end gap-[20px]'>

        {/* Toggle search icon */}
        {!showSearch &&
          <IoSearchCircleOutline
            className='w-[38px] h-[38px] text-black cursor-pointer'
            onClick={() => { setShowSearch(prev => !prev); navigate("/collection"); }}
          />
        }

        {showSearch &&
          <IoSearchCircleSharp
            className='w-[38px] h-[38px] text-black cursor-pointer'
            onClick={() => setShowSearch(prev => !prev)}
          />
        }

        {/* If not logged in, show default profile icon */}
        {!userData &&
          <FaCircleUser
            className='w-[29px] h-[29px] text-black cursor-pointer'
            onClick={() => setShowProfile(prev => !prev)}
          />
        }

        {/* If logged in, show user's first letter in a circle */}
        {userData &&
          <div className='w-[30px] h-[30px] bg-black text-white rounded-full flex items-center justify-center cursor-pointer'
            onClick={() => setShowProfile(prev => !prev)}>
            {userData?.name.slice(0, 1)}
          </div>
        }

        {/* Cart icon (only shown on desktop) */}
        <MdOutlineShoppingCart
          className='w-[30px] h-[30px] text-black cursor-pointer hidden md:block'
          onClick={() => navigate("/cart")}
        />

        {/* Cart item count badge (desktop only) */}
        <p className='absolute w-[18px] h-[18px] items-center justify-center bg-black px-[5px] py-[2px] text-white rounded-full text-[9px] top-[10px] right-[23px] hidden md:block'>
          {getCartCount()}
        </p>
      </div>

      {/* Search bar below nav */}
      {showSearch &&
        <div className='w-full h-[80px] bg-[#d8f6f9dd] absolute top-[100%] left-0 right-0 flex items-center justify-center'>
          <input
            type="text"
            className='lg:w-[50%] w-[80%] h-[60%] bg-[#233533] rounded-[30px] px-[50px] placeholder:text-white text-white text-[18px]'
            placeholder='Search Here'
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
      }

      {/* Profile dropdown menu */}
      {showProfile &&
        <div className='absolute w-[220px] h-[150px] bg-[#000000d7] top-[110%] right-[4%] border border-[#aaa9a9] rounded-[10px] z-10'>
          <ul className='w-full h-full flex flex-col items-start justify-around text-[17px] py-[10px] text-white'>
            {/* Show Login if user not logged in */}
            {!userData &&
              <li className='w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer'
                onClick={() => { navigate("/login"); setShowProfile(false); }}>
                Login
              </li>
            }

            {/* Show Logout if user is logged in */}
            {userData &&
              <li className='w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer'
                onClick={() => { handleLogout(); setShowProfile(false); }}>
                LogOut
              </li>
            }

            {/* Always show Orders and About options */}
            <li className='w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer'
              onClick={() => { navigate("/order"); setShowProfile(false); }}>
              Orders
            </li>

            <li className='w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer'
              onClick={() => { navigate("/about"); setShowProfile(false); }}>
              About
            </li>
          </ul>
        </div>
      }

      {/* Bottom navigation for mobile users */}
      <div className='w-full h-[90px] flex items-center justify-between px-[20px] text-[12px] fixed bottom-0 left-0 bg-[#191818] md:hidden'>
        <button className='text-white flex items-center justify-center flex-col gap-[2px]' onClick={() => navigate("/")}>
          <IoMdHome className='w-[28px] h-[28px]' /> Home
        </button>
        <button className='text-white flex items-center justify-center flex-col gap-[2px]' onClick={() => navigate("/collection")}>
          <HiOutlineCollection className='w-[28px] h-[28px]' /> Collections
        </button>
        <button className='text-white flex items-center justify-center flex-col gap-[2px]' onClick={() => navigate("/contact")}>
          <MdContacts className='w-[28px] h-[28px]' /> Contact
        </button>
        <button className='text-white flex items-center justify-center flex-col gap-[2px]' onClick={() => navigate("/cart")}>
          <MdOutlineShoppingCart className='w-[28px] h-[28px]' /> Cart
        </button>

        {/* Mobile cart item count badge */}
        <p className='absolute w-[18px] h-[18px] flex items-center justify-center bg-white px-[5px] py-[2px] text-black font-semibold rounded-full text-[9px] top-[8px] right-[18px]'>
          {getCartCount()}
        </p>
      </div>
    </div>
  );
}

export default Nav;
