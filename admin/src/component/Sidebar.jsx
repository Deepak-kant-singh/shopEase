import React from 'react'
// Icon for "Add Items"
import { IoIosAddCircleOutline } from "react-icons/io";
// Icon for "List Items"
import { FaRegListAlt } from "react-icons/fa";
// Icon for "View Orders"
import { SiTicktick } from "react-icons/si";
// Hook to navigate programmatically
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  // useNavigate hook gives you navigation functions (like redirect)
  let navigate = useNavigate();

  return (
    // Sidebar container: fixed to the left, full height of the viewport
    <div className='w-[18%] min-h-[100vh] border-r-[1px] py-[60px] fixed left-0 top-0'>

      {/* Sidebar buttons wrapper */}
      <div className='flex flex-col gap-4 pt-[40px] pl-[20%] text-[15px]'>

        {/* Add Items Button */}
        <div
          className='flex items-center justify-center md:justify-start gap-3 border border-gray-200 border-r-0 px-3 py-2 cursor-pointer hover:bg-[#2c7b89]'
          onClick={() => navigate('/add')} // Navigates to /add page
        >
          <IoIosAddCircleOutline className='w-[20px] h-[20px]' />
          {/* Only visible on medium screens and above */}
          <p className='hidden md:block'>Add Items</p>
        </div>

        {/* List Items Button */}
        <div
          className='flex items-center justify-center md:justify-start gap-3 border border-gray-200 border-r-0 px-3 py-2 cursor-pointer hover:bg-[#2c7b89]'
          onClick={() => navigate('/lists')} // Navigates to /lists page
        >
          <FaRegListAlt className='w-[20px] h-[20px]' />
          <p className='hidden md:block'>List Items</p>
        </div>

        {/* View Orders Button */}
        <div
          className='flex items-center justify-center md:justify-start gap-3 border border-gray-200 border-r-0 px-3 py-2 cursor-pointer hover:bg-[#2c7b89]'
          onClick={() => navigate('/orders')} // Navigates to /orders page
        >
          <SiTicktick className='w-[20px] h-[20px]' />
          <p className='hidden md:block'>View Orders</p>
        </div>

      </div>
    </div>
  )
}

export default Sidebar
