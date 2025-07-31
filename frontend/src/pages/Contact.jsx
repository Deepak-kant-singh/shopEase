import React from 'react'
import Title from '../component/Title'
import contact from "../assets/contact.jpg"
import NewLetterBox from '../component/NewLetterBox'

function Contact() {
  return (
    // Main container with full width and height, centered items, gradient background
    <div className='w-[99vw] min-h-[100vh] flex items-center justify-center flex-col bg-gradient-to-l from-[#141414] to-[#0c2025] gap-[50px] pt-[80px]'>

      {/* Page title component */}
      <Title text1={'CONTACT'} text2={'US'} />

      {/* Two-column layout: image and contact details */}
      <div className='w-[100%] flex items-center justify-center flex-col lg:flex-row'>

        {/* Left: Contact image section */}
        <div className='lg:w-[50%] w-[100%] flex items-center justify-center'>
          <img
            src={contact}
            alt="Contact us"
            className='lg:w-[70%] w-[80%] shadow-md shadow-black rounded-sm'
          />
        </div>

        {/* Right: Contact information and career section */}
        <div className='lg:w-[50%] w-[80%] flex items-start justify-center gap-[20px] flex-col mt-[20px] lg:mt-[0px]'>

          {/* Our Store Heading */}
          <p className='text-white font-bold text-[15px] lg:text-[18px]'>Our Store</p>

          {/* Store address */}
          <div className='text-white md:text-[16px] text-[13px]'>
            <p>12345 Random Station</p>
            <p>Random City, State, India</p>
          </div>

          {/* Contact info */}
          <div className='text-white md:text-[16px] text-[13px]'>
            <p>Tel: +91-9876543210</p>
            <p>Email: admin@Singhjii.com</p>
          </div>

          {/* Careers section */}
          <p className='text-white font-bold text-[15px] lg:text-[18px] mt-[10px]'>
            Careers at SinghJii-store
          </p>
          <p className='text-white md:text-[16px] text-[13px]'>
            Learn more about our teams and job openings
          </p>

          {/* Explore Jobs Button */}
          <button className='px-[30px] py-[20px] text-white border rounded-md bg-transparent active:bg-slate-600'>
            Explore Jobs
          </button>
        </div>
      </div>

      {/* Newsletter signup component at the bottom */}
      <NewLetterBox />
    </div>
  )
}

export default Contact
