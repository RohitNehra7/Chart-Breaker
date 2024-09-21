import React, { useEffect, useState } from 'react';
import SearchBar from '../components/searchBar';
import axios from 'axios';

const HomePage: React.FC = () => {

  const [stocks, setStocks] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch stock data from the backend using axios
    axios
      .get('/api') // Proxy handles the base URL
      .then((response) => {
        setStocks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-2xl font-bold mb-4">Stock Analysis App</h1>
        <SearchBar stocks={stocks} />
      </header>
    </div>
  );
};

export default HomePage;
