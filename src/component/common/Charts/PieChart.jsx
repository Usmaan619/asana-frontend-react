// import React, { useState } from 'react';
// import { PolarArea } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   Tooltip,
//   Legend,
//   Title,
//   ArcElement,
//   RadialLinearScale,
// } from 'chart.js';

// // Register necessary components
// ChartJS.register(Tooltip, Legend, Title, ArcElement, RadialLinearScale);

// const PieChart = () => {
//   const [dataValues, setDataValues] = useState([30, 20, 40, 50, 60]); // Default dynamic values

//   const labels = ['Red', 'Orange', 'Yellow', 'Green', 'Blue'];
//   const data = {
//     labels: labels,
//     datasets: [
//       {
//         label: 'Dataset 1',
//         data: dataValues,
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.5)',
//           'rgba(255, 159, 64, 0.5)',
//           'rgba(255, 205, 86, 0.5)',
//           'rgba(75, 192, 192, 0.5)',
//           'rgba(54, 162, 235, 0.5)',
//         ],
//       },
//     ],
//   };

//   const handleChange = (event, index) => {
//     const newValues = [...dataValues];
//     newValues[index] = event.target.value;
//     setDataValues(newValues);
//   };

//   return (
//     <div>
//       <h2>Polar Area Chart with Dynamic Values</h2>
//       <PolarArea
//         data={data}
//         options={{
//           responsive: true,
//           scales: {
//             r: {
//               pointLabels: {
//                 display: true,
//                 centerPointLabels: true,
//                 font: {
//                   size: 18,
//                 },
//               },
//             },
//           },

//         }}
//       />

//     </div>
//   );
// };

// export default PieChart;

// import React, { useState } from 'react';
// import { Doughnut } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

// // Register necessary components from Chart.js
// ChartJS.register(ArcElement, Tooltip, Legend, Title);

// const DoughnutChart = ({ChartData}) => {
//   const [dataValues, setDataValues] = useState([10, 20, 30, 40, 50]); // Initial values
//   const data = {
//     labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
//     datasets: [
//       {
//         label: 'Task Details',
//         data: dataValues,
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.6)',
//           'rgba(255, 159, 64, 0.6)',
//           'rgba(255, 205, 86, 0.6)',
//           'rgba(75, 192, 192, 0.6)',
//           'rgba(54, 162, 235, 0.6)',
//         ],
//       },
//     ],
//   };

//   const options = {
//     responsive: true,

//   };

//   return (
//       <Doughnut height={10} width={10} data={data} options={options} />

//   );
// };

import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";

// Register required Chart.js components
ChartJS.register(
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const DoughnutChart = ({ ChartData }) => {
  const dynamicData = {
    labels: [ "Open", "In-Progress", "Pending", "Testing"],
    datasets: [
      {
        label: "Task Details",
        data: [
          ChartData?.openTask,
          ChartData?.inCompeleteTask,
          ChartData?.pandingTask    ,
          ChartData?.testingTask,
        ],
        borderColor: "green",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        stack: "combined",
        type: "bar",
      },
    ],
  };
  // Default dynamic values if none are provided
  const DATA_COUNT = dynamicData?.length || 7;
  const defaultLabels = Array.from(
    { length: DATA_COUNT },
    (_, i) => `Month ${i + 1}`
  );
  const labels = dynamicData?.labels || defaultLabels;

  // Default datasets or map dynamicData if provided
  const datasets = dynamicData?.datasets || [
    {
      label: "Dataset 1",
      data: Array.from({ length: DATA_COUNT }, () =>
        Math.floor(Math.random() * 100)
      ),
      borderColor: "red",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      stack: "combined",
      type: "bar",
    },
    {
      label: "Dataset 2",
      data: Array.from({ length: DATA_COUNT }, () =>
        Math.floor(Math.random() * 100)
      ),
      borderColor: "blue",
      backgroundColor: "rgba(54, 162, 235, 0.5)",
      stack: "combined",
    },
  ];

  // Chart configuration
  const config = {
    type: "line",
    data: {
      labels: labels,
      datasets: datasets,
    },
    options: {
      responsive: true,
      scales: {
        y: {
          stacked: true,
        },
      },
    },
  };

  return (
    <Chart
      height={250}
      type="bar"
      data={config.data}
      options={config.options}
    />
  );
};

export default DoughnutChart;
