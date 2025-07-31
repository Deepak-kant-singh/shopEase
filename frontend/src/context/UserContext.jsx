import React, { createContext, useContext, useEffect, useState } from 'react'
// Importing context to access the backend server URL
import { authDataContext } from './authContext'

// Importing Axios for making HTTP requests
import axios from 'axios'

// 🔹 Creating a context to globally share user-related data (like logged-in user info)
export const userDataContext = createContext()

// 🔹 This component wraps the entire app and provides user info to all components
function UserContext({ children }) {

  // 🧠 State to hold user information like name, email, etc.
  // By default, it's an empty string (""), but will be updated after fetching
  const [userData, setUserData] = useState("")

  // 🌐 Getting the backend server URL from the AuthContext
  const { serverUrl } = useContext(authDataContext)

  // 🔄 Function to get current logged-in user info from the backend
  const getCurrentUser = async () => {
    try {
      // Make a GET request to the backend to fetch current user details
      const result = await axios.get(
        serverUrl + "/api/user/getcurrentuser",
        { withCredentials: true } // Send session cookies for auth
      )

      // Save the returned user data in state (to be shared via context)
      setUserData(result.data)

      // For debugging: log the fetched user info to the console
      console.log(result.data)

    } catch (error) {
      // If request fails (user not logged in or session expired), set user to null
      setUserData(null)
      console.log("Failed to fetch user:", error)
    }
  }

  // 🪄 useEffect runs only once when this component mounts (like on app load)
  useEffect(() => {
    getCurrentUser() // Fetch current user from backend
  }, [])

  // 📦 Value to be shared globally via context
  const value = {
    userData,         // current user info
    setUserData,      // function to manually update user (like on login/logout)
    getCurrentUser    // function to refresh user info from backend
  }

  // 💡 Provide this context to all child components of the app
  return (
    <div>
      <userDataContext.Provider value={value}>
        {children} {/* render all nested child components */}
      </userDataContext.Provider>
    </div>
  )
}

export default UserContext
