import React, { useEffect, useState } from 'react'

// Import reusable components
import Backgound from '../component/Backgound'
import Hero from '../component/Hero'
import Product from './Product'
import OurPolicy from '../component/OurPolicy'
import NewLetterBox from '../component/NewLetterBox'
import Footer from '../component/Footer'

function Home() {

  // ---------- HERO SECTION SLIDE DATA ----------

  // Array of hero banner data to rotate every 3 seconds
  const heroData = [
    { text1: "30% OFF Limited Offer", text2: "Style that" },
    { text1: "Discover the Best of Bold Fashion", text2: "Limited Time Only!" },
    { text1: "Explore Our Best Collection", text2: "Shop Now!" },
    { text1: "Choose your Perfect Fashion Fit", text2: "Now on Sale!" }
  ]

  // ---------- STATE ----------

  // heroCount keeps track of which slide to show (index in heroData)
  const [heroCount, setHeroCount] = useState(0)

  // ---------- AUTO-SLIDE TIMER ----------

  useEffect(() => {
    // Change the hero banner every 3 seconds
    const interval = setInterval(() => {
      setHeroCount(prevCount => (prevCount === heroData.length - 1 ? 0 : prevCount + 1))
    }, 3000)

    // Clear interval on component unmount to prevent memory leak
    return () => clearInterval(interval)
  }, [])

  // ---------- JSX RETURN ----------

  return (
    // Outer container for full page with top spacing to avoid overlapping fixed nav
    <div className='overflow-x-hidden relative top-[70px]'>

      {/* HERO SECTION */}
      <div className='w-[100vw] lg:h-[100vh] md:h-[50vh] sm:h-[30vh] bg-gradient-to-l from-[#141414] to-[#0c2025]'>

        {/* Background visuals (animated or decorative images) */}
        <Backgound heroCount={heroCount} />

        {/* Hero text + controls like buttons or arrows */}
        <Hero
          heroCount={heroCount}
          setHeroCount={setHeroCount}
          heroData={heroData[heroCount]}
        />
      </div>

      {/* PRODUCT LISTING SECTION */}
      <Product />

      {/* WHY CHOOSE US - POLICY HIGHLIGHTS */}
      <OurPolicy />

      {/* EMAIL SIGN-UP / NEWSLETTER BOX */}
      <NewLetterBox />

      {/* FOOTER WITH CONTACT, LINKS, ETC */}
      <Footer />
    </div>
  )
}

export default Home
