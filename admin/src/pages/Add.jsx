// Importing React and Hooks
import React, { useContext, useState } from 'react'

// Navigation and Sidebar components
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'

// Default image used for upload preview
import upload from '../assets/upload image.jpg'

// Auth context to access global server URL
import { authDataContext } from '../context/AuthContext'

// Axios for HTTP requests
import axios from 'axios'

// Toast notifications
import { toast } from 'react-toastify'

// Loading spinner component
import Loading from '../component/Loading'

// Main Component
function Add() {

  // State for 4 image inputs (initially set to false)
  let [image1, setImage1] = useState(false)
  let [image2, setImage2] = useState(false)
  let [image3, setImage3] = useState(false)
  let [image4, setImage4] = useState(false)

  // Input states for product data
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Men")           // Default selected
  const [price, setPrice] = useState("")
  const [subCategory, setSubCategory] = useState("TopWear") // Default selected
  const [bestseller, setBestSeller] = useState(false)       // Checkbox
  const [sizes, setSizes] = useState([])                    // Array of selected sizes
  const [loading, setLoading] = useState(false)             // Loader during API call

  // Get server URL from context
  let { serverUrl } = useContext(authDataContext)

  // Handle form submit
  const handleAddProduct = async (e) => {
    setLoading(true)       // Show loader
    e.preventDefault()     // Prevent default page refresh

    try {
      // Create form data object to send file + text
      let formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes)) // Send array as JSON string
      formData.append("image1", image1)
      formData.append("image2", image2)
      formData.append("image3", image3)
      formData.append("image4", image4)

      // API call to add product
      let result = await axios.post(serverUrl + "/api/product/addproduct", formData, {
        withCredentials: true
      })

      console.log(result.data)
      toast.success("ADD Product Successfully")
      setLoading(false)

      // Reset form fields after successful submission
      if (result.data) {
        setName("")
        setDescription("")
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice("")
        setBestSeller(false)
        setCategory("Men")
        setSubCategory("TopWear")
        setSizes([])
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error("Add Product Failed")
    }
  }

  // JSX UI
  return (
    <div className="w-screen min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Top Navigation Bar */}
      <Nav />

      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Form Section */}
      <div className="w-full md:w-[82%] absolute right-0 top-[70px] px-4 sm:px-10 pb-20">
        <form
          onSubmit={handleAddProduct}
          className="w-full flex flex-col gap-10 py-10 px-6 bg-gray-900 rounded-xl shadow-md border border-gray-700"
        >

          {/* Page Title */}
          <h2 className="text-[26px] md:text-[34px] font-bold text-cyan-300">Add Product Page</h2>

          {/* ---------- Image Upload ---------- */}
          <div className="flex flex-col gap-3">
            <label className="text-[18px] md:text-[22px] font-semibold text-cyan-200">Upload Images</label>

            {/* Loop over each image */}
            <div className="flex items-center gap-6 flex-wrap">
              {[{ id: 'image1', state: image1, setState: setImage1 },
                { id: 'image2', state: image2, setState: setImage2 },
                { id: 'image3', state: image3, setState: setImage3 },
                { id: 'image4', state: image4, setState: setImage4 }
              ].map(({ id, state, setState }) => (
                <label htmlFor={id} key={id}
                  className="w-[90px] h-[90px] md:w-[110px] md:h-[110px] border border-gray-500 rounded-lg bg-gray-800 overflow-hidden cursor-pointer hover:shadow-lg transition-all">
                  <img
                    src={!state ? upload : URL.createObjectURL(state)} // Preview image if selected
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <input type="file" id={id} hidden onChange={(e) => setState(e.target.files[0])} required />
                </label>
              ))}
            </div>
          </div>

          {/* ---------- Product Name ---------- */}
          <div className="flex flex-col gap-2">
            <label className="text-[18px] md:text-[22px] font-semibold text-cyan-200">Product Name</label>
            <input
              type="text"
              placeholder="Type here"
              className="w-full max-w-[600px] h-[45px] rounded-md border border-gray-600 bg-gray-800 px-4 text-[16px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>

          {/* ---------- Product Description ---------- */}
          <div className="flex flex-col gap-2">
            <label className="text-[18px] md:text-[22px] font-semibold text-cyan-200">Product Description</label>
            <textarea
              placeholder="Type here"
              className="w-full max-w-[600px] h-[100px] rounded-md border border-gray-600 bg-gray-800 px-4 py-2 text-[16px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            />
          </div>

          {/* ---------- Category & Subcategory ---------- */}
          <div className="flex flex-wrap gap-10">
            {/* Category Dropdown */}
            <div className="flex flex-col gap-2">
              <label className="text-[18px] md:text-[22px] font-semibold text-cyan-200">Product Category</label>
              <select
                className="bg-gray-800 border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            {/* SubCategory Dropdown */}
            <div className="flex flex-col gap-2">
              <label className="text-[18px] md:text-[22px] font-semibold text-cyan-200">Sub-Category</label>
              <select
                className="bg-gray-800 border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white"
                onChange={(e) => setSubCategory(e.target.value)}
              >
                <option value="TopWear">TopWear</option>
                <option value="BottomWear">BottomWear</option>
                <option value="WinterWear">WinterWear</option>
              </select>
            </div>
          </div>

          {/* ---------- Price ---------- */}
          <div className="flex flex-col gap-2">
            <label className="text-[18px] md:text-[22px] font-semibold text-cyan-200">Product Price</label>
            <input
              type="number"
              placeholder="₹ 2000"
              className="w-full max-w-[600px] h-[45px] rounded-md border border-gray-600 bg-gray-800 px-4 text-[16px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>

          {/* ---------- Sizes ---------- */}
          <div className="flex flex-col gap-2">
            <label className="text-[18px] md:text-[22px] font-semibold text-cyan-200">Product Size</label>
            <div className="flex flex-wrap gap-3">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <div
                  key={size}
                  className={`px-5 py-2 rounded-md border cursor-pointer transition-all text-[16px] ${
                    sizes.includes(size)
                      ? "bg-cyan-300 text-black border-cyan-500"
                      : "bg-gray-800 text-white border-gray-600"
                  }`}
                  onClick={() =>
                    setSizes((prev) =>
                      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
                    )
                  }
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          {/* ---------- Bestseller Checkbox ---------- */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="checkbox"
              className="w-5 h-5 text-cyan-400 focus:ring-cyan-400 cursor-pointer"
              onChange={() => setBestSeller((prev) => !prev)}
            />
            <label htmlFor="checkbox" className="text-[16px] md:text-[18px] font-semibold text-cyan-200">
              Add to BestSeller
            </label>
          </div>

          {/* ---------- Submit Button ---------- */}
          <div>
            <button
              type="submit"
              className="w-[160px] py-3 rounded-md bg-cyan-400 hover:bg-cyan-500 text-black font-medium active:bg-cyan-600 transition-all"
            >
              {loading ? <Loading /> : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Export component
export default Add
