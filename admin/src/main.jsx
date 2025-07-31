// Import React StrictMode for highlighting potential problems during development
import { StrictMode } from 'react'

// Import React DOM's createRoot API for modern rendering
import { createRoot } from 'react-dom/client'

// Global CSS file for styles
import './index.css'

// Root application component
import App from './App.jsx'

// React Router for managing client-side routing
import { BrowserRouter } from 'react-router-dom'

// Context providers for global state (authentication and admin session)
import AuthContext from './context/AuthContext.jsx'
import AdminContext from './context/AdminContext.jsx'

// Mount the React app into the root DOM node
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    {/* AuthContext provides server URL or user info globally */}
    <AuthContext>
      {/* AdminContext provides admin session data globally */}
      <AdminContext>
        {/* Main Application Component */}
        <App />
      </AdminContext>
    </AuthContext>
  </BrowserRouter>
)
