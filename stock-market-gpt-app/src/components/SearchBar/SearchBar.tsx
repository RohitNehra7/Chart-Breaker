import React, { useEffect, useState } from 'react';
import { TextField, Autocomplete, Box } from '@mui/material';
import './SearchBar.css'; // Import the CSS file
import { StockMetadata } from '../../interfaces/equityData.interface';

interface SearchBarProps {
  stocks: StockMetadata[];
}

const SearchBar: React.FC<SearchBarProps> = ({ stocks }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStocks, setFilteredStocks] = useState<StockMetadata[]>([]);

  useEffect(() => {
    if (searchTerm) {
      const results = stocks.filter(stock =>
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.identifier.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStocks(results);
    } else {
      setFilteredStocks([]);
    }
  }, [searchTerm, stocks]);

  return (
    <Box className="search-bar-container">
      <Autocomplete
        freeSolo
        options={filteredStocks}
        getOptionLabel={(option) =>
          typeof option === 'string'
            ? option
            : `${option.symbol} (${option.identifier})`
        }
        onInputChange={(event, value) => setSearchTerm(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            className="search-input"
            label="Search by symbol or identifier"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              className: 'text-blue-500 transition duration-200',
            }}
          />
        )}
        renderOption={(props, option, { selected }) => (
          <li {...props} className={`dropdown-item ${selected ? 'selected' : ''}`}>
            <div className="flex items-center space-x-3">
              <span className="symbol">{option.symbol}</span>
              <span className="identifier text-sm text-gray-500">({option.identifier})</span>
            </div>
          </li>
        )}
      />
    </Box>
  );
};

export default SearchBar;
