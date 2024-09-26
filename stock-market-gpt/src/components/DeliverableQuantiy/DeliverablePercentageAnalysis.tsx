import React, { useEffect, useState } from 'react';
import {
  Button,
  CircularProgress,
  Typography,
  Grid,
  Paper,
} from '@mui/material';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DeliverableData } from '../../interfaces/historicalDataInterface';
import { getDelivereableQuantityData } from '../../services/stockService';
import './DeliverablePercentageAnalysis.style.css';
import { useSelector } from 'react-redux';
import { selectUserSelection } from '../../store/slices/userSelectionSlice';
import DeliverableGraph from './subComponents/DeliverableGraph';

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
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<string>('1w');
  const [loading, setLoading] = useState<boolean>(false);

  const userSelection = useSelector(selectUserSelection);
  const symbol = userSelection?.selection?.symbolSelected || '';

  useEffect(() => {
    const fetchData = async () => {
      if (!symbol) return;

      setLoading(true);
      const to = getToDate();
      const from = getFromDate(selectedTimeFrame, to);

      try {
        const result = await getDelivereableQuantityData(
          from as string,
          to,
          symbol
        );
        setData(result.data);
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
    <Paper elevation={3} className="paper-container">
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
              className="time-frame-button"
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
          <Typography variant="h4" gutterBottom className="graph-title">
            Deliverable Percentage Graph
          </Typography>
          <DeliverableGraph data={data} />
        </>
      )}
    </Paper>
  );
};

export default DeliverablePercentageAnalysis;