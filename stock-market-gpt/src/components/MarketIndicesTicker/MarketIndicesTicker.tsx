import React, { useState } from 'react';
import styles from './MarketIndicesTicker.module.css';
import { MarketIndexData } from '../../interfaces/marketIndex.interface';
import TickerItem from './sub-components/TickerItem';

interface MarketIndicesTickerProps {
  indicesData: MarketIndexData[];
}

const MarketIndicesTicker: React.FC<MarketIndicesTickerProps> = ({
  indicesData,
}) => {
  const filteredData = indicesData.filter(
    (index) => index.key === 'BROAD MARKET INDICES'
  );
  return (
    <div className={styles['ticker-container']}>
      <div className={styles['ticker-content']}>
        {filteredData.map((data) => (
          <TickerItem key={data.indexSymbol} data={data} />
        ))}
        {filteredData.map((data) => (
          <TickerItem key={`${data.indexSymbol}-duplicate`} data={data} />
        ))}
      </div>
    </div>
  );
};

export default MarketIndicesTicker;
