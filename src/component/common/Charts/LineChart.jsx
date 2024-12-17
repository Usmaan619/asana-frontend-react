import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

// Register the necessary components and scales
ChartJS.register(LineElement, LinearScale, PointElement, CategoryScale, Tooltip, Legend, Title);

const LineChart = ({ ChartData, }) => {
    console.log('ChartData: ', ChartData);



  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const datasets = [
    {
      label: 'Total Task',
      data: [0, ChartData?.totalTasks], // Dynamic data for Dataset 1
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Completed Task',
      data: [0,ChartData?.compeletedTask], // Dynamic data for Dataset 2
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
    },
  ];
  const data = {
    labels: labels,
    datasets: datasets,
  };
  const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      scales: {
        y: {
          min: 0, // Set the y-axis minimum
          max:Math.round(ChartData?.totalTasks / 100) *  100, // Set the y-axis maximum
        }
      },
    //   plugins: {
    //     legend: {
    //       position: 'top',
    //     },
     
    //   }
    },
  };

  return (
    <div>
      <Line height={250} data={data} options={config.options} />
    </div>
  );
};

export default LineChart;