import React, { useContext, useEffect, useState } from 'react';
// Importing Title component to show section heading
import Title from './Title';
// Importing product data from the global context
import { shopDataContext } from '../context/ShopContext';
// Importing Card component to show individual product cards
import Card from './Card';

function LatestCollection() {
  // Get all products from the context
  const { products } = useContext(shopDataContext);

  // This state will store only the latest 8 products
  const [latestProducts, setLatestProducts] = useState([]);

  // When product list changes, update the latestProducts with first 8 items
  useEffect(() => {
    setLatestProducts(products.slice(0, 8));
  }, [products]);

  return (
    <div>
      {/* Title and subtitle for the latest collection section */}
      <div className='h-[8%] w-[100%] text-center md:mt-[50px]'>
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className='w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100'>
          Step Into Style – New Collection Dropping This Season!
        </p>
      </div>

      {/* Product cards displayed in a flexible layout */}
      <div className='w-[100%] h-[50%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px]'>
        {
          // Go through each latest product and render a Card component for it
          latestProducts.map((item, index) => (
            <Card
              key={index}          // Key to help React identify each card
              name={item.name}     // Product name
              image={item.image1}  // Product image
              id={item._id}        // Product ID
              price={item.price}   // Product price
            />
          ))
        }
      </div>
    </div>
  );
}

export default LatestCollection;
