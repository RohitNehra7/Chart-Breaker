import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedTheme, setSelectedTheme } from '../../../store/slices/userSelectionSlice';

const ThemeToggleButton: React.FC = () => {
  const dispatch = useDispatch();
  const selectedTheme = useSelector(selectSelectedTheme);

  const toggleTheme = () => {
    const newTheme = selectedTheme === 'light' ? 'dark' : 'light';
    dispatch(setSelectedTheme(newTheme));
  };

  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle-button ${selectedTheme === 'dark' ? 'theme-toggle-button-dark' : 'theme-toggle-button-light'}`}
    >
      {selectedTheme === 'light' ? '🌞' : '🌜'}
    </button>
  );
};

export default ThemeToggleButton;