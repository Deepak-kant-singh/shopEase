// React core imports
import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

// Page components
import Home from './pages/Home';
import Add from './pages/Add';
import Lists from './pages/Lists';
import Orders from './pages/Orders';
import Login from './pages/Login';

// Admin context to manage login state
import { adminDataContext } from './context/AdminContext';

// Toast notification container from react-toastify
import { ToastContainer, toast } from 'react-toastify';

function App() {
  // Extract admin data (used to check login status)
  let { adminData } = useContext(adminDataContext);

  return (
    <>
      {/* Global toast notification setup */}
      <ToastContainer />

      {/* Conditional rendering:
            - If NOT logged in, show only Login page.
            - If logged in, show all application routes/pages.
      */}
      {!adminData ? (
        <Login />
      ) : (
        <>
          <Routes>
            {/* Home Page */}
            <Route path='/' element={<Home />} />

            {/* Add Product Page */}
            <Route path='/add' element={<Add />} />

            {/* Product List Page */}
            <Route path='/lists' element={<Lists />} />

            {/* Orders Page */}
            <Route path='/orders' element={<Orders />} />

            {/* Login Page (optional route, won't be used after login) */}
            <Route path='/login' element={<Login />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
