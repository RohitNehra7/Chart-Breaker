import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../../components/SearchBar/SearchBar.component';
import MarketIndicesTicker from '../../components/MarketIndicesTicker/MarketIndicesTicker';
import DeliverablePercentageGraph from '../../components/DeliverableQuantiy/DeliverablePercentageAnalysis';
import { AppDispatch } from '../../store/store';
import { selectSelectedTheme } from '../../store/slices/userSelectionSlice';
import './HomePage.css';

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedTheme = useSelector(selectSelectedTheme);

  return (
    <div className={`home-container ${selectedTheme === 'dark' ? 'dark' : ''}`}>
      {/* Move the ticker component to the top */}
      <div className="ticker-container-wrapper">
        <MarketIndicesTicker />
      </div>
      <h1 className="title">Stock GPT</h1>
      <p className="reactive-text">Find your favorite stocks quickly!</p>
      <div className="search-bar-wrapper">
        <SearchBar />
      </div>

      {/* Add the DeliverablePercentageGraph component here */}
      <div className="graph-container">
        {/* Pass the selected symbol from your application state or search bar to the graph component */}
        <DeliverablePercentageGraph />
      </div>
    </div>
  );
};

export default HomePage;