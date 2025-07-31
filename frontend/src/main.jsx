// Import StrictMode (optional for highlighting potential problems in dev)
import { StrictMode } from 'react'

// React 18+ createRoot API for mounting the app
import { createRoot } from 'react-dom/client'

// Import global styles
import './index.css'

// Import the main App component
import App from './App.jsx'

// Import router wrapper to enable client-side navigation
import { BrowserRouter } from 'react-router-dom'

// Import context providers for global state management
import AuthContext from './context/authContext.jsx'     // Handles authentication state (e.g., serverUrl, login)
import UserContext from './context/UserContext.jsx'     // Manages user data (e.g., profile, info)
import ShopContext from './context/ShopContext.jsx'     // Manages cart, wishlist, or product-related global state

// Mount the React app into the DOM
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    {/* Authentication Provider */}
    <AuthContext>
      {/* User Data Provider */}
      <UserContext>
        {/* Shop-related Data Provider */}
        <ShopContext>
          {/* Main Application Component */}
          <App />
        </ShopContext>
      </UserContext>
    </AuthContext>
  </BrowserRouter>
)
