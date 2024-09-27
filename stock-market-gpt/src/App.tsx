import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from './pages/HomePage/HomePage';
import Navbar from './components/NavBar/NavigationBar.component';
import { selectSelectedTheme } from './store/slices/userSelectionSlice';
import './index.css'; // Ensure this imports your main CSS entry file

const App: React.FC = () => {
  const selectedTheme = useSelector(selectSelectedTheme);

  return (
    <div className={`App min-h-screen ${selectedTheme === 'dark' ? 'bg-dark-background text-dark-textPrimary' : 'bg-background text-textPrimary'}`}>
      <Navbar /> {/* Add the Navbar component here */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
};

export default App;