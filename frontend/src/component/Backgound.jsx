import React from 'react';

// Import background images
import back1 from "../assets/back1.jpg";
import back2 from "../assets/back2.jpg";
import back3 from "../assets/back3.jpg";
import back4 from "../assets/back4.jpg";

// Component to render a background image based on heroCount prop
function Backgound({ heroCount }) {
  
  // When heroCount is 0, show second background image
  if (heroCount === 0) {
    return (
      <img
        src={back2}
        alt="background 2"
        className='w-[100%] h-[100%] float-left overflow-auto object-cover'
      />
    );
  }
  
  // When heroCount is 1, show first background image
  else if (heroCount === 1) {
    return (
      <img
        src={back1}
        alt="background 1"
        className='w-[100%] h-[100%] float-left overflow-auto object-cover'
      />
    );
  }

  // When heroCount is 2, show third background image
  else if (heroCount === 2) {
    return (
      <img
        src={back3}
        alt="background 3"
        className='w-[100%] h-[100%] float-left overflow-auto object-cover'
      />
    );
  }

  // When heroCount is 3, show fourth background image
  else if (heroCount === 3) {
    return (
      <img
        src={back4}
        alt="background 4"
        className='w-[100%] h-[100%] float-left overflow-auto object-cover'
      />
    );
  }

  // Optional fallback in case heroCount is not 0–3
  return null;
}

export default Backgound;
