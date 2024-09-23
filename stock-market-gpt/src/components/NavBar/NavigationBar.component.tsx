// src/components/NavigationBar.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.style.css'; // Import the CSS file

const NavigationBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar shadow-lg">
      <div className="container flex justify-between items-center py-4">
        {/* Text Logo */}
        <div className="logo text-3xl font-bold text-white">
          <span className="text-blue-400">Stock</span>{' '}
          <span className="text-orange-400">GPT</span>
        </div>
        {/* Desktop Nav Links */}
        <div className="nav-links hidden md:flex space-x-8">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/portfolio-analysis" className="nav-link">
            Portfolio Analysis
          </Link>
          <Link to="/ai-analysis" className="nav-link">
            AI Analysis
          </Link>
        </div>
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="menu-button">
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg> // Cross icon
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg> // Hamburger icon
            )}
          </button>
        </div>
      </div>
      {/* Mobile Nav Links */}
      {isOpen && (
        <div className="mobile-menu md:hidden flex flex-col space-y-4 bg-gray-800 p-4">
          <Link to="/" className="mobile-link" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link
            to="/portfolio-analysis"
            className="mobile-link"
            onClick={() => setIsOpen(false)}
          >
            Portfolio Analysis
          </Link>
          <Link
            to="/ai-analysis"
            className="mobile-link"
            onClick={() => setIsOpen(false)}
          >
            AI Analysis
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
