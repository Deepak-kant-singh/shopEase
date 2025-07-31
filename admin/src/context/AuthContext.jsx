import React, { createContext } from 'react'

// Create a context named authDataContext — will be used to share auth-related data (like server URL) across components
export const authDataContext = createContext()

// AuthContext component acts as a context provider
function AuthContext({children}) {
    // Define the backend server URL to be shared across the app
    let serverUrl = "https://shopease-backend-ao4p.onrender.com"  // This is your Express server address

    // This value object holds all the data that will be made accessible through the context
    let value = {
      serverUrl     // You can add more shared values here in future (like tokens, userId, etc.)
    }

    return (
    <div>
        {/* Provide the authDataContext to all nested child components */}
        <authDataContext.Provider value={value}>
            {children}
        </authDataContext.Provider>
    </div>
  )
}

export default AuthContext
