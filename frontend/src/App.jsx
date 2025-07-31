import React, { useCallback, useContext } from 'react'
// Routing imports from react-router-dom
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

// Pages
import Registration from './pages/Registration'
import Home from './pages/Home'
import Login from './pages/Login'
import Nav from './component/Nav'
import { userDataContext } from './context/UserContext' // Context for current user
import About from './pages/About'
import Collections from './pages/Collections'
import Product from './pages/Product'
import Contact from './pages/Contact'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Order from './pages/Order'
import { ToastContainer } from 'react-toastify'; // For showing toasts
import NotFound from './pages/NotFound'
import Ai from './component/Ai' // Optional: Custom chat or support bot?

function App() {
  // Destructure userData from context
  let { userData } = useContext(userDataContext)

  // Get current location, used to redirect back after login
  let location = useLocation()

  return (
    <>
      {/* Toast container globally available for toasts */}
      <ToastContainer />

      {/* Conditionally render Nav only if user is logged in */}
      {userData && <Nav />}

      {/* Define all routes for the application */}
      <Routes>

        {/* LOGIN PAGE */}
        <Route
          path='/login'
          element={
            userData
              ? (<Navigate to={location.state?.from || "/"} />) // Redirect to previous page or home if already logged in
              : (<Login />) // Otherwise show login page
          }
        />

        {/* SIGNUP PAGE */}
        <Route
          path='/signup'
          element={
            userData
              ? (<Navigate to={location.state?.from || "/"} />) // Redirect if already registered
              : (<Registration />)
          }
        />

        {/* HOME PAGE */}
        <Route
          path='/'
          element={
            userData
              ? <Home /> // Show Home if logged in
              : <Navigate to="/login" state={{ from: location.pathname }} /> // Otherwise redirect to login
          }
        />

        {/* ABOUT PAGE */}
        <Route
          path='/about'
          element={
            userData
              ? <About />
              : <Navigate to="/login" state={{ from: location.pathname }} />
          }
        />

        {/* COLLECTION PAGE */}
        <Route
          path='/collection'
          element={
            userData
              ? <Collections />
              : <Navigate to="/login" state={{ from: location.pathname }} />
          }
        />

        {/* PRODUCT LIST PAGE */}
        <Route
          path='/product'
          element={
            userData
              ? <Product />
              : <Navigate to="/login" state={{ from: location.pathname }} />
          }
        />

        {/* CONTACT PAGE */}
        <Route
          path='/contact'
          element={
            userData
              ? <Contact />
              : <Navigate to="/login" state={{ from: location.pathname }} />
          }
        />

        {/* PRODUCT DETAIL PAGE WITH ID PARAM */}
        <Route
          path='/productdetail/:productId'
          element={
            userData
              ? <ProductDetail />
              : <Navigate to="/login" state={{ from: location.pathname }} />
          }
        />

        {/* CART PAGE */}
        <Route
          path='/cart'
          element={
            userData
              ? <Cart />
              : <Navigate to="/login" state={{ from: location.pathname }} />
          }
        />

        {/* PLACE ORDER PAGE */}
        <Route
          path='/placeorder'
          element={
            userData
              ? <PlaceOrder />
              : <Navigate to="/login" state={{ from: location.pathname }} />
          }
        />

        {/* USER ORDER LIST PAGE */}
        <Route
          path='/order'
          element={
            userData
              ? <Order />
              : <Navigate to="/login" state={{ from: location.pathname }} />
          }
        />

        {/* 404 - PAGE NOT FOUND */}
        <Route path='*' element={<NotFound />} />
      </Routes>

      {/* Optional AI assistant or floating component rendered globally */}
      <Ai />
    </>
  )
}

export default App
