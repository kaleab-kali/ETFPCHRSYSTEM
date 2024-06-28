import React from "react";
import { Card, Typography } from "antd";
import Chart from "react-apexcharts";
import { useAllLeaves } from "../../../services/queries/leaveQueries";

const { Title } = Typography;

const LeaveRequestsOverTimeChart: React.FC = () => {
  const { data, isLoading, error } = useAllLeaves();

  if (isLoading) {
    return <Card>Loading...</Card>;
  }

  if (error || !data) {
    return <Card>Error loading data</Card>;
  }

  // Process data to count leave requests per month
  const leaveRequestsPerMonth = data.reduce(
    (acc: Record<string, number>, leave) => {
      if (!leave.from || !leave.to || !leave.status) {
        return acc;
      }
      const leaveMonth = new Date(leave.from).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      });

      if (!acc[leaveMonth]) {
        acc[leaveMonth] = 0;
      }

      acc[leaveMonth] += 1;

      return acc;
    },
    {}
  );

  const chartLabelsForLeaveRequestsOverTime = Object.keys(
    leaveRequestsPerMonth
  );
  const chartDataForLeaveRequestsOverTime = [
    {
      name: "Leave Requests",
      data: chartLabelsForLeaveRequestsOverTime.map(
        (label) => leaveRequestsPerMonth[label]
      ),
    },
  ];

  return (
    <Card>
      <Title level={4}>Leave Requests Over Time</Title>
      <Chart
        options={{
          xaxis: {
            categories: chartLabelsForLeaveRequestsOverTime,
          },
          yaxis: {
            title: { text: "Number of Leave Requests" },
          },
          fill: { opacity: 0.6 },
          stroke: { width: 2, curve: "smooth" },
        }}
        type="bar"
        series={chartDataForLeaveRequestsOverTime}
        height={350}
      />
    </Card>
  );
};

export default LeaveRequestsOverTimeChart;
