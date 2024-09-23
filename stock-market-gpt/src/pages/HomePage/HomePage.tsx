import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../../components/SearchBar/SearchBar.component';
import Loader from '../../components/Loader/Loader';
import MarketIndicesTicker from '../../components/MarketIndicesTicker/MarketIndicesTicker';
import './HomePage.css';
import { AppDispatch, RootState } from '../../store/store';
import { fetchIndices } from '../../store/slices/indicesSlice';
import DeliverablePercentageGraph from '../../components/DeliverableQuantiy/DeliverablePercentageGraph';

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="home-container">
      {/* Move the ticker component to the top */}
      <div className='ticker-container-wrapper'>
        <MarketIndicesTicker />
      </div>
      <header className="header">
        <h1 className="title">Stock GPT</h1>
        <p className="reactive-text">Find your favorite stocks quickly!</p>
        <div className="search-bar-wrapper">
          <SearchBar />
        </div>
      </header>

      {/* Add the DeliverablePercentageGraph component here */}
      <div className="graph-container mt-4">
        {/* Pass the selected symbol from your application state or search bar to the graph component */}
        <DeliverablePercentageGraph symbol={'RADICO'} />
      </div>
    </div>
  );
};

export default HomePage;
