import React from "react";
import { Card } from "antd";
import Chart from "react-apexcharts";
import Title from "antd/es/typography/Title";
import { useAllLeaves } from "../../../services/queries/leaveQueries";

const LeaveUtilizationByDepartmentChart: React.FC = () => {
  const { data, isLoading, error } = useAllLeaves();

  if (isLoading) {
    return <Card>Loading...</Card>;
  }

  if (error || !data) {
    return <Card>Error loading data</Card>;
  }

  const processedData = data.reduce(
    (acc: Record<string, number>, leave) => {
      if (!leave.from || !leave.to || !leave.employee?.department) {
        return acc;
      }

      if (!acc[leave.employee.department]) {
        acc[leave.employee.department] = 0;
      }

      const days = Math.ceil(
        (new Date(leave.to).getTime() - new Date(leave.from).getTime()) /
          (1000 * 60 * 60 * 24)
      );

      acc[leave.employee.department] += days;
      return acc;
    },
    {}
  );

  const labels = Object.keys(processedData);
  const chartData = [
    {
      name: "Leave Days",
      data: labels.map((label) => processedData[label]),
    },
  ];

  return (
    <Card>
      <Title level={4}>Leave Utilization by Department</Title>
      <Chart
        options={{
          chart: { type: "bar" },
          xaxis: { categories: labels },
          yaxis: { title: { text: "Days" } },
        }}
        series={chartData}
        type="bar"
        height={350}
        width={400}
      />
    </Card>
  );
};

export default LeaveUtilizationByDepartmentChart;
