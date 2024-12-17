// import React from 'react';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   LineElement,
//   LinearScale,
//   PointElement,
//   CategoryScale,
//   Tooltip,
//   Legend,
//   Title,
// } from 'chart.js';

// // Register the necessary components and scales
// ChartJS.register(LineElement, LinearScale, PointElement, CategoryScale, Tooltip, Legend, Title);

// const Utils = {
//   months: (config) => {
//     const monthNames = [
//       'January', 'February', 'March', 'April', 'May', 'June', 'July', 
//       'August', 'September', 'October', 'November', 'December'
//     ];
//     return monthNames.slice(0, config.count);
//   },
// //   numbers: (config) => {
// //     return Array.from({ length: config.count }, () => 
// //       Math.floor(Math.random() * (config.max - config.min + 1)) + config.min
// //     );
// //   },
//   transparentize: (color, opacity) => {
//     const alpha = opacity === undefined ? 1 : 1 - opacity;
//     return color.replace(/rgba?$$(\d+), (\d+), (\d+),?(\d+)?$$/, `rgba($1, $2, $3, ${alpha})`);
//   },
//   CHART_COLORS: {
//     red: 'rgba(255, 99, 132, 1)',
//     blue: 'rgba(54, 162, 235, 1)',
//   },
// };

// const DATA_COUNT = 10;
// const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 }; // Update min and max to 0 and 100

// const labels = Utils.months({ count: DATA_COUNT });
// const data = {
//   labels: labels,
//   datasets: [
//     {
//       label: 'No of Task',
//       data: Utils.numbers(NUMBER_CFG),
//       borderColor: Utils.CHART_COLORS.red,
//       backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
//     },
//     {
//       label: 'Task Completed',
//       data: Utils.numbers(NUMBER_CFG),
//       borderColor: Utils.CHART_COLORS.blue,
//       backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
//     }
//   ]
// };

// const LineChart = () => {
//   const config = {
//     type: 'line',
//     data: data,
//     options: {
//       responsive: true,
//       scales: {
//         y: {
//           min: 0, // Set the y-axis minimum
//           max: 1000, // Set the y-axis maximum
//         }
//       },
//       plugins: {
//         legend: {
//           position: 'top',
//         },
//         title: {
//           display: true,
//           text: 'Chart.js Line Chart'
//         }
//       }
//     },
//   };

//   return (
//     <div>
//       <Line data={data} options={config.options} />
//     </div>
//   );
// };

// export default LineChart;

