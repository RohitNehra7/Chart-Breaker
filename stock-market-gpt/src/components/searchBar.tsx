// src/components/SearchBar.tsx

import React, { useState, useEffect } from 'react';

interface SearchBarProps {
  stocks: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({ stocks }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStocks, setFilteredStocks] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      const results = stocks.filter(stock =>
        stock.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStocks(results);
      setIsDropdownOpen(true);
    } else {
      setFilteredStocks([]);
      setIsDropdownOpen(false);
    }
  }, [searchTerm, stocks]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSelect = (stock: string) => {
    setSearchTerm(stock);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search for a stock..."
        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {isDropdownOpen && filteredStocks.length > 0 && (
        <ul className="absolute w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {filteredStocks.map((stock) => (
            <li
              key={stock}
              onClick={() => handleSelect(stock)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {stock} ({stock})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
