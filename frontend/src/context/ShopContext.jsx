import React, { createContext, useContext, useEffect, useState } from 'react'
// Importing AuthContext to access backend server URL
import { authDataContext } from './authContext'

// Axios for making HTTP requests
import axios from 'axios'

// Import user context to access user info (like whether user is logged in)
import { userDataContext } from './UserContext'

// Import toast for showing success/error popups
import { toast } from 'react-toastify'

// Creating a new context for sharing product and cart-related data
export const shopDataContext = createContext()

// ShopContext component to wrap around the app and share state/data
function ShopContext({ children }) {
  
  // 🛍️ List of all products fetched from backend
  const [products, setProducts] = useState([])

  // 🔍 Current value in the search input box
  const [search, setSearch] = useState('')

  // 🔄 Toggle to show or hide the search bar
  const [showSearch, setShowSearch] = useState(false)

  // 🌐 Get backend server URL from AuthContext
  const { serverUrl } = useContext(authDataContext)

  // 👤 Get current logged-in user data from UserContext
  const { userData } = useContext(userDataContext)

  // 🛒 Object that stores items in the cart
  // Format: { productId: { size: quantity } }
  const [cartItem, setCartItem] = useState({})

  // ⏳ Show spinner while performing some cart actions
  const [loading, setLoading] = useState(false)

  // 💰 Currency symbol for display
  const currency = '₹'

  // 🚚 Delivery fee constant
  const delivery_fee = 40

  // ✅ Function to fetch product list from backend when the app starts
  const getProducts = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/product/list")
      setProducts(result.data) // Save to state
      console.log(result.data)
    } catch (error) {
      console.log("Error fetching products:", error)
    }
  }

  // ➕ Function to add a product (by id + size) to cart
  const addtoCart = async (itemId, size) => {
    if (!size) {
      console.log("Select Product Size")
      return
    }

    // Clone existing cart data to modify without mutating state directly
    const cartData = structuredClone(cartItem)

    // If the product already exists in cart with that size, increase quantity
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1
      } else {
        cartData[itemId][size] = 1
      }
    } else {
      // If the product doesn't exist yet in cart, add it
      cartData[itemId] = {}
      cartData[itemId][size] = 1
    }

    // Update local cart state
    setCartItem(cartData)

    // If user is logged in, also update the backend cart
    if (userData) {
      setLoading(true)
      try {
        const result = await axios.post(
          serverUrl + "/api/cart/add",
          { itemId, size },
          { withCredentials: true } // To send cookies (session)
        )
        toast.success("Product Added") // Show success toast
        console.log(result.data)
      } catch (error) {
        toast.error("Add Cart Error") // Show error toast
        console.log(error)
      } finally {
        setLoading(false) // Hide spinner
      }
    }
  }

  // 🛒 Function to fetch cart items from backend (on page reload)
  const getUserCart = async () => {
    try {
      const result = await axios.post(
        serverUrl + "/api/cart/get",
        {},
        { withCredentials: true }
      )
      setCartItem(result.data) // Set to state
    } catch (error) {
      console.log("Error getting user cart:", error)
    }
  }

  // 🔄 Function to update the quantity of a cart item
  const updateQuantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItem) // Clone current cart
    cartData[itemId][size] = quantity           // Update the size quantity
    setCartItem(cartData)                       // Update the state

    if (userData) {
      try {
        // Sync with backend
        await axios.post(
          serverUrl + "/api/cart/update",
          { itemId, size, quantity },
          { withCredentials: true }
        )
      } catch (error) {
        console.log("Quantity update failed:", error)
      }
    }
  }

  // 🔢 Count total number of items in the cart (sum of all sizes)
  const getCartCount = () => {
    let totalCount = 0
    for (const productId in cartItem) {
      for (const size in cartItem[productId]) {
        try {
          if (cartItem[productId][size] > 0) {
            totalCount += cartItem[productId][size]
          }
        } catch (error) {
          // silently fail if error
        }
      }
    }
    return totalCount
  }

  // 💵 Calculate total cost of items in cart
  const getCartAmount = () => {
    let totalAmount = 0
    for (const productId in cartItem) {
      const product = products.find((p) => p._id === productId)
      if (!product) continue

      for (const size in cartItem[productId]) {
        try {
          if (cartItem[productId][size] > 0) {
            totalAmount += product.price * cartItem[productId][size]
          }
        } catch (error) {
          // silently ignore if product missing
        }
      }
    }
    return totalAmount
  }

  // 📦 Fetch products list on first render
  useEffect(() => {
    getProducts()
  }, [])

  // 🧺 Fetch cart if user is already logged in
  useEffect(() => {
    getUserCart()
  }, [])

  // ✅ All global data and functions shared via context
  const value = {
    products,            // all product list
    currency,            // ₹ symbol
    delivery_fee,        // delivery cost
    getProducts,         // refetch products if needed
    search,              // search input value
    setSearch,           // update search
    showSearch,          // toggle search bar
    setShowSearch,       // update search toggle
    cartItem,            // cart object
    addtoCart,           // add item to cart
    getCartCount,        // count of cart items
    setCartItem,         // manually update cart
    updateQuantity,      // update item quantity
    getCartAmount,       // calculate total cart price
    loading              // spinner loading state
  }

  // Wrap children with context provider
  return (
    <shopDataContext.Provider value={value}>
      {children}
    </shopDataContext.Provider>
  )
}

export default ShopContext
