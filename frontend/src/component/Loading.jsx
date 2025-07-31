import React from 'react';

// This is a simple loading spinner component using Tailwind CSS
function Loading() {
  return (
    // Spinner: spinning circle using Tailwind classes
    <div className="animate-spin h-8 w-8 border-4 border-white border-t-transparent rounded-full"></div>
  );
}

export default Loading;
