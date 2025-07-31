// Import necessary dependencies
import React, { useContext, useEffect, useState } from 'react'
import Nav from '../component/Nav'                          // Navigation bar
import Sidebar from '../component/Sidebar'                  // Sidebar for admin links
import { authDataContext } from '../context/AuthContext'    // Context to access server URL
import axios from 'axios'                                   // For HTTP requests

// Main Lists component
function Lists() {
  // Local state to store all product items fetched from backend
  let [list, setList] = useState([])

  // Access server URL from context
  let { serverUrl } = useContext(authDataContext)

  // Fetch product list from backend API
  const fetchList = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/product/list")
      setList(result.data)              // Store fetched list in state
      console.log(result.data)
    } catch (error) {
      console.log(error)               // Log error if request fails
    }
  }

  // Remove product from backend by its id and refresh the list
  const removeList = async (id) => {
    try {
      let result = await axios.post(`${serverUrl}/api/product/remove/${id}`, {}, { withCredentials: true })
      if (result.data) {
        fetchList()                    // Refresh the list after removal
      } else {
        console.log("Failed to remove Product")
      }
    } catch (error) {
      console.log(error)              // Log error if removal fails
    }
  }

  // Call fetchList() on component mount to load products
  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='w-full min-h-screen bg-black text-white'>
      <Nav /> {/* Top navbar */}
      <div className='flex'>
        <Sidebar /> {/* Admin sidebar navigation */}

        {/* Main Content */}
        <div className='w-full md:ml-[240px] lg:ml-[320px] mt-[70px] px-4 sm:px-10 py-10 flex flex-col gap-6'>
          
          {/* Heading */}
          <h2 className='text-2xl md:text-4xl font-bold text-gray-100 mb-4'>All Listed Products</h2>

          {/* Conditionally render products if available */}
          {list?.length > 0 ? (
            list.map((item, index) => (
              <div
                key={index}
                className='w-full max-w-5xl bg-gray-900 border border-gray-700 rounded-xl flex items-center gap-4 md:gap-8 p-4 shadow-md hover:shadow-xl transition-all'
              >
                {/* Product Image */}
                <img
                  src={item.image1}
                  alt={item.name}
                  className='w-[80px] md:w-[120px] h-[80px] md:h-[100px] object-cover rounded-lg border border-gray-600'
                />

                {/* Product Info */}
                <div className='flex-1 flex flex-col gap-1 text-gray-200'>
                  <p className='text-lg md:text-xl font-semibold text-[#00ffff]'>{item.name}</p>
                  <p className='text-sm md:text-base text-[#90ee90]'>{item.category}</p>
                  <p className='text-sm md:text-base text-[#90ee90]'>₹{item.price}</p>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => removeList(item._id)}
                  className='w-8 h-8 flex items-center justify-center rounded-full text-black bg-[#ff4d6d] hover:bg-[#ff3366] transition-all'
                  title="Remove product"
                >
                  &times; {/* "×" symbol (multiply) */}
                </button>
              </div>
            ))
          ) : (
            <div className='text-gray-300 text-lg'>No products available.</div> // Fallback if list is empty
          )}
        </div>
      </div>
    </div>
  )
}

// Export component
export default Lists
