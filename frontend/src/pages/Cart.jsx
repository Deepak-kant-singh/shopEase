import React, { useContext, useEffect, useState } from 'react'

// Reusable title component for displaying headings
import Title from '../component/Title'

// Accessing global shop context (products, cart, etc.)
import { shopDataContext } from '../context/ShopContext'

// Navigation hook to redirect user
import { useNavigate } from 'react-router-dom'

// Delete icon from react-icons
import { RiDeleteBin6Line } from "react-icons/ri";

// Reusable component for calculating and displaying cart totals
import CartTotal from '../component/CartTotal';

function Cart() {
  // Destructuring useful data from context
  const { products, currency, cartItem, updateQuantity } = useContext(shopDataContext)

  // Local state to keep processed cart data in array form
  const [cartData, setCartData] = useState([])

  // For page navigation (e.g., redirect to place order page)
  const navigate = useNavigate()

  // Whenever cartItem (object form) changes, convert it to a flat array
  useEffect(() => {
    const tempData = []

    // Loop through the outer object
    for (const productId in cartItem) {
      // Loop through size-wise quantity inside each product
      for (const size in cartItem[productId]) {
        if (cartItem[productId][size] > 0) {
          tempData.push({
            _id: productId,
            size: size,
            quantity: cartItem[productId][size],
          })
        }
      }
    }

    // Set the flat array to state
    setCartData(tempData)
  }, [cartItem])

  return (
    <div className='w-[99vw] min-h-[100vh] p-[20px] overflow-hidden bg-gradient-to-l from-[#141414] to-[#0c2025]'>

      {/* Page heading */}
      <div className='h-[8%] w-[100%] text-center mt-[80px]'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {/* List of cart products */}
      <div className='w-[100%] h-[92%] flex flex-wrap gap-[20px]'>
        {
          cartData.map((item, index) => {
            // Find product details by ID
            const productData = products.find((product) => product._id === item._id)

            // Return single product UI
            return (
              <div key={index} className='w-[100%] h-[10%] border-t border-b'>

                {/* Product row */}
                <div className='w-[100%] h-[80%] flex items-start gap-6 bg-[#51808048] py-[10px] px-[20px] rounded-2xl relative'>

                  {/* Product image */}
                  <img
                    className='w-[100px] h-[100px] rounded-md'
                    src={productData.image1}
                    alt=""
                  />

                  {/* Product details (name, price, size) */}
                  <div className='flex items-start justify-center flex-col gap-[10px]'>
                    <p className='md:text-[25px] text-[20px] text-[#f3f9fc]'>{productData.name}</p>
                    <div className='flex items-center gap-[20px]'>
                      <p className='text-[20px] text-[#aaf4e7]'>{currency} {productData.price}</p>
                      <p className='w-[40px] h-[40px] text-[16px] text-white bg-[#518080b4] rounded-md mt-[5px] flex items-center justify-center border-[1px] border-[#9ff9f9]'>
                        {item.size}
                      </p>
                    </div>
                  </div>

                  {/* Quantity input field */}
                  <input
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                    className='md:max-w-20 max-w-10 md:px-2 md:py-2 py-[5px] px-[10px] text-white text-[18px] font-semibold bg-[#518080b4] absolute md:top-[40%] top-[46%] left-[75%] md:left-[50%] border-[1px] border-[#9ff9f9] rounded-md'
                    onChange={(e) =>
                      (e.target.value === ' ' || e.target.value === '0')
                        ? null
                        : updateQuantity(item._id, item.size, Number(e.target.value))
                    }
                  />

                  {/* Delete icon to remove item from cart */}
                  <RiDeleteBin6Line
                    className='text-[#9ff9f9] w-[25px] h-[25px] absolute top-[50%] md:top-[40%] md:right-[5%] right-1'
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                  />
                </div>
              </div>
            )
          })
        }
      </div>

      {/* Cart total and checkout button */}
      <div className='flex justify-start items-end my-20'>
        <div className='w-full sm:w-[450px]'>

          {/* Total price and delivery fee component */}
          <CartTotal />

          {/* Proceed to Checkout button */}
          <button
            className='text-[18px] hover:bg-slate-500 cursor-pointer bg-[#51808048] py-[10px] px-[50px] rounded-2xl text-white flex items-center justify-center gap-[20px] border-[1px] border-[#80808049] ml-[30px] mt-[20px]'
            onClick={() => {
              if (cartData.length > 0) {
                navigate("/placeorder")
              } else {
                console.log("Your cart is empty!")
              }
            }}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
