import React from "react";
import ReactApexChart from "react-apexcharts";
import { Card, Typography } from "antd";
import { ApexOptions } from "apexcharts";

const { Title } = Typography;

interface Props {
  departmentData: Record<string, number>;
}

const DepartmentSalaryDistributionChart: React.FC<Props> = ({
  departmentData,
}) => {
  const departmentOptions:ApexOptions = {
    chart: {
      type: "bar",
      height: 300,
    },
    xaxis: {
      categories: Object.keys(departmentData),
    },
    legend: {
      position: "bottom",
    },
  };

  const departmentSeries = [
    {
      name: "Salary",
      data: Object.values(departmentData),
    },
  ];

  return (
    <Card>
      <Title level={4}>Department-wise Salary Distribution</Title>
      <ReactApexChart
        options={departmentOptions}
        series={departmentSeries}
        type="bar"
        height={300}
      />
    </Card>
  );
};

export default DepartmentSalaryDistributionChart;
