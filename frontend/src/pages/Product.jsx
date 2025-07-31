// Importing React
import React from 'react'

// Importing custom components for latest and best-selling products
import LatestCollection from '../component/LatestCollection'
import BestSeller from '../component/BestSeller'

// Product page component
function Product() {
  return (
    // Main container with full width and height, background gradient, vertical layout
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-start flex-col py-[20px]'>

      {/* Section for displaying the latest collection */}
      <div className='w-[100%] min-h-[70px] flex items-center justify-center gap-[10px] flex-col'>
        <LatestCollection />
      </div>

      {/* Section for displaying best-selling products */}
      <div className='w-[100%] min-h-[70px] flex items-center justify-center gap-[10px] flex-col'>
        <BestSeller />
      </div>

    </div>
  )
}

export default Product
