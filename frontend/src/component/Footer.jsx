import React from 'react';
// Importing the site logo
import logo from "../assets/logo.png";

function Footer() {
  return (
    // Main footer container
    <div className='w-[100%] md:h-[36vh] h-[21vh] mb-[77px] md:mb-[0px]'>

      {/* Main content area of the footer */}
      <div className='w-[100%] md:h-[30vh] h-[15vh] bg-[#dbfcfcec] flex items-center justify-center md:px-[50px] px-[5px]'>

        {/* === Column 1: Brand Information === */}
        <div className='md:w-[30%] w-[35%] h-[100%] flex items-start justify-center flex-col gap-[5px]'>

          {/* Logo and Brand Name */}
          <div className='flex items-start justify-start gap-[5px] mt-[10px] md:mt-[40px]'>
            <img
              src={logo}
              alt="SinghJii Logo"
              className='md:w-[40px] md:h-[40px] w-[30px] h-[30px]'
            />
            <p className='text-[19px] md:text-[20px] text-[black]'>SinghJii</p>
          </div>

          {/* Brand description (shown on large screens) */}
          <p className='text-[15px] text-[#1e2223] hidden md:block'>
            SinghJii is your all-in-one online shopping destination, offering top-quality products,
            unbeatable deals, and fast delivery—all backed by trusted service designed to make your
            life easier every day.
          </p>

          {/* Short slogan (shown on mobile screens only) */}
          <p className='text-[15px] text-[#1e2223] flex md:hidden'>
            Fast. Easy. Reliable. SinghJii Shopping
          </p>
        </div>

        {/* === Column 2: Company Links === */}
        <div className='md:w-[25%] w-[30%] h-[100%] flex items-center justify-center flex-col text-center'>
          <div className='flex items-center justify-center gap-[5px] mt-[10px] md:mt-[40px]'>
            <p className='text-[19px] md:text-[20px] text-[#1e2223] font-sans'>COMPANY</p>
          </div>

          <ul>
            {/* Show these links only on desktop */}
            <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer'>Home</li>

            {/* Always visible */}
            <li className='text-[15px] text-[#1e2223] cursor-pointer'>About us</li>

            {/* Desktop only */}
            <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer'>Delivery</li>

            {/* Always visible */}
            <li className='text-[15px] text-[#1e2223] cursor-pointer'>Privacy Policy</li>
          </ul>
        </div>

        {/* === Column 3: Contact Information === */}
        <div className='md:w-[25%] w-[40%] h-[100%] flex items-center justify-center flex-col text-center'>
          <div className='flex items-center justify-center gap-[5px] mt-[10px] md:mt-[40px]'>
            <p className='text-[19px] md:text-[20px] text-[#1e2223] font-sans'>GET IN TOUCH</p>
          </div>

          <ul>
            {/* Always visible phone and email */}
            <li className='text-[15px] text-[#1e2223]'>+91-9876543210</li>
            <li className='text-[15px] text-[#1e2223]'>contact@singhJii.com</li>

            {/* Extra contact info visible on desktop only */}
            <li className='text-[15px] text-[#1e2223] hidden md:block'>+1-123-456-7890</li>
            <li className='text-[15px] text-[#1e2223] hidden md:block'>admin@singhjii.com</li>
          </ul>
        </div>

      </div>

      {/* Separator line */}
      <div className='w-[100%] h-[1px] bg-slate-400'></div>

      {/* Footer bottom bar with copyright */}
      <div className='w-[100%] h-[5vh] bg-[#dbfcfcec] flex items-center justify-center'>
        Copyright 2025 @ SinghJii.com - All Rights Reserved
      </div>

    </div>
  );
}

export default Footer;
