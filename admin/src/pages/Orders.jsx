// React and required imports
import React, { useState, useContext, useEffect } from 'react';
import Nav from '../component/Nav';                           // Navigation bar
import Sidebar from '../component/Sidebar';                   // Sidebar component
import { authDataContext } from '../context/AuthContext';     // Server URL from context
import axios from 'axios';                                    // HTTP requests
import { SiEbox } from "react-icons/si";                      // Icon for order box

function Orders() {
  // Local state to store orders
  let [orders, setOrders] = useState([]);

  // Access the server URL from context
  let { serverUrl } = useContext(authDataContext);

  // Fetch all orders from the backend
  const fetchAllOrders = async () => {
    try {
      const result = await axios.post(
        serverUrl + '/api/order/list',   // API endpoint
        {},
        { withCredentials: true }       // Send cookies/session
      );
      setOrders(result.data.reverse()); // Reverse to show newest first
    } catch (error) {
      console.log(error);               // Log error if fetch fails
    }
  };

  // Handler to update order status
  const statusHandler = async (e, orderId) => {
    try {
      const result = await axios.post(
        serverUrl + '/api/order/status',    // Status update endpoint
        { orderId, status: e.target.value }, // Payload with new status
        { withCredentials: true }           // Send cookies/session
      );
      if (result.data) {
        await fetchAllOrders();             // Refresh order list
      }
    } catch (error) {
      console.log(error);                   // Log if status update fails
    }
  };

  // Fetch orders on component mount
  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='w-[99vw] min-h-[100vh] bg-black text-white'>
      <Nav /> {/* Top navigation */}

      <div className='w-full h-full flex items-center lg:justify-start justify-center'>
        <Sidebar /> {/* Sidebar for navigation */}

        {/* Orders List Section */}
        <div className='lg:w-[85%] md:w-[70%] h-full lg:ml-[310px] md:ml-[250px] mt-[70px] flex flex-col gap-8 overflow-x-hidden py-12 ml-[100px]'>
          <h2 className='text-2xl md:text-4xl font-bold text-white mb-6'>All Orders List</h2>

          {/* Iterate through each order */}
          {orders.map((order, index) => (
            <div
              key={index}
              className='w-[90%] bg-[#1a1a1a] rounded-xl flex lg:items-center items-start justify-between flex-col lg:flex-row p-4 md:px-6 gap-6 border border-gray-700 shadow-md hover:border-neon-green'
            >
              {/* Order Icon */}
              <SiEbox className='w-[60px] h-[60px] text-black p-[5px] rounded-lg bg-[#00ffc8]' />

              {/* Product Names, Quantities, Sizes */}
              <div>
                <div className='flex flex-col gap-1 text-sm text-[#00ffc8]'>
                  {order.items.map((item, index) => (
                    <p key={index}>
                      {item.name.toUpperCase()} * {item.quantity} <span>{item.size}</span>
                      {index !== order.items.length - 1 && ','}
                    </p>
                  ))}
                </div>

                {/* Shipping Address */}
                <div className='text-sm text-gray-300 mt-2'>
                  <p>{order.address.firstName + " " + order.address.lastName}</p>
                  <p>{order.address.street + ", "}</p>
                  <p>
                    {order.address.city + ", " + order.address.state + ", " +
                      order.address.country + ", " + order.address.pinCode}
                  </p>
                  <p>{order.address.phone}</p>
                </div>
              </div>

              {/* Order Summary Info */}
              <div className='text-sm text-gray-300'>
                <p>Items: {order.items.length}</p>
                <p>Method: {order.paymentMethod}</p>
                <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                <p className='text-lg text-white font-bold mt-2'>₹ {order.amount}</p>
              </div>

              {/* Order Status Dropdown */}
              <select
                value={order.status}
                className='px-3 py-2 bg-[#121212] text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00ffc8]'
                onChange={(e) => statusHandler(e, order._id)}
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Orders;
