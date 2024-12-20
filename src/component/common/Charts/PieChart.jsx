import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  BarController,
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
  BarController,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const DoughnutChart = ({ ChartData }) => {
  const dynamicData = {
    labels: ["Open", "In-Progress", "Pending", "Testing"],
    datasets: [
      {
        label: "Task Details",
        data: [
          ChartData?.openTask,
          ChartData?.inCompeleteTask,
          ChartData?.pandingTask,
          ChartData?.testingTask,
        ],

        borderColor: "green",
        backgroundColor: ["#ff000080", "#bce6fd80", "#8bc34a80", "#ffcc0080"],
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
