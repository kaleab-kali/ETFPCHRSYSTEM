import React from "react";
import Chart from "react-apexcharts";

export const EmployeePerformanceChart: React.FC = () => {
  const chartOptions = {
    chart: {
      type: "line",
      height: 350,
    },
    stroke: {
      width: [3, 3, 3],
      curve: "smooth",
    },
    series: [
      {
        name: "Metric 1",
        data: [120, 100, 180, 150, 240, 220, 190],
      },
      {
        name: "Metric 2",
        data: [90, 140, 110, 200, 130, 180, 170],
      },
      {
        name: "Metric 3",
        data: [60, 80, 70, 120, 150, 110, 140],
      },
    ],
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    },
    yaxis: {
      title: {
        text: "Clients",
      },
    },
  };

  return (
    <Chart
      options={{
        chart: {
          type: "line",
          height: 350,
        },
        stroke: {
          width: [3, 3, 3],
          curve: "smooth",
        },
        series: [
          {
            name: "Metric 1",
            data: [120, 100, 180, 150, 240, 220, 190],
          },
          {
            name: "Metric 2",
            data: [90, 140, 110, 200, 130, 180, 170],
          },
          {
            name: "Metric 3",
            data: [60, 80, 70, 120, 150, 110, 140],
          },
        ],
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        },
        yaxis: {
          title: {
            text: "Clients",
          },
        },
        }}
      series={chartOptions.series}
      type="line"
      height={350}
    />
  );
};
