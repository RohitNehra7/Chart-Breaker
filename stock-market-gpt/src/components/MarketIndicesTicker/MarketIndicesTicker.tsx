import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './MarketIndicesTicker.module.css';
import TickerItem from './sub-components/TickerItem';
import { AppDispatch } from '../../store/store';
import { fetchIndices, selectIndices } from '../../store/slices/indicesSlice';
import { Puff } from 'react-loader-spinner'; // Loader
import RefreshIcon from '@mui/icons-material/Refresh'; // Refresh icon

const MarketIndicesTicker: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { indices, loading, error } = useSelector(selectIndices);
  const [isRefreshing, setIsRefreshing] = useState(true); // Set initial state to true

  useEffect(() => {
    handleRefresh(); // Fetch indices on initial load
  }, [dispatch]);

  const marketIndicesData = indices.filter(
    (index) => index.key === 'BROAD MARKET INDICES'
  );

  const sectoralIndices = indices.filter(
    (index) => index.key === 'SECTORAL INDICES'
  );

  const handleRefresh = () => {
    setIsRefreshing(true);
    dispatch(fetchIndices()).then(() => {
      setIsRefreshing(false);
    });
  };

  return (
    <div>
        {(indices.length === 0) && ( // Check for loading or refreshing
          <div className={styles.loader}>
            <Puff color="#00BFFF" height={40} width={40} />
          </div>
        )}
      <div className={styles['ticker-container']}>
        {(isRefreshing) && ( // Check for loading or refreshing
          <div className={styles.loader}>
            <Puff color="#00BFFF" height={40} width={40} />
          </div>
        )}
        {error && <p>Error: {error}</p>}
        <div className={styles['ticker-content']}>
          {marketIndicesData.map((data) => (
            <TickerItem key={data.indexSymbol} data={data} />
          ))}
        </div>
      </div>

      <div className={styles['ticker-container']} style={{ marginTop: '1rem' }}>
        {(isRefreshing) && ( // Check for loading or refreshing
          <div className={styles.loader}>
            <Puff color="#00BFFF" height={40} width={40} />
          </div>
        )}
        {error && <p>Error: {error}</p>}
        <div className={styles['ticker-content']}>
          {sectoralIndices.map((data) => (
            <TickerItem key={data.indexSymbol} data={data} />
          ))}
        </div>
      </div>

      <div className={styles['refresh-button-container']}>
        <button
          className={styles['refresh-button']}
          onClick={handleRefresh}
        >
          <RefreshIcon className="mr-2" /> Refresh
        </button>
      </div>
    </div>
  );
};

export default MarketIndicesTicker;
