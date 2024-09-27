import React, { useState, useEffect, useRef } from 'react';
import './SearchBar.style.css'; // Import the updated CSS file
import { StockSymbolData } from '../../interfaces/marketIndex.interface';
import { fetchAutoCompleteResults } from '../../services/stockService';
import { FiSearch } from 'react-icons/fi'; // Import search icon from react-icons
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector hooks
import { setSymbolSelected } from '../../store/slices/userSelectionSlice'; // Import action
import { selectSelectedTheme } from '../../store/slices/userSelectionSlice'; // Import selector

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [autoCompleteResults, setAutoCompleteResults] = useState<StockSymbolData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1); // State to manage the selected option
  const dispatch = useDispatch(); // Initialize dispatch
  const selectedTheme = useSelector(selectSelectedTheme); // Get the selected theme
  const dropdownRef = useRef<HTMLUListElement>(null); // Ref for the dropdown list

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setSelectedIndex(-1); // Reset selected index when query changes
  };

  const handleOptionClick = (symbol: string) => {
    setQuery(symbol);
    dispatch(setSymbolSelected(symbol)); // Dispatch action to set selection
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      setSelectedIndex((prevIndex) =>
        prevIndex < autoCompleteResults.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (event.key === 'ArrowUp') {
      setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    } else if (event.key === 'Enter' && selectedIndex >= 0) {
      handleOptionClick(autoCompleteResults[selectedIndex].symbol);
    }
  };

  useEffect(() => {
    const fetchResults = async () => {
      const isSymbolSelected = autoCompleteResults.find(
        (result) => result.symbol === query
      );
      if (!isSymbolSelected && query.length >= 1) {
        setError(null);

        try {
          const results = await fetchAutoCompleteResults(query);
          setAutoCompleteResults(results);
        } catch (err) {
          setError('Failed to fetch autocomplete results');
        }
      } else {
        setAutoCompleteResults([]);
      }
    };

    fetchResults();
  }, [query]);

  useEffect(() => {
    if (dropdownRef.current && selectedIndex >= 0) {
      const selectedOption = dropdownRef.current.children[selectedIndex] as HTMLElement;
      selectedOption.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  return (
    <div className={`search-bar-container ${selectedTheme === 'dark' ? 'dark' : ''}`}>
      <div className="search-input-wrapper">
        <FiSearch className="search-icon" /> {/* Added search icon */}
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown} // Add keydown event handler
          placeholder="Search for stocks..."
          className="search-input"
        />
      </div>
      {error && <div className="error-message">{error}</div>}
      {autoCompleteResults.length > 0 && (
        <ul className="dropdown-list" ref={dropdownRef}>
          {autoCompleteResults.map((item, index) => (
            <li
              key={item.symbol}
              onClick={() => handleOptionClick(item.symbol)}
              className={selectedIndex === index ? 'selected' : ''} // Add selected class
            >
              <span className="symbol-name">{item.symbol}</span>
              <span className="symbol-info">{item.symbol_info}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;