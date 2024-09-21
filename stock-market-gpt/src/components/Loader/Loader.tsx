// src/components/Loader.tsx

import React from 'react';
import './Loader.css'; // Import the CSS file

const Loader: React.FC = () => {
  return (
    <div className="loader-container">
      <svg
        className="loader-spinner"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" strokeWidth="4" stroke="currentColor" />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v2a6 6 0 100 12v2a8 8 0 01-8-8z"
        />
      </svg>
    </div>
  );
};

export default Loader;
