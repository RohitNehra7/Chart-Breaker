// src/App.tsx

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Navbar from './components/NavBar/NavigationBar.component';

const App: React.FC = () => {
  return (
    <div className="App min-h-screen bg-gray-100">
      <Navbar /> {/* Add the Navbar component here */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
};

export default App;
