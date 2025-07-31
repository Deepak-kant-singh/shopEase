import React, { useContext, useEffect, useState } from 'react'

// Importing context to access global product data
import { shopDataContext } from '../context/ShopContext'

// Reusable title and product card components
import Title from './Title'
import Card from './Card'

function RelatedProduct({ category, subCategory, currentProductId }) {
  // Accessing product list from context
  const { products } = useContext(shopDataContext)

  // Local state to store filtered related products
  const [related, setRelated] = useState([])

  // Whenever any of these dependencies change, this hook runs
  useEffect(() => {
    // Only run filtering if products are loaded
    if (products.length > 0) {
      let productsCopy = products.slice() // make a copy to avoid mutating original

      // Filter products that match the same category
      productsCopy = productsCopy.filter((item) => category === item.category)

      // Further filter by sub-category
      productsCopy = productsCopy.filter((item) => subCategory === item.subCategory)

      // Remove the current product from the list (so we don't recommend the same item)
      productsCopy = productsCopy.filter((item) => currentProductId !== item._id)

      // Take first 4 matching items
      setRelated(productsCopy.slice(0, 4))
    }
  }, [products, category, subCategory, currentProductId]) // dependencies that trigger useEffect

  return (
    <div className='my-[130px] md:my-[40px] md:px-[60px]'>
      
      {/* Title Section */}
      <div className='ml-[20px] lg:ml-[80px]'>
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
      </div>

      {/* Related Products Display */}
      <div className='w-[100%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px]'>
        {
          // Loop through related products and display each using Card component
          related.map((item, index) => (
            <Card
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image1}
            />
          ))
        }
      </div>
    </div>
  )
}

export default RelatedProduct
