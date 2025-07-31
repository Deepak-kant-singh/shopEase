import React, { createContext, useContext, useEffect, useState } from 'react'
// Import the context that provides the server URL
import { authDataContext } from './AuthContext'
import axios from 'axios'

// Create a new context to hold admin-related data
export const adminDataContext = createContext()

// Component that provides admin-related context to children components
function AdminContext({children}) {
    // State to store admin data (e.g., email, role)
    let [adminData, setAdminData] = useState(null)

    // Get the server URL from the authDataContext
    let {serverUrl} = useContext(authDataContext)

    // Function to fetch admin info from the backend
    const getAdmin = async () => {
      try {
        // Send GET request to server to fetch admin data (requires cookie for auth)
        let result = await axios.get(serverUrl + "/api/user/getadmin", { withCredentials: true })

        // Save the admin data in state
        setAdminData(result.data)

        // Log it for debugging
        console.log(result.data)
      } catch (error) {
        // In case of error, clear the admin data
        setAdminData(null)

        // Log error for debugging
        console.log(error)
      }
    }

    // On component mount, call getAdmin once
    useEffect(() => {
      getAdmin()
    }, [])

    // Value object that is shared through the context
    let value = {
      adminData,       // Admin data state
      setAdminData,    // Setter to manually update admin data
      getAdmin         // Function to fetch admin data again when needed
    }

    return (
      <div>
        {/* Provide the context to all children components */}
        <adminDataContext.Provider value={value}>
          {children}
        </adminDataContext.Provider>
      </div>
    )
}

export default AdminContext
