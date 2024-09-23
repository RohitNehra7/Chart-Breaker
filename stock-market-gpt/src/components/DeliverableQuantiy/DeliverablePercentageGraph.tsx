import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Typography, Grid, Paper } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DeliverableData } from '../../interfaces/historicalDataInterface';
import { getDelivereableQuantityData } from '../../services/stockService';
import './DeliverablePercentageGraph.style.css';

// Register all required components
Chart.register(...registerables);

dayjs.extend(customParseFormat);

interface DeliverablePercentageGraphProps {
  symbol: string;
}

const timeFrames = [
  { label: '1 Day', value: '1d' },
  { label: '1 Week', value: '1w' },
  { label: '1 Month', value: '1m' },
  { label: '3 Months', value: '3m' },
  { label: '6 Months', value: '6m' },
];

const DeliverablePercentageGraph: React.FC<DeliverablePercentageGraphProps> = ({ symbol }) => {
  const [data, setData] = useState<DeliverableData[]>([]);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<string>('1w');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const to = dayjs().format('DD-MM-YYYY');
      const from = getFromDate(selectedTimeFrame);

      try {
        const result = await getDelivereableQuantityData(from as string, to, symbol);
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol, selectedTimeFrame]);

  const getFromDate = (timeFrame: string) => {
    const today = dayjs();
    let fromDate = today;

    switch (timeFrame) {
      case '1d':
        fromDate = today.subtract(1, 'day');
        break;
      case '1w':
        fromDate = today.subtract(1, 'week');
        break;
      case '1m':
        fromDate = today.subtract(1, 'month');
        break;
      case '3m':
        fromDate = today.subtract(3, 'months');
        break;
      case '6m':
        fromDate = today.subtract(6, 'months');
        break;
      default:
        return today;
    }

    return adjustForWeekdays(fromDate).format('DD-MM-YYYY');
  };

  const adjustForWeekdays = (date: dayjs.Dayjs) => {
    if (date.day() === 6) {
      return date.subtract(1, 'day');
    } else if (date.day() === 0) {
      return date.subtract(2, 'days');
    }
    return date;
  };

  const handleTimeFrameChange = (timeFrame: string) => {
    setSelectedTimeFrame(timeFrame);
  };

  const chartData = {
    labels: data.map(item => item.COP_TRADED_DT),
    datasets: [
      {
        label: 'Deliverable Percentage',
        data: data.map(item => item.COP_DELIV_PERC),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.1,
      },
    ],
  };

  return (
    <Paper elevation={3} className="paper-container">
      <Grid container spacing={2} className="mb-4">
        {timeFrames.map((timeFrame) => (
          <Grid item xs={6} sm={4} key={timeFrame.value}>
            <Button
              onClick={() => handleTimeFrameChange(timeFrame.value)}
              variant={selectedTimeFrame === timeFrame.value ? 'contained' : 'outlined'}
              color="primary"
              fullWidth
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
        <div className="graph-container">
          <Typography variant="h6" gutterBottom className="font-bold">
            Deliverable Percentage Graph
          </Typography>
          <Line 
            data={chartData} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Percentage (%)',
                  },
                },
                x: {
                  title: {
                    display: true,
                    text: 'Date',
                  },
                },
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    title: (tooltipItems) => `Date: ${tooltipItems[0].label}`,
                    label: (tooltipItem) => {
                      const percentage = tooltipItem.raw;
                      const deliveredQty = data[tooltipItem.dataIndex].COP_DELIV_QTY;
                      const tradedQty = data[tooltipItem.dataIndex].COP_TRADED_QTY;
                      return [
                        `Percentage: ${percentage}%`,
                        `Delivered Quantity: ${deliveredQty}`,
                        `Traded Quantity: ${tradedQty}`,
                      ];
                    },
                  },
                },
              },
            }} 
            height={300}
            className="line-chart"
          />
        </div>
      )}
    </Paper>
  );
};

export default DeliverablePercentageGraph;
