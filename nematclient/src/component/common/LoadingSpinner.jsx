import React from 'react'

const LoadingSpinner = () => {
  return (
     <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20 mb-4"></div>
      <h2 className="text-white text-xl">Loading...</h2>
    </div>
  )
}

export default LoadingSpinner