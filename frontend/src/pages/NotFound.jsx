// Importing React to define the component
import React from 'react'

// Hook from React Router to navigate programmatically
import { useNavigate } from 'react-router-dom'

// Functional component for the "404 Not Found" page
function NotFound() {
    // useNavigate gives us a function to navigate to different routes
    let navigate = useNavigate()

    return (
        // Main container with full screen width and height
        <div className='
            w-[100vw]                // full width of the viewport
            h-[100vh]                // full height of the viewport
            bg-gradient-to-l         // gradient background from right to left
            from-[#141414]           // dark gray color
            to-[#0c2025]             // dark teal color
            md:text-[70px]           // large text on medium and bigger screens
            text-[30px]              // smaller text on small screens
            flex                     // using flexbox
            items-center             // center items vertically
            justify-center           // center items horizontally
            text-[white]             // text color white
            flex-col                 // flex direction: column
            gap-[20px]               // vertical gap between children
        '>
            {/* Main Message */}
            404 Page Not Found

            {/* Button to redirect to Login page */}
            <button
                className='
                    bg-[white]        // button background color: white
                    px-[20px]         // padding left and right
                    py-[10px]         // padding top and bottom
                    rounded-xl        // rounded corners
                    text-[18px]       // font size
                    text-[black]      // text color
                    cursor-pointer    // show pointer cursor on hover
                '
                onClick={() => navigate("/login")} // Redirect to login on click
            >
                Login
            </button>
        </div>
    )
}

// Exporting the component so it can be used in the app
export default NotFound
