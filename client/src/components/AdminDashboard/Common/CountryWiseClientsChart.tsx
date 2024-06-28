import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export const CountryWiseClientsChart: React.FC = () => {
  const chartOptions: ApexOptions = {
    chart: {
      type: "donut",
      height: 350,
    },
    labels: ["India", "USA", "Sri Lanka", "Australia"],
    legend: {
      position: "bottom",
    },
  };

  const series = [23, 32, 12, 32];

  return (
    <Chart options={chartOptions} series={series} type="donut" height={350} />
  );
};
