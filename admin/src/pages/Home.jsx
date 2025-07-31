// Import required dependencies and hooks
import React, { useState, useContext, useEffect } from 'react';
import Nav from '../component/Nav';                  // Top navigation bar
import Sidebar from '../component/Sidebar';          // Left sidebar navigation
import { authDataContext } from '../context/AuthContext'; // Global context for server URL
import axios from 'axios';                           // HTTP request library

// Main Home component
function Home() {
  // Local state to store counts
  const [totalProducts, setTotalProducts] = useState(0); // Total number of products
  const [totalOrders, setTotalOrders] = useState(0);     // Total number of orders

  // Get server URL from context
  const { serverUrl } = useContext(authDataContext);

  // Function to fetch product and order counts
  const fetchCounts = async () => {
    try {
      // Fetch product list
      const products = await axios.get(
        `${serverUrl}/api/product/list`,
        {},
        { withCredentials: true }
      );
      setTotalProducts(products.data.length); // Update product count

      // Fetch order list (uses POST instead of GET — depends on backend implementation)
      const orders = await axios.post(
        `${serverUrl}/api/order/list`,
        {},
        { withCredentials: true }
      );
      setTotalOrders(orders.data.length); // Update order count
    } catch (err) {
      console.error('Failed to fetch counts', err); // Error handling
    }
  };

  // Call fetchCounts on component mount
  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] text-gray-800 dark:bg-gradient-to-br dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a] dark:text-gray-100 transition-all duration-500">
      
      {/* Top Navbar and Sidebar */}
      <Nav />
      <Sidebar />

      {/* Main Content Area */}
      <div className="md:ml-[25%] w-full md:w-[75%] min-h-screen flex flex-col items-center justify-start px-4 md:px-10 py-20 gap-12">
        
        {/* Page Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-blue-500 dark:text-blue-400">Admin Panel</h1>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
          
          {/* Product Count Card */}
          <div className="w-full h-[260px] bg-white dark:bg-[#1e293b] rounded-2xl border border-gray-300 dark:border-gray-700 shadow-lg p-8 flex flex-col justify-center items-center text-center transition-all duration-300 hover:scale-[1.02]">
            <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-300 mb-4">
              Total No. of Products
            </h2>
            <span className="px-8 py-4 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded-xl text-2xl font-bold shadow-sm">
              {totalProducts}
            </span>
          </div>

          {/* Order Count Card */}
          <div className="w-full h-[260px] bg-white dark:bg-[#1e293b] rounded-2xl border border-gray-300 dark:border-gray-700 shadow-lg p-8 flex flex-col justify-center items-center text-center transition-all duration-300 hover:scale-[1.02]">
            <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-300 mb-4">
              Total No. of Orders
            </h2>
            <span className="px-8 py-4 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded-xl text-2xl font-bold shadow-sm">
              {totalOrders}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}

// Export the component
export default Home;
