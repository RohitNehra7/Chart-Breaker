import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import styles from './TickerItem.module.css'; // Import the CSS module
import { MarketIndexData } from '../../../interfaces/marketIndex.interface';

interface TickerItemProps {
  data: MarketIndexData;
}

const TickerItem: React.FC<TickerItemProps> = ({ data }) => {
  const isPositive = data.percentChange > 0;

  return (
    <div className={`${styles['ticker-item']} ${isPositive ? styles['ticker-positive'] : styles['ticker-negative']}`}>
      <div className={styles['ticker-box']}>
        <span className={styles['index-name']}>{data.index}</span>
        <span className={styles['percentage-change']}>
          {isPositive ? (
            <FaArrowUp className={styles['arrow-up']} />
          ) : (
            <FaArrowDown className={styles['arrow-down']} />
          )}
          {data.percentChange.toFixed(2)}%
        </span>
        <span className={styles['high-low']}>
          High: {data.high.toFixed(2)} Low: {data.low.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default TickerItem;
