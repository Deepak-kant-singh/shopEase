import React, { createContext } from 'react'

// Create a context named authDataContext
export const authDataContext = createContext()

// AuthContext component acts as a context provider
function AuthContext({children}) {
    // Define the backend server URL to be shared across the app
    let serverUrl = "https://shopease-backend-ao4p.onrender.com"  

    // Value to provide via context
    let value = {
        serverUrl
    }

    return (
        <authDataContext.Provider value={value}>
            {children}
        </authDataContext.Provider>
    )
}

export default AuthContext
