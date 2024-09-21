import React, { useState } from 'react';
import styles from './MarketIndicesTicker.module.css'; // Import the CSS module
import { MarketIndexData } from '../../interfaces/marketIndex.interface';
import TickerItem from './sub-components/TickerItem';

interface MarketIndicesTickerProps {
  indicesData: MarketIndexData[];
}

const MarketIndicesTicker: React.FC<MarketIndicesTickerProps> = ({ indicesData }) => {
  const [selectedKey, setSelectedKey] = useState<string>(''); // State to manage the selected filter

  // Create a unique set of keys for filtering
  const uniqueKeys = Array.from(new Set(indicesData.map(data => data.key)));

  // Filtered indices based on the selected key
  const filteredData = selectedKey
    ? indicesData.filter(data => data.key === selectedKey)
    : indicesData;

  return (
    <div className={styles['ticker-container']}>
      {/* Dropdown for selecting the key type, positioned at the top left */}
    <select
        className={`${styles['filter-dropdown']} mb-4`} // Add the class here
        onChange={e => setSelectedKey(e.target.value)}
        value={selectedKey}>
        <option value="">All</option>
        {uniqueKeys.map(key => (
            <option key={key} value={key}>
                {key}
            </option>
        ))}
    </select>

      
      <div className={styles['ticker-content']}>
        {/* First set of tickers */}
        {filteredData.map(data => (
          <TickerItem key={data.indexSymbol} data={data} />
        ))}

        {/* Second set of tickers for seamless effect */}
        {filteredData.map(data => (
          <TickerItem key={`${data.indexSymbol}-duplicate`} data={data} />
        ))}
      </div>
    </div>
  );
};

export default MarketIndicesTicker;
