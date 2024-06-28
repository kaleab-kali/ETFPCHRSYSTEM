import React from "react";
import ReactApexChart from "react-apexcharts";
import { Card, Typography } from "antd";
import { ApexOptions } from "apexcharts";

const { Title } = Typography;

interface Props {
  genderData: Record<string, number>;
}

const GenderDistributionChart: React.FC<Props> = ({ genderData }) => {
  const genderOptions: ApexOptions = {
    chart: {
      type: "pie",
      height: 300,
    },
    labels: Object.keys(genderData),
    legend: {
      position: "bottom",
    },
  };

  const genderSeries = Object.values(genderData);

  return (
    <Card>
      <Title level={4}>Gender Distribution</Title>
      <ReactApexChart
        options={genderOptions}
        series={genderSeries}
        type="pie"
        height={300}
      />
    </Card>
  );
};

export default GenderDistributionChart;
