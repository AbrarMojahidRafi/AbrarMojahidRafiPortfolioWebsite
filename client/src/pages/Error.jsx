import React from 'react'

const Error = () => {
  return (
    <>  
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">    
            <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
            <p className="text-gray-600 mb-6">The page you are looking for does not exist.</p>
            <a
                href="/"
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
                Go to Home
            </a>
            
            <br />
            
            <a
                href="/contact"
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
                Report Problem
            </a>
        </div>
    </>
  )
}

export default Error