import React, { useState } from "react";
import { useAuth } from "../store/auth.jsx";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { isLoggedIn } = useAuth();

  return (
    <nav className="bg-white shadow-md py-4 px-6">
      <div className="flex justify-between items-center">
        {/* Left side - Name */}
        <div className="text-black font-bold text-xl">Abrar Mojahid Rafi</div>
        
        {/* Desktop Navigation - visible on medium screens and above */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink 
            to="/" 
            className="text-black hover:underline hover:underline-offset-4 hover:decoration-2 hover:bg-pink-100 px-3 py-2 rounded-md transition-all duration-300"
          >
            Home
          </NavLink>
          <NavLink 
            to="/about" 
            className="text-black hover:underline hover:underline-offset-4 hover:decoration-2 hover:bg-pink-100 px-3 py-2 rounded-md transition-all duration-300"
          >
            About
          </NavLink>
          <NavLink 
            to="/contact" 
            className="text-black hover:underline hover:underline-offset-4 hover:decoration-2 hover:bg-pink-100 px-3 py-2 rounded-md transition-all duration-300"
          >
            Contact
          </NavLink>
          <NavLink 
            to="/service" 
            className="text-black hover:underline hover:underline-offset-4 hover:decoration-2 hover:bg-pink-100 px-3 py-2 rounded-md transition-all duration-300"
          >
            Service
          </NavLink>
          {isLoggedIn ? ( 
            <NavLink 
              to="/logout" 
              className="text-black hover:underline hover:underline-offset-4 hover:decoration-2 hover:bg-pink-100 px-3 py-2 rounded-md transition-all duration-300"
            >
              Logout
            </NavLink>
           ) : ( 
            <> 
              <NavLink 
                to="/register" 
                className="text-black hover:underline hover:underline-offset-4 hover:decoration-2 hover:bg-pink-100 px-3 py-2 rounded-md transition-all duration-300"
              >
                Register
              </NavLink>
              <NavLink
                to="/login" 
                className="text-black hover:underline hover:underline-offset-4 hover:decoration-2 hover:bg-pink-100 px-3 py-2 rounded-md transition-all duration-300"
              >
                Login
              </NavLink>
            </>
          )}
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
          <NavLink 
            to="/" 
            className="block text-black hover:underline hover:underline-offset-4 hover:decoration-2 hover:bg-pink-100 px-3 py-2 rounded-md transition-all duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink 
            to="/about" 
            className="block text-black hover:underline hover:underline-offset-4 hover:decoration-2 hover:bg-pink-100 px-3 py-2 rounded-md transition-all duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </NavLink>
          <NavLink 
            to="/contact" 
            className="block text-black hover:underline hover:underline-offset-4 hover:decoration-2 hover:bg-pink-100 px-3 py-2 rounded-md transition-all duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </NavLink>
          <NavLink 
            to="/service" 
            className="block text-black hover:underline hover:underline-offset-4 hover:decoration-2 hover:bg-pink-100 px-3 py-2 rounded-md transition-all duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Service
          </NavLink>

          {isLoggedIn ? ( 
            <NavLink 
              to="/logout" 
              className="block text-black hover:underline hover:underline-offset-4 hover:decoration-2 hover:bg-pink-100 px-3 py-2 rounded-md transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Logout
            </NavLink> ) : (
            <>
              <NavLink 
                to="/register" 
                className="block text-black hover:underline hover:underline-offset-4 hover:decoration-2 hover:bg-pink-100 px-3 py-2 rounded-md transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </NavLink>
              <NavLink 
                to="/login" 
                className="block text-black hover:underline hover:underline-offset-4 hover:decoration-2 hover:bg-pink-100 px-3 py-2 rounded-md transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;