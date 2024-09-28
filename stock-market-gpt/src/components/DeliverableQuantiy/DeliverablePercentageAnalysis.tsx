import React, { useEffect, useState } from 'react';
import {
  Button,
  CircularProgress,
  Typography,
  Paper,
  Grid,
} from '@mui/material';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DeliverableData } from '../../interfaces/historicalDataInterface';
import { getDelivereableQuantityData, getPriceInformationData } from '../../services/stockService';
import { useSelector } from 'react-redux';
import { selectSymbolSelected, selectSelectedTheme } from '../../store/slices/userSelectionSlice';
import DeliverableGraph from './subComponents/DeliverableGraph';
import styles from './DeliverablePercentageAnalysis.module.css';

// Register all required components
dayjs.extend(customParseFormat);

const timeFrames = [
  { label: '1 Week', value: '1w' },
  { label: '1 Month', value: '1m' },
  { label: '3 Months', value: '3m' },
  { label: '6 Months', value: '6m' },
];

const DeliverablePercentageAnalysis: React.FC = () => {
  const [data, setData] = useState<DeliverableData[]>([]);
  const [closingPrices, setClosingPrices] = useState<number[]>([]);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<string>('1w');
  const [loading, setLoading] = useState<boolean>(false);

  const symbol = useSelector(selectSymbolSelected) || '';
  const selectedTheme = useSelector(selectSelectedTheme);

  useEffect(() => {
    const fetchData = async () => {
      if (!symbol) return;

      setLoading(true);
      const to = getToDate();
      const from = getFromDate(selectedTimeFrame, to);

      try {
        const deliverableResult = await getDelivereableQuantityData(from as string, to, symbol);
        setData(deliverableResult.data);

        // the order of the closing prices should be reversed because the data is returned in opposite date order w.r.t deliverable data
        const priceResult = await getPriceInformationData(from as string, to, symbol);
        const closingPrices = priceResult.data.map(item => item.CH_CLOSING_PRICE).reverse();
        setClosingPrices(closingPrices);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol, selectedTimeFrame]);

  const getToDate = () => {
    let today = dayjs();
    while (today.day() === 0 || today.day() === 6) {
      today = today.subtract(1, 'day');
    }
    return today.format('DD-MM-YYYY');
  };

  const getFromDate = (timeFrame: string, toDate: string) => {
    let fromDate = dayjs(toDate, 'DD-MM-YYYY');

    switch (timeFrame) {
      case '1w':
        fromDate = fromDate.subtract(1, 'week');
        break;
      case '1m':
        fromDate = fromDate.subtract(1, 'month');
        break;
      case '3m':
        fromDate = fromDate.subtract(3, 'months');
        break;
      case '6m':
        fromDate = fromDate.subtract(6, 'months');
        break;
      default:
        return fromDate.format('DD-MM-YYYY');
    }

    while (fromDate.day() === 0 || fromDate.day() === 6) {
      fromDate = fromDate.subtract(1, 'day');
    }

    return fromDate.format('DD-MM-YYYY');
  };

  const handleTimeFrameChange = (timeFrame: string) => {
    setSelectedTimeFrame(timeFrame);
  };

  return (
    <Paper elevation={3} className={`${styles['paper-container']} ${selectedTheme === 'dark' ? styles.dark : styles.light}`}>
      <Grid container spacing={2} className="mb-4">
        {timeFrames.map((timeFrame) => (
          <Grid item xs={6} sm={3} key={timeFrame.value}>
            <Button
              onClick={() => handleTimeFrameChange(timeFrame.value)}
              variant={
                selectedTimeFrame === timeFrame.value ? 'contained' : 'outlined'
              }
              color="primary"
              fullWidth
              className={`${styles['time-frame-button']} ${selectedTheme === 'dark' ? styles.dark : styles.light} ${selectedTimeFrame === timeFrame.value ? styles.selected : ''}`}
            >
              {timeFrame.label}
            </Button>
          </Grid>
        ))}
      </Grid>

      {loading ? (
        <div className="text-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          <Typography variant="h4" gutterBottom className={`${styles['graph-title']} ${selectedTheme === 'dark' ? styles.dark : styles.light}`}>
            Deliverable Percentage Graph
          </Typography>
          <DeliverableGraph data={data} closingPrices={closingPrices} />
        </>
      )}
    </Paper>
  );
};

export default DeliverablePercentageAnalysis;