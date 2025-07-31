import React from 'react'

// Reusable title component to display headings like "ABOUT US"
import Title from '../component/Title'

// About page image
import about from '../assets/about.jpg'

// Reusable newsletter subscription box
import NewLetterBox from '../component/NewLetterBox'

function About() {
  return (
    <div className='w-[99vw] min-h-[100vh] flex items-center justify-center flex-col bg-gradient-to-l from-[#141414] to-[#0c2025] gap-[50px] pt-[80px]'>

      {/* Main title for the About page */}
      <Title text1={'ABOUT'} text2={'US'} />

      {/* About Section with image and text */}
      <div className='w-[100%] flex items-center justify-center flex-col lg:flex-row'>

        {/* Left: Image Section */}
        <div className='lg:w-[50%] w-[100%] flex items-center justify-center'>
          <img
            src={about}
            alt="About Us"
            className='lg:w-[65%] w-[80%] shadow-md shadow-black rounded-sm'
          />
        </div>

        {/* Right: About text description */}
        <div className='lg:w-[50%] w-[80%] flex items-start justify-center gap-[20px] flex-col mt-[20px] lg:mt-[0px]'>

          {/* Intro paragraph about SinghJii */}
          <p className='lg:w-[80%] w-[100%] text-white md:text-[16px] text-[13px]'>
            SinghJii born for smart, seamless shopping—created to deliver quality products,
            trending styles, and everyday essentials in one place. With reliable service, fast delivery,
            and great value, SinghJii makes your online shopping experience simple, satisfying, and stress-free.
          </p>

          {/* Second paragraph elaborating on the brand values */}
          <p className='lg:w-[80%] w-[100%] text-white md:text-[16px] text-[13px]'>
            Modern shoppers—combining style, convenience, and affordability. Whether it’s fashion,
            essentials, or trends, we bring everything you need to one trusted platform with fast delivery,
            easy returns, and a customer-first shopping experience you’ll love.
          </p>

          {/* Subheading: Our Mission */}
          <p className='lg:w-[80%] w-[100%] text-[15px] text-white lg:text-[18px] mt-[10px] font-bold'>
            Our Mission
          </p>

          {/* Mission statement */}
          <p className='lg:w-[80%] w-[100%] text-white md:text-[16px] text-[13px]'>
            Our mission is to redefine online shopping by delivering quality, affordability, and convenience.
            SinghJii connects customers with trusted products and brands, offering a seamless,
            customer-focused experience that saves time, adds value, and fits every lifestyle and need.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className='w-[100%] flex items-center justify-center flex-col gap-[10px]'>

        {/* Title */}
        <Title text1={'WHY'} text2={'CHOOSE US'} />

        {/* Three columns showing core values or selling points */}
        <div className='w-[80%] flex items-center justify-center lg:flex-row flex-col py-[40px]'>

          {/* Card 1: Quality Assurance */}
          <div className='lg:w-[33%] w-[90%] h-[250px] border-[1px] border-gray-100 flex items-center justify-center gap-[20px] flex-col px-[40px] py-[10px] text-white backdrop-blur-[2px] bg-[#ffffff0b]'>
            <b className='text-[20px] font-semibold text-[#bff1f9]'>Quality Assurance</b>
            <p>We guarantee quality through strict checks, reliable sourcing, and a commitment to customer satisfaction always.</p>
          </div>

          {/* Card 2: Convenience */}
          <div className='lg:w-[33%] w-[90%] h-[250px] border-[1px] border-gray-100 flex items-center justify-center gap-[20px] flex-col px-[40px] py-[10px] text-white backdrop-blur-[2px] bg-[#ffffff0b]'>
            <b className='text-[20px] font-semibold text-[#bff1f9]'>Convenience</b>
            <p>Shop easily with fast delivery, simple navigation, secure checkout, and everything you need in one place.</p>
          </div>

          {/* Card 3: Customer Service */}
          <div className='lg:w-[33%] w-[90%] h-[250px] border-[1px] border-gray-100 flex items-center justify-center gap-[20px] flex-col px-[40px] py-[10px] text-white backdrop-blur-[2px] bg-[#ffffff0b]'>
            <b className='text-[20px] font-semibold text-[#bff1f9]'>Exceptional Customer Service</b>
            <p>Our dedicated support team ensures quick responses, helpful solutions, and a smooth shopping experience every time.</p>
          </div>
        </div>
      </div>

      {/* Newsletter subscription box at the bottom */}
      <NewLetterBox />
    </div>
  )
}

export default About
