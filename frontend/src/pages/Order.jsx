// Importing necessary hooks and modules
import React, { useContext, useEffect, useState } from 'react'

// Reusable Title component (likely used for section headings)
import Title from '../component/Title'

// Importing data context for currency info (like ₹ or $)
import { shopDataContext } from '../context/ShopContext'

// Importing context to get the backend server URL
import { authDataContext } from '../context/authContext'

// Axios for making HTTP requests to backend
import axios from 'axios'

function Order() {
    // State to store all orders' individual items
    let [orderData, setOrderData] = useState([])

    // Getting currency symbol from context
    let { currency } = useContext(shopDataContext)

    // Getting backend server URL from context
    let { serverUrl } = useContext(authDataContext)

    // Function to load all orders of the currently logged-in user
    const loadOrderData = async () => {
        try {
            // Calling API to get orders of the current user
            const result = await axios.post(serverUrl + '/api/order/userorder', {}, { withCredentials: true })

            if (result.data) {
                // Temporary array to hold individual items from all orders
                let allOrdersItem = []

                // Loop through each order
                result.data.map((order) => {
                    // Loop through each item inside the order
                    order.items.map((item) => {
                        // Add extra order-level details to each item
                        item['status'] = order.status
                        item['payment'] = order.payment
                        item['paymentMethod'] = order.paymentMethod
                        item['date'] = order.date

                        // Push the item to final array
                        allOrdersItem.push(item)
                    })
                })

                // Reverse so latest orders come first and update state
                setOrderData(allOrdersItem.reverse())
            }
        } catch (error) {
            console.log(error) // Log error if request fails
        }
    }

    // Call loadOrderData() only once when component mounts
    useEffect(() => {
        loadOrderData()
    }, [])

    return (
        // Full screen container with background and padding
        <div className='w-[99vw] min-h-[100vh] p-[20px] pb-[150px] overflow-hidden bg-gradient-to-l from-[#141414] to-[#0c2025]'>

            {/* Section title: MY ORDER */}
            <div className='h-[8%] w-[100%] text-center mt-[80px]'>
                <Title text1={'MY'} text2={'ORDER'} />
            </div>

            {/* Orders grid container */}
            <div className='w-[100%] h-[92%] flex flex-wrap gap-[20px]'>
                {
                    // Loop through each ordered item
                    orderData.map((item, index) => (
                        <div key={index} className='w-[100%] h-[10%] border-t border-b'>

                            {/* Order card */}
                            <div className='w-[100%] h-[80%] flex items-start gap-6 bg-[#51808048] py-[10px] px-[20px] rounded-2xl relative'>

                                {/* Product image */}
                                <img src={item.image1} alt="" className='w-[130px] h-[130px] rounded-md' />

                                {/* Product details */}
                                <div className='flex items-start justify-center flex-col gap-[5px]'>

                                    {/* Product name */}
                                    <p className='md:text-[25px] text-[20px] text-[#f3f9fc]'>{item.name}</p>

                                    {/* Price, Quantity, Size */}
                                    <div className='flex items-center gap-[8px] md:gap-[20px]'>
                                        <p className='md:text-[18px] text-[12px] text-[#aaf4e7]'>{currency} {item.price}</p>
                                        <p className='md:text-[18px] text-[12px] text-[#aaf4e7]'>Quantity: {item.quantity}</p>
                                        <p className='md:text-[18px] text-[12px] text-[#aaf4e7]'>Size: {item.size}</p>
                                    </div>

                                    {/* Order date */}
                                    <div className='flex items-center'>
                                        <p className='md:text-[18px] text-[12px] text-[#aaf4e7]'>
                                            Date:
                                            <span className='text-[#e4fbff] pl-[10px] md:text-[16px] text-[11px]'>
                                                {new Date(item.date).toDateString()}
                                            </span>
                                        </p>
                                    </div>

                                    {/* Payment method */}
                                    <div className='flex items-center'>
                                        <p className='md:text-[16px] text-[12px] text-[#aaf4e7]'>Payment Method: {item.paymentMethod}</p>
                                    </div>

                                    {/* Order status - Positioned to the right */}
                                    <div className='absolute md:left-[55%] md:top-[40%] right-[2%] top-[2%]'>
                                        <div className='flex items-center gap-[5px]'>
                                            {/* Green dot for status indicator */}
                                            <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                                            <p className='md:text-[17px] text-[10px] text-[#f3f9fc]'>{item.status}</p>
                                        </div>
                                    </div>

                                    {/* "Track Order" button - Positioned bottom-right */}
                                    <div className='absolute md:right-[5%] right-[1%] md:top-[40%] top-[70%]'>
                                        <button
                                            className='md:px-[15px] px-[5px] py-[3px] md:py-[7px] rounded-md bg-[#101919] text-[#f3f9fc] text-[12px] md:text-[16px] cursor-pointer active:bg-slate-500'
                                            onClick={loadOrderData}
                                        >
                                            Track Order
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Order
