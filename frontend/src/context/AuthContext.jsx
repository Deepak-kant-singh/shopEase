import React, { createContext } from 'react'

// Creating a context object to share authentication-related data globally
export const authDataContext = createContext()

// This is the context provider component that wraps your app (or part of it)
function AuthContext({ children }) {

  // Defining a variable that stores the server API base URL
  let serverUrl = "http://localhost:8000"

  // This object can hold any global values you want to pass down
  let value = {
    serverUrl
  }

  return (
    // Wrapping all child components in the context provider
    <authDataContext.Provider value={value}>
      {children} {/* This renders whatever is passed inside <AuthContext> */}
    </authDataContext.Provider>
  )
}

export default AuthContext
