import React from "react";
import { Card } from "antd";
import Chart from "react-apexcharts";
import Title from "antd/es/typography/Title";
import { useAllLeaves } from "../../../services/queries/leaveQueries";

const LeaveStatusOverTimeChart: React.FC = () => {
  const { data, isLoading, error } = useAllLeaves();

  if (isLoading) {
    return <Card>Loading...</Card>;
  }

  if (error || !data) {
    return <Card>Error loading data</Card>;
  }

  const processedData = data.reduce(
    (acc: Record<string, Record<string, number>>, leave) => {
      if (!leave.from || !leave.to || !leave.status) {
        return acc;
      }

      const leaveMonth = new Date(leave.from).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      });
      if (!acc[leaveMonth]) {
        acc[leaveMonth] = { approved: 0, rejected: 0, pending: 0 };
      }

      const days = Math.ceil(
        (new Date(leave.to).getTime() - new Date(leave.from).getTime()) /
          (1000 * 60 * 60 * 24)
      );

      const statusKey = leave.status.toLowerCase() as
        | "approved"
        | "rejected"
        | "pending";
      if (!acc[leaveMonth][statusKey]) {
        acc[leaveMonth][statusKey] = 0;
      }

      acc[leaveMonth][statusKey] += days;
      return acc;
    },
    {}
  );

  const labels = Object.keys(processedData);
  const chartData = [
    {
      name: "Approved",
      data: labels.map((label) => processedData[label].approved || 0),
    },
    {
      name: "Rejected",
      data: labels.map((label) => processedData[label].rejected || 0),
    },
    {
      name: "Pending",
      data: labels.map((label) => processedData[label].pending || 0),
    },
  ];

  return (
    <Card>
      <Title level={4}>Leave Status Over Time</Title>
      <Chart
        options={{
          stroke: { width: [2, 2, 2], curve: "smooth" },
          fill: { opacity: [0.5, 0.5, 0.5] }, // Set opacity for each series
          labels: labels,
          markers: { size: 0 },
          xaxis: { type: "category" },
          yaxis: { title: { text: "Days" } },
        }}
        series={chartData}
        type="area"
        height={350}
        width={500}
      />
    </Card>
  );
};

export default LeaveStatusOverTimeChart;
