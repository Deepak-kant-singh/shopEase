import React from 'react';
// Importing the circle icon from react-icons for slide indicators
import { FaCircle } from "react-icons/fa";

// Hero component takes 3 props:
// heroData – text content for the hero section
// heroCount – the currently active slide index
// setHeroCount – function to change the active slide
function Hero({ heroData, heroCount, setHeroCount }) {
  return (
    // Container for the Hero section – 40% width of its parent, full height, relative for absolutely positioned children
    <div className='w-[40%] h-[100%] relative'>

      {/* Text block displayed on top of the background image */}
      <div className='absolute text-[#88d9ee] text-[20px] md:text-[40px] lg:text-[55px] md:left-[10%] md:top-[90px] lg:top-[130px] left-[10%] top-[10px]'>
        {/* First line of hero text */}
        <p>{heroData.text1}</p>
        {/* Second line of hero text */}
        <p>{heroData.text2}</p>
      </div>

      {/* Slide indicator (dot buttons) – positioned absolutely at bottom left of the Hero section */}
      <div className='absolute md:top-[400px] lg:top-[500px] top-[160px] left-[10%] flex items-center justify-center gap-[10px]'>

        {/* Circle 1 – becomes orange if heroCount === 0 */}
        <FaCircle
          className={`w-[14px] ${heroCount === 0 ? "fill-orange-400" : "fill-white"}`}
          onClick={() => setHeroCount(0)} // Set current slide to 0 when clicked
        />

        {/* Circle 2 – becomes orange if heroCount === 1 */}
        <FaCircle
          className={`w-[14px] ${heroCount === 1 ? "fill-orange-400" : "fill-white"}`}
          onClick={() => setHeroCount(1)} // Set current slide to 1
        />

        {/* Circle 3 – becomes orange if heroCount === 2 */}
        <FaCircle
          className={`w-[14px] ${heroCount === 2 ? "fill-orange-400" : "fill-white"}`}
          onClick={() => setHeroCount(2)} // Set current slide to 2
        />

        {/* Circle 4 – becomes orange if heroCount === 3 */}
        <FaCircle
          className={`w-[14px] ${heroCount === 3 ? "fill-orange-400" : "fill-white"}`}
          onClick={() => setHeroCount(3)} // Set current slide to 3
        />
      </div>

    </div>
  );
}

export default Hero;
