import React from 'react';
import { useDispatch } from 'react-redux';
import SearchBar from '../../components/SearchBar/SearchBar.component';
import MarketIndicesTicker from '../../components/MarketIndicesTicker/MarketIndicesTicker';
import './HomePage.css';
import { AppDispatch } from '../../store/store';
import DeliverablePercentageGraph from '../../components/DeliverableQuantiy/DeliverablePercentageAnalysis';

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
        <DeliverablePercentageGraph />
      </div>
    </div>
  );
};

export default HomePage;
