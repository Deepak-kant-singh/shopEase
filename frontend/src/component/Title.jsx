import React from 'react'

// Reusable Title component that shows two styled texts side-by-side
function Title({ text1, text2 }) {
  return (
    <div className='inline-flex gap-2 items-center text-center mb-3 text-[35px] md:text-[40px]'>
      {/* First part of the title in light blue, second part in brighter aqua */}
      <p className='text-blue-100'>
        {text1} <span className='text-[#a5faf7]'>{text2}</span>
      </p>
    </div>
  )
}

export default Title
