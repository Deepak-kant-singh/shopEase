import React, { useContext, useEffect, useState } from 'react';
// Importing Title and Card components
import Title from './Title';
// Importing product data from context
import { shopDataContext } from '../context/ShopContext';
// Importing Card component to display product cards
import Card from './Card';

function BestSeller() {
  // Getting product list from global context
  const { products } = useContext(shopDataContext);

  // State to store only best seller products
  const [bestSeller, setBestSeller] = useState([]);

  // Run this code whenever the product list changes
  useEffect(() => {
    // Filter out products where "bestseller" property is true
    const filterProduct = products.filter((item) => item.bestseller);

    // Take only the first 4 best sellers and store in state
    setBestSeller(filterProduct.slice(0, 4));
  }, [products]); // Re-run this effect when "products" changes

  return (
    <div>
      {/* Section Title */}
      <div className='h-[8%] w-[100%] text-center mt-[50px]'>
        <Title text1={"BEST"} text2={"SELLER"} />
        <p className='w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100'>
          Tried, Tested, Loved – Discover Our All-Time Best Sellers.
        </p>
      </div>

      {/* Display best seller product cards */}
      <div className='w-[100%] h-[50%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px]'>
        {
          bestSeller.map((item, index) => (
            <Card
              key={index}           // Unique key for each card
              name={item.name}      // Product name
              id={item._id}         // Product ID
              price={item.price}    // Product price
              image={item.image1}   // Product image
            />
          ))
        }
      </div>
    </div>
  );
}

export default BestSeller;
