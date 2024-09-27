import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ThemeToggleButton from '../NavBar/subComponents/ThemeToggleButton';
import './NavigationBar.style.css';
import { selectSelectedTheme } from '../../store/slices/userSelectionSlice';

const NavigationBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedTheme = useSelector(selectSelectedTheme);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className={`navbar ${selectedTheme === 'dark' ? 'navbar-dark' : 'navbar-light'}`}>
      <div className="navbar-logo">Stock GPT</div>
      <div className="navbar-links hidden md:flex">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/portfolio-analysis" className="nav-link">
          My Portfolio Analysis
        </Link>
        <Link to="/ai-analysis" className="nav-link">
          AI Analysis
        </Link>
      </div>
      <div className="navbar-actions">
        <ThemeToggleButton />
        <button className={`menu-toggle-button md:hidden ${selectedTheme === 'dark' ? 'menu-toggle-button-dark' : 'menu-toggle-button-light'}`} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? '✖️' : '☰'}
        </button>
      </div>
      {isOpen && (
        <div className="mobile-menu md:hidden">
          <Link to="/" className="mobile-link" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/portfolio-analysis" className="mobile-link" onClick={() => setIsOpen(false)}>
            My Portfolio Analysis
          </Link>
          <Link to="/ai-analysis" className="mobile-link" onClick={() => setIsOpen(false)}>
            AI Analysis
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;