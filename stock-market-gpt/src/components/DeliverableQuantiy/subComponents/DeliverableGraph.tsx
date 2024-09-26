import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables, TooltipItem } from 'chart.js';
import { DeliverableData } from '../../../interfaces/historicalDataInterface';
import './DeliverableGraph.style.css';

// Register all required components
Chart.register(...registerables);

interface DeliverableGraphProps {
  data: DeliverableData[];
}

const DeliverableGraph: React.FC<DeliverableGraphProps> = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.COP_TRADED_DT),
    datasets: [
      {
        label: 'Deliverable Percentage',
        data: data.map((item) => item.COP_DELIV_PERC),
        borderColor: 'rgba(0, 123, 255, 1)', // Blue line
        backgroundColor: 'rgba(0, 123, 255, 0.2)', // Light blue fill
        fill: true,
        tension: 0.1,
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
            weight: 'bold' as 'bold', // Correct type for weight
            color: '#ffffff', // White text
          },
        },
        ticks: {
          font: {
            size: 14,
            weight: 'bold' as 'bold', // Correct type for weight
            color: '#ffffff', // White text
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Light grey grid lines
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
          font: {
            size: 14,
            weight: 'bold' as 'bold', // Correct type for weight
            color: '#ffffff', // White text
          },
        },
        ticks: {
          font: {
            size: 14,
            weight: 'bold' as 'bold', // Correct type for weight
            color: '#ffffff', // White text
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Light grey grid lines
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14,
            weight: 'bold' as 'bold', // Correct type for weight
            color: '#ffffff', // White text
          },
        },
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems: TooltipItem<'line'>[]) => `Date: ${tooltipItems[0].label}`,
          label: (tooltipItem: TooltipItem<'line'>) => {
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
  };

  return (
    <div className="graph-container">
      <Line data={chartData} options={options} height={300} className="line-chart" />
    </div>
  );
};

export default DeliverableGraph;