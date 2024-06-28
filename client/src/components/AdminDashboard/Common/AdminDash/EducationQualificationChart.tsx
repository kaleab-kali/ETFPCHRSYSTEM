import React from "react";
import ReactApexChart from "react-apexcharts";
import { Card, Typography } from "antd";
import { ApexOptions } from "apexcharts";

const { Title } = Typography;

interface Props {
  educationData: Record<string, number>;
  educationLevels: string[];
}

const EducationQualificationChart: React.FC<Props> = ({
  educationData,
  educationLevels,
}) => {
  const educationOptions:ApexOptions = {
    chart: {
      type: "pie",
      height: 300,
    },
    labels: educationLevels,
    legend: {
      position: "bottom",
    },
  };

  const educationSeries = educationLevels.map(
    (level) => educationData[level] || 0
  );

  return (
    <Card>
      <Title level={4}>Educational Qualifications</Title>
      <ReactApexChart
        options={educationOptions}
        series={educationSeries}
        type="pie"
        height={300}
      />
    </Card>
  );
};

export default EducationQualificationChart;
