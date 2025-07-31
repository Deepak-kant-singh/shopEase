import React, { useContext } from 'react';
// Importing context to access cart data, currency, and delivery fee
import { shopDataContext } from '../context/ShopContext';
// Title component used for heading
import Title from './Title';

function CartTotal() {
  // Destructure currency symbol, delivery fee, and cart total function from context
  const { currency, delivery_fee, getCartAmount } = useContext(shopDataContext);

  return (
    <div className='w-full lg:ml-[30px]'>
      
      {/* Title Section */}
      <div className='text-xl py-[10px]'>
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      {/* Cart totals box */}
      <div className='flex flex-col gap-2 mt-2 text-sm p-[30px] border-[2px] border-[#4d8890]'>

        {/* Subtotal row */}
        <div className='flex justify-between text-white text-[18px] p-[10px]'>
          <p>Subtotal</p>
          <p>{currency} {getCartAmount()}.00</p>
        </div>

        <hr />

        {/* Shipping fee row */}
        <div className='flex justify-between text-white text-[18px] p-[10px]'>
          <p>Shipping Fee</p>
          <p>{currency} {delivery_fee}</p>
        </div>

        <hr />

        {/* Final total row */}
        <div className='flex justify-between text-white text-[18px] p-[10px]'>
          <b>Total</b>
          {/* If cart is empty, total = 0, else subtotal + shipping fee */}
          <b>{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}</b>
        </div>

      </div>

    </div>
  );
}

export default CartTotal;
