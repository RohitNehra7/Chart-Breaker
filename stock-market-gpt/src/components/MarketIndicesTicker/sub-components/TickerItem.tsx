import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import styles from './TickerItem.module.css';
import { MarketIndexData } from '../../../interfaces/marketIndex.interface';

interface TickerItemProps {
  data: MarketIndexData;
}

const TickerItem: React.FC<TickerItemProps> = ({ data }) => {
  const isPositive = data.percentChange > 0;

  return (
    <div className={`${styles['ticker-item']} ${isPositive ? styles['ticker-positive'] : styles['ticker-negative']}`}>
      <div className={styles['ticker-box']}>
        {/* Index name at the top */}
        <span className={styles['index-name']}>{data.index}</span>

        {/* Percentage change and last price */}
        <span className={`${styles['percentage-change']} ${isPositive ? styles['positive'] : styles['negative']}`}>
          {isPositive ? (
            <FaArrowUp className={styles['arrow']} />
          ) : (
            <FaArrowDown className={styles['arrow']} />
          )}
          {data.percentChange.toFixed(2)}% ({data.last.toFixed(2)})
        </span>
      </div>
    </div>
  );
};

export default TickerItem;
