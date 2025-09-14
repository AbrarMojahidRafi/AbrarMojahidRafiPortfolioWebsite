import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6">
      <div className="flex justify-between items-center">
        {/* Left side - Name */}
        <div className="text-black font-bold text-xl">Abrar Mojahid Rafi</div>
        
        {/* Desktop Navigation - visible on medium screens and above */}
        <div className="hidden md:flex items-center space-x-6">
          <a 
            href="/" 
            className="text-black hover:underline hover:underline-offset-4 hover:decoration-2 hover:bg-pink-100 px-3 py-2 rounded-md transition-all duration-300"
          >
            Home
          </a>
          <a 
            href="/about" 
            className="text-black hover:underline hover:underline-offset-4 hover:decoration-2 hover:bg-pink-100 px-3 py-2 rounded-md transition-all duration-300"
          >
            About
          </a>
          <a 
            href="/contact" 
            className="text-black hover:underline hover:underline-offset-4 hover:decoration-2 hover:bg-pink-100 px-3 py-2 rounded-md transition-all duration-300"
          >
            Contact
          </a>
          <a 
            href="/service" 
            className="text-black hover:underline hover:underline-offset-4 hover:decoration-2 hover:bg-pink-100 px-3 py-2 rounded-md transition-all duration-300"
          >
            Service
          </a>
          <a 
            href="/register" 
            className="text-black hover:underline hover:underline-offset-4 hover:decoration-2 hover:bg-pink-100 px-3 py-2 rounded-md transition-all duration-300"
          >
            Register
          </a>
          <a 
            href="/login" 
            className="text-black hover:underline hover:underline-offset-4 hover:decoration-2 hover:bg-pink-100 px-3 py-2 rounded-md transition-all duration-300"
          >
            Login
          </a>
        </div>

        {/* Mobile menu button - visible on small screens */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-black focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation - visible when menu is open on small screens */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-2 pb-3">
          <a 
            href="/" 
            className="block text-black hover:underline hover:underline-offset-4 hover:decoration-2 hover:bg-pink-100 px-3 py-2 rounded-md transition-all duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </a>
          <a 
            href="/about" 
            className="block text-black hover:underline hover:underline-offset-4 hover:decoration-2 hover:bg-pink-100 px-3 py-2 rounded-md transition-all duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </a>
          <a 
            href="/contact" 
            className="block text-black hover:underline hover:underline-offset-4 hover:decoration-2 hover:bg-pink-100 px-3 py-2 rounded-md transition-all duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </a>
          <a 
            href="/service" 
            className="block text-black hover:underline hover:underline-offset-4 hover:decoration-2 hover:bg-pink-100 px-3 py-2 rounded-md transition-all duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Service
          </a>
          <a 
            href="/register" 
            className="block text-black hover:underline hover:underline-offset-4 hover:decoration-2 hover:bg-pink-100 px-3 py-2 rounded-md transition-all duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Register
          </a>
          <a 
            href="/login" 
            className="block text-black hover:underline hover:underline-offset-4 hover:decoration-2 hover:bg-pink-100 px-3 py-2 rounded-md transition-all duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;