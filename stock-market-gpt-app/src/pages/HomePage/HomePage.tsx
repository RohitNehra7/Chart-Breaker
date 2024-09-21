import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../../components/SearchBar/SearchBar';
import Loader from '../../components/Loader/Loader';
import MarketIndicesTicker from '../../components/MarketIndicesTicker/MarketIndicesTicker'; // Import the component
import './HomePage.css';
import { AppDispatch, RootState } from '../../store/store';
import { fetchStocks } from '../../store/slices/stocksSlice';
import { fetchIndices } from '../../store/slices/indicesSlice';

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { stocks, loading: stocksLoading, error: stocksError } = useSelector((state: RootState) => state.stocks);
  const { indices, loading: indicesLoading, error: indicesError } = useSelector((state: RootState) => state.indices);

  useEffect(() => {
    dispatch(fetchStocks());
    dispatch(fetchIndices());
  }, [dispatch]);

  if (stocksLoading || indicesLoading) {
    return <Loader />;
  }

  if (stocksError) {
    return <div className="text-red-500">Error fetching stocks: {stocksError}</div>;
  }

  if (indicesError) {
    return <div className="text-red-500">Error fetching indices: {indicesError}</div>;
  }

  return (
    <div className="home-container">
      <header className="header">
        <MarketIndicesTicker indicesData={indices} />
        <h1 className="title">Stock GPT</h1>
        <p className="reactive-text">Find your favorite stocks quickly!</p>
        <div className="search-bar-wrapper">
          <SearchBar stocks={stocks} />
        </div>
      </header>
    </div>
  );
};

export default HomePage;
