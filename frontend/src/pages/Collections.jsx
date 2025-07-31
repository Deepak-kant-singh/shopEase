import React, { useContext, useEffect, useState } from 'react'
import { FaChevronRight, FaChevronDown } from 'react-icons/fa'
import Title from '../component/Title'
import Card from '../component/Card'
import { shopDataContext } from '../context/ShopContext'

function Collections() {
  // Toggle for mobile filter visibility
  const [showFilter, setShowFilter] = useState(false)

  // Context data
  const { products, search, showSearch } = useContext(shopDataContext)

  // Filtering + sorting states
  const [filterProduct, setFilterProduct] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relavent')

  // Toggle category selection (checkbox)
  const toggleCategory = (e) => {
    const value = e.target.value
    setCategory(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    )
  }

  // Toggle sub-category selection (checkbox)
  const toggleSubCategory = (e) => {
    const value = e.target.value
    setSubCategory(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    )
  }

  // Filter logic
  const applyFilter = () => {
    let productCopy = products.slice()

    // Apply search if active
    if (showSearch && search) {
      productCopy = productCopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Apply category filter
    if (category.length > 0) {
      productCopy = productCopy.filter(item =>
        category.includes(item.category)
      )
    }

    // Apply sub-category filter
    if (subCategory.length > 0) {
      productCopy = productCopy.filter(item =>
        subCategory.includes(item.subCategory)
      )
    }

    setFilterProduct(productCopy)
  }

  // Sorting logic
  const sortProducts = () => {
    const copy = filterProduct.slice()

    switch (sortType) {
      case 'low-high':
        setFilterProduct(copy.sort((a, b) => a.price - b.price))
        break
      case 'high-low':
        setFilterProduct(copy.sort((a, b) => b.price - a.price))
        break
      default:
        applyFilter()
        break
    }
  }

  // Run on first load: show all products
  useEffect(() => {
    setFilterProduct(products)
  }, [products])

  // Re-apply filters when inputs change
  useEffect(() => {
    applyFilter()
  }, [category, subCategory, search, showSearch])

  // Apply sort when sort type changes
  useEffect(() => {
    sortProducts()
  }, [sortType])

  return (
    <div className='w-[99vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-start flex-col md:flex-row pt-[70px] pb-[110px]'>
      
      {/* FILTER SIDEBAR */}
      <div className={`md:w-[30vw] lg:w-[20vw] w-[100vw] md:min-h-[100vh] ${showFilter ? 'h-[45vh]' : 'h-[8vh]'} p-[20px] border-r border-gray-400 text-[#aaf5fa] lg:fixed`}>
        {/* FILTER HEADER (toggle for mobile) */}
        <p className='text-[25px] font-semibold flex gap-2 items-center cursor-pointer' onClick={() => setShowFilter(prev => !prev)}>
          FILTERS {showFilter ? <FaChevronDown /> : <FaChevronRight />}
        </p>

        {/* CATEGORY CHECKBOXES */}
        <div className={`border-2 border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600 ${showFilter ? '' : 'hidden'} md:block`}>
          <p className='text-[18px] text-white'>CATEGORIES</p>
          <div className='flex flex-col gap-2 mt-2'>
            <label><input type="checkbox" value="Men" onChange={toggleCategory} /> Men</label>
            <label><input type="checkbox" value="Women" onChange={toggleCategory} /> Women</label>
            <label><input type="checkbox" value="Kids" onChange={toggleCategory} /> Kids</label>
          </div>
        </div>

        {/* SUB-CATEGORY CHECKBOXES */}
        <div className={`border-2 border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600 ${showFilter ? '' : 'hidden'} md:block`}>
          <p className='text-[18px] text-white'>SUB-CATEGORIES</p>
          <div className='flex flex-col gap-2 mt-2'>
            <label><input type="checkbox" value="TopWear" onChange={toggleSubCategory} /> TopWear</label>
            <label><input type="checkbox" value="BottomWear" onChange={toggleSubCategory} /> BottomWear</label>
            <label><input type="checkbox" value="WinterWear" onChange={toggleSubCategory} /> WinterWear</label>
          </div>
        </div>
      </div>

      {/* PRODUCT DISPLAY SECTION */}
      <div className='lg:pl-[20%] md:py-4 flex-1'>
        {/* HEADER: TITLE + SORT DROPDOWN */}
        <div className='w-full px-6 md:px-[50px] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4'>
          <Title text1="ALL" text2="COLLECTIONS" />
          <select
            className='bg-slate-600 w-[60%] md:w-[200px] h-[50px] px-3 text-white rounded-lg border-2 hover:border-[#46d1f7]'
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relavent">Sort By: Relevant</option>
            <option value="low-high">Sort By: Low to High</option>
            <option value="high-low">Sort By: High to Low</option>
          </select>
        </div>

        {/* PRODUCT GRID */}
        <div className='w-full px-4 flex flex-wrap justify-center gap-8 mt-8'>
          {filterProduct.length > 0 ? (
            filterProduct.map((item, index) => (
              <Card
                key={index}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image1}
              />
            ))
          ) : (
            <p className='text-white text-xl mt-10'>No products match your filters.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Collections
