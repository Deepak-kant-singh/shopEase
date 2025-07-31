import React, { useContext } from 'react';
// Import the global context to get currency info
import { shopDataContext } from '../context/ShopContext';
// Import useNavigate hook to handle route change
import { useNavigate } from 'react-router-dom';

function Card({ name, image, id, price }) {
  // Get currency symbol from context (like ₹ or $)
  const { currency } = useContext(shopDataContext);

  // Hook to navigate to product detail page when clicked
  const navigate = useNavigate();

  return (
    // Main card container
    <div
      className='w-[300px] max-w-[90%] h-[400px] bg-[#ffffff0a] backdrop:blur-lg rounded-lg hover:scale-[102%] 
                 flex items-start justify-start flex-col p-[10px] cursor-pointer border-[1px] border-[#80808049]'
      onClick={() => navigate(`/productdetail/${id}`)} // Navigate to product detail page when card is clicked
    >

      {/* Product image */}
      <img
        src={image}
        alt=""
        className='w-[100%] h-[80%] rounded-sm object-cover'
      />

      {/* Product name */}
      <div className='text-[#c3f6fa] text-[18px] py-[10px]'>
        {name}
      </div>

      {/* Product price with currency */}
      <div className='text-[#f3fafa] text-[14px]'>
        {currency} {price}
      </div>

    </div>
  );
}

export default Card;
