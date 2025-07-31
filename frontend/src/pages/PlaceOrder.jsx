// Import React and required hooks
import React, { useContext, useState } from 'react'

// Reusable Title component (used for headings like "DELIVERY INFORMATION")
import Title from '../component/Title'

// Component that shows cart summary (total, subtotal, etc.)
import CartTotal from '../component/CartTotal'

// Importing contexts
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/authContext'

// Axios for HTTP requests
import axios from 'axios'

// Hook for programmatic navigation
import { useNavigate } from 'react-router-dom'

// Toast for success/error popup notifications
import { toast } from 'react-toastify'

// Loading spinner component
import Loading from '../component/Loading'

function PlaceOrder() {
  // State for selected payment method; default is 'cod' (cash on delivery)
  let [method, setMethod] = useState('cod')

  // React Router navigation hook
  let navigate = useNavigate()

  // Context data: cart items, setCartItem function, total calculation, etc.
  const {
    cartItem,
    setCartItem,
    getCartAmount,
    delivery_fee,
    products
  } = useContext(shopDataContext)

  // Server URL from auth context
  let { serverUrl } = useContext(authDataContext)

  // Loading state for submit button
  let [loading, setLoading] = useState(false)

  // Address form data
  let [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
    country: '',
    phone: ''
  })

  // Handle input change in form
  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFormData(data => ({ ...data, [name]: value }))
  }

  // Handle order form submission
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      let orderItems = []

      // Flatten cartItem object into an array of item info
      for (const productId in cartItem) {
        for (const size in cartItem[productId]) {
          if (cartItem[productId][size] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === productId))
            if (itemInfo) {
              itemInfo.size = size
              itemInfo.quantity = cartItem[productId][size]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      // Final order data to be sent to backend
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch (method) {
        case 'cod':
          // Submit the order to backend
          const result = await axios.post(
            serverUrl + "/api/order/placeorder",
            orderData,
            { withCredentials: true }
          )

          console.log(result.data)

          if (result.data) {
            // Clear cart, show toast, redirect to Order page
            setCartItem({})
            toast.success("Order Placed")
            navigate("/order")
            setLoading(false)
          } else {
            // Order placement failed
            toast.error("Order Placement Error")
            setLoading(false)
          }
          break

        default:
          break
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-center flex-col md:flex-row gap-[50px] relative'>

      {/* Form Section */}
      <div className='lg:w-[50%] w-[100%] h-[100%] flex items-center justify-center lg:mt-[0px] mt-[90px]'>
        <form onSubmit={onSubmitHandler} className='lg:w-[70%] w-[95%] lg:h-[70%] h-[100%]'>
          <div className='py-[10px]'>
            <Title text1={'DELIVERY'} text2={'INFORMATION'} />
          </div>

          {/* Name Fields */}
          <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
            <input
              type="text"
              placeholder='First name'
              className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434]'
              required
              onChange={onChangeHandler}
              name='firstName'
              value={formData.firstName}
            />
            <input
              type="text"
              placeholder='Last name'
              className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434]'
              required
              onChange={onChangeHandler}
              name='lastName'
              value={formData.lastName}
            />
          </div>

          {/* Email */}
          <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
            <input
              type="email"
              placeholder='Email address'
              className='w-[100%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434]'
              required
              onChange={onChangeHandler}
              name='email'
              value={formData.email}
            />
          </div>

          {/* Street */}
          <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
            <input
              type="text"
              placeholder='Street'
              className='w-[100%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434]'
              required
              onChange={onChangeHandler}
              name='street'
              value={formData.street}
            />
          </div>

          {/* City and State */}
          <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
            <input
              type="text"
              placeholder='City'
              className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434]'
              required
              onChange={onChangeHandler}
              name='city'
              value={formData.city}
            />
            <input
              type="text"
              placeholder='State'
              className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434]'
              required
              onChange={onChangeHandler}
              name='state'
              value={formData.state}
            />
          </div>

          {/* PinCode and Country */}
          <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
            <input
              type="text"
              placeholder='Pincode'
              className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434]'
              required
              onChange={onChangeHandler}
              name='pinCode'
              value={formData.pinCode}
            />
            <input
              type="text"
              placeholder='Country'
              className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434]'
              required
              onChange={onChangeHandler}
              name='country'
              value={formData.country}
            />
          </div>

          {/* Phone Number */}
          <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
            <input
              type="text"
              placeholder='Phone'
              className='w-[100%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434]'
              required
              onChange={onChangeHandler}
              name='phone'
              value={formData.phone}
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type='submit'
              className='text-[18px] active:bg-slate-500 cursor-pointer bg-[#3bcee848] py-[10px] px-[50px] rounded-2xl text-white flex items-center justify-center gap-[20px] absolute lg:right-[20%] bottom-[10%] right-[35%] border border-[#80808049] ml-[30px] mt-[20px]'
            >
              {loading ? <Loading /> : "PLACE ORDER"}
            </button>
          </div>
        </form>
      </div>

      {/* Cart + Payment Method Section */}
      <div className='lg:w-[50%] w-[100%] min-h-[100%] flex items-center justify-center gap-[30px]'>
        <div className='lg:w-[70%] w-[90%] lg:h-[70%] h-[100%] flex items-center justify-center gap-[10px] flex-col'>

          {/* Cart Total Section */}
          <CartTotal />

          {/* Payment Title */}
          <div className='py-[10px]'>
            <Title text1={'PAYMENT'} text2={'METHOD'} />
          </div>

          {/* Payment Method Selection (Currently only COD) */}
          <div className='w-[100%] h-[30vh] lg:h-[100px] flex items-start mt-[20px] lg:mt-[0px] justify-center gap-[50px]'>
            <button
              onClick={() => setMethod('cod')}
              className={`w-[200px] h-[50px] bg-gradient-to-t from-[#95b3f8] to-[white] text-[14px] px-[20px] rounded-sm text-[#332f6f] font-bold ${method === 'cod' ? 'border-[5px] border-blue-900 rounded-sm' : ''}`}
            >
              CASH ON DELIVERY
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder
