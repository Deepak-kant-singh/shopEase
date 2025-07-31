import React from 'react'

function NewLetterBox() {

  // This function runs when the user submits the newsletter form
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page from refreshing on form submit
    // You can later add API logic here to store the email in database
  }

  return (
    // Wrapper div for the newsletter section
    <div className='w-[100%] h-[40vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-start gap-[10px] flex-col'>

      {/* Big heading text for the offer */}
      <p className='md:text-[30px] text-[20px] text-[#a5faf7] font-semibold px-[20px]'>
        Subscribe now & get 20% off
      </p>

      {/* Subheading/description below the heading */}
      <p className='md:text-[18px] text-[14px] text-center text-blue-100 font-semibold px-[20px]'>
        Subscribe now and enjoy exclusive savings, special deals, and early access to new collections.
      </p>

      {/* Form input and button */}
      <form 
        action="" 
        onSubmit={handleSubmit} 
        className='w-[100%] h-[30%] md:h-[50%] flex items-center justify-center mt-[20px] gap-[20px] px-[20px]'
      >
        {/* Email input field */}
        <input 
          type="text" 
          placeholder='Enter Your Email' 
          required
          className='placeholder:text-[black] bg-slate-300 w-[600px] max-w-[60%] h-[40px] px-[20px] rounded-lg shadow-sm shadow-black'
        />

        {/* Submit button */}
        <button 
          type='submit' 
          className='text-[15px] md:text-[16px] px-[10px] md:px-[30px] py-[12px] md:py-[10px] hover:bg-slate-500 cursor-pointer bg-[#2e3030c9] text-white flex items-center justify-center gap-[20px] border-[1px] border-[#80808049] rounded-lg shadow-sm shadow-black'
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}

export default NewLetterBox
