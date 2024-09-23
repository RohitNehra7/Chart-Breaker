import React, { useState, useEffect } from 'react';
import './SearchBar.style.css'; // Import the updated CSS file
import { StockSymbolData } from '../../interfaces/marketIndex.interface';
import { fetchAutoCompleteResults } from '../../services/stockService';
import { FiSearch } from 'react-icons/fi'; // Import search icon from react-icons

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [autoCompleteResults, setAutoCompleteResults] = useState<StockSymbolData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleOptionClick = (symbol: string) => {
    setQuery(symbol);
  };

  useEffect(() => {
    const fetchResults = async () => {
      const isSymbolSelected = autoCompleteResults.find((result) => result.symbol === query);
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

  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <FiSearch className="search-icon" /> {/* Added search icon */}
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for stocks..."
          className="search-input"
        />
      </div>
      {error && <div className="error-message">{error}</div>}
      {autoCompleteResults.length > 0 && (
        <ul className="dropdown-list">
          {autoCompleteResults.map((item) => (
            <li key={item.symbol} onClick={() => handleOptionClick(item.symbol)}>
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
