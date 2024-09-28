import React from 'react';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, registerables, TooltipItem, Scale } from 'chart.js';
import { useSelector } from 'react-redux';
import { DeliverableData } from '../../../interfaces/historicalDataInterface';
import { selectSelectedTheme } from '../../../store/slices/userSelectionSlice';
import styles from './DeliverableGraph.module.css';

// Register all required components
ChartJS.register(...registerables);

interface DeliverableGraphProps {
  data: DeliverableData[];
  closingPrices: number[];
}

const DeliverableGraph: React.FC<DeliverableGraphProps> = ({ data, closingPrices }) => {
  const selectedTheme = useSelector(selectSelectedTheme);

  const chartData = {
    labels: data.map((item) => item.COP_TRADED_DT),
    datasets: [
      {
        type: 'line' as const,
        label: 'Deliverable Percentage',
        data: data.map((item) => item.COP_DELIV_PERC),
        borderColor: 'rgba(0, 123, 255, 1)', // Blue line
        backgroundColor: 'rgba(0, 123, 255, 0.2)', // Light blue fill
        fill: true,
        tension: 0.1,
        yAxisID: 'y',
      },
      {
        type: 'bar' as const,
        label: 'Traded Quantity',
        data: data.map((item) => item.COP_TRADED_QTY),
        backgroundColor: 'rgba(255, 99, 132, 0.5)', // Red bars
        yAxisID: 'y1',
      },
      {
        type: 'bar' as const,
        label: 'Delivered Quantity',
        data: data.map((item) => item.COP_DELIV_QTY),
        backgroundColor: 'rgba(75, 192, 192, 0.5)', // Green bars
        yAxisID: 'y1',
      },
      {
        type: 'line' as const,
        label: 'Closing Price',
        data: closingPrices,
        borderColor: 'rgba(255, 206, 86, 1)', // Yellow line
        backgroundColor: 'rgba(255, 206, 86, 0.2)', // Light yellow fill
        fill: false,
        tension: 0.1,
        yAxisID: 'y2', // New y-axis for the closing price
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Percentage (%)',
          font: {
            size: 14,
            weight: 'bold' as 'bold',
            color: selectedTheme === 'dark' ? '#ffffff' : '#000000',
          },
        },
        ticks: {
          font: {
            size: 14,
            weight: 'bold' as 'bold',
            color: selectedTheme === 'dark' ? '#ffffff' : '#000000',
          },
        },
        grid: {
          color: selectedTheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
      y1: {
        beginAtZero: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Quantity',
          font: {
            size: 14,
            weight: 'bold' as 'bold',
            color: selectedTheme === 'dark' ? '#ffffff' : '#000000',
          },
        },
        ticks: {
          font: {
            size: 14,
            weight: 'bold' as 'bold',
            color: selectedTheme === 'dark' ? '#ffffff' : '#000000',
          },
          callback: function(value: string | number) {
            if (typeof value === 'number') {
              if (value >= 1000000) {
                return (value / 1000000).toFixed(1) + 'M'; // Convert to millions
              } else if (value >= 1000) {
                return (value / 1000).toFixed(1) + 'K'; // Convert to thousands
              }
            }
            return value;
          },
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      y2: {
        beginAtZero: false,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Closing Price',
          font: {
            size: 14,
            weight: 'bold' as 'bold',
            color: selectedTheme === 'dark' ? '#ffffff' : '#000000',
          },
        },
        ticks: {
          font: {
            size: 14,
            weight: 'bold' as 'bold',
            color: selectedTheme === 'dark' ? '#ffffff' : '#000000',
          },
          // Set the minimum and maximum values with a buffer
          min: Math.min(...closingPrices) * 0.95,
          max: Math.max(...closingPrices) * 1.05,
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
          font: {
            size: 14,
            weight: 'bold' as 'bold',
            color: selectedTheme === 'dark' ? '#ffffff' : '#000000',
          },
        },
        ticks: {
          font: {
            size: 14,
            weight: 'bold' as 'bold',
            color: selectedTheme === 'dark' ? '#ffffff' : '#000000',
          },
        },
        grid: {
          color: selectedTheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14,
            weight: 'bold' as 'bold',
            color: selectedTheme === 'dark' ? '#ffffff' : '#000000',
          },
        },
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems: TooltipItem<'line' | 'bar'>[]) => `Date: ${tooltipItems[0].label}`,
          label: (tooltipItem: TooltipItem<'line' | 'bar'>) => {
            const percentage = tooltipItem.raw;
            const deliveredQty = data[tooltipItem.dataIndex].COP_DELIV_QTY;
            const tradedQty = data[tooltipItem.dataIndex].COP_TRADED_QTY;
            const closingPrice = closingPrices[tooltipItem.dataIndex];
            if (tooltipItem.dataset.label === 'Deliverable Percentage') {
              return `Percentage: ${percentage}%`;
            } else if (tooltipItem.dataset.label === 'Traded Quantity') {
              return `Traded Quantity: ${tradedQty}`;
            } else if (tooltipItem.dataset.label === 'Delivered Quantity') {
              return `Delivered Quantity: ${deliveredQty}`;
            } else if (tooltipItem.dataset.label === 'Closing Price') {
              return `Closing Price: ${closingPrice}`;
            }
            return '';
          },
        },
      },
    },
  };

  return (
    <div className={`${styles['graph-container']} ${selectedTheme === 'dark' ? styles.dark : styles.light}`}>
      <Chart type="bar" data={chartData} options={options} className={styles['line-chart']} />
    </div>
  );
};

export default DeliverableGraph;