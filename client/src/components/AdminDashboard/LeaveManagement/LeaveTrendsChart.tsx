import React from "react";
import { Card } from "antd";
import Chart from "react-apexcharts";
import Title from "antd/es/typography/Title";
import { useAllLeaves } from "../../../services/queries/leaveQueries";

const EmployeeLeaveTrendsChart: React.FC = () => {
  const { data, isLoading, error } = useAllLeaves();

  if (isLoading) {
    return <Card>Loading...</Card>;
  }

  if (error || !data) {
    return <Card>Error loading data</Card>;
  }

  const processedData = data.reduce(
    (acc: Record<string, Record<string, number>>, leave) => {
      if (!leave.from || !leave.to || !leave.employeeId) {
        return acc;
      }

      const leaveMonth = new Date(leave.from).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      });

      if (!acc[leave.employeeId]) {
        acc[leave.employeeId] = {};
      }

      if (!acc[leave.employeeId][leaveMonth]) {
        acc[leave.employeeId][leaveMonth] = 0;
      }

      const days = Math.ceil(
        (new Date(leave.to).getTime() - new Date(leave.from).getTime()) /
          (1000 * 60 * 60 * 24)
      );

      acc[leave.employeeId][leaveMonth] += days;

      return acc;
    },
    {}
  );

  const employeeIds = Object.keys(processedData);
  const leaveMonthsSet = new Set<string>();

  employeeIds.forEach((employeeId) => {
    Object.keys(processedData[employeeId]).forEach((month) => {
      leaveMonthsSet.add(month);
    });
  });

  const leaveMonths = Array.from(leaveMonthsSet);
  const chartData = employeeIds.map((employeeId) => {
    const data = leaveMonths.map(
      (month) => processedData[employeeId][month] || 0
    );
    return { name: employeeId, data: data };
  });

  return (
    <Card>
      <Title level={4}>Employee Leave Trends</Title>
      <Chart
        options={{
          stroke: { width: [2, 2, 2], curve: "smooth" },
          fill: { opacity: [0.85, 0.25, 1] },
          labels: leaveMonths,
          markers: { size: 0 },
          xaxis: { type: "category" },
          yaxis: { title: { text: "Days" } },
        }}
        series={chartData}
        type="line"
        height={350}
        width={200}
      />
    </Card>
  );
};

export default EmployeeLeaveTrendsChart;
