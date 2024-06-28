import React, { useEffect, useRef, useState } from "react";
import { Card } from "antd";
import Chart from "react-apexcharts";
import Title from "antd/es/typography/Title";
import { useAllLeaves } from "../../../services/queries/leaveQueries";

type LeaveType = "annual" | "paternity" | "medical";

interface LeaveInfo {
  from: string;
  to: string;
  leaveType: LeaveType;
}

const LeaveTypesOverViewChart: React.FC = () => {
  const { data, isLoading, error } = useAllLeaves();
  const chartRef = useRef<any>(null);
  const [chartWidth, setChartWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setChartWidth(chartRef.current?.offsetWidth || window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call to set the size

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isLoading) {
    return <Card>Loading...</Card>;
  }

  if (error || !data) {
    return <Card>Error loading data</Card>;
  }

  const processedData: Record<string, Record<LeaveType, number>> = data.reduce(
    (acc, leave) => {
      if (!leave.from || !leave.to || !leave.leaveType) {
        return acc;
      }

      const leaveMonth = new Date(leave.from).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      });

      if (!acc[leaveMonth]) {
        acc[leaveMonth] = { annual: 0, paternity: 0, medical: 0 };
      }

      const days = Math.ceil(
        (new Date(leave.to).getTime() - new Date(leave.from).getTime()) /
          (1000 * 60 * 60 * 24)
      );

      acc[leaveMonth][leave.leaveType] += days;

      return acc;
    },
    {}
  );

  const labels = Object.keys(processedData);
  const chartData = [
    {
      name: "Annual",
      data: labels.map((label) => processedData[label]?.annual || 0),
    },
    {
      name: "Paternity",
      data: labels.map((label) => processedData[label]?.paternity || 0),
    },
    {
      name: "Medical",
      data: labels.map((label) => processedData[label]?.medical || 0),
    },
  ];

  return (
    <Card ref={chartRef} style={{ overflow: "hidden" }}>
      <Title level={4}>Leave Types Over Time</Title>
      <Chart
        options={{
          chart: {
            id: "leave-overview-chart",
            animations: {
              enabled: true,
              easing: "easeinout",
              speed: 800,
              animateGradually: {
                enabled: true,
                delay: 150,
              },
              dynamicAnimation: {
                enabled: true,
                speed: 350,
              },
            },
            toolbar: {
              show: false,
            },
            zoom: {
              enabled: false,
            },
            width: chartWidth,
          },
          stroke: { width: [2, 2, 2], curve: "smooth" },
          fill: { opacity: [0.85, 0.25, 1] },
          labels: labels,
          markers: { size: 0 },
          xaxis: { type: "category" },
          yaxis: { title: { text: "Days" } },
        }}
        series={chartData}
        type="line"
        height={350}
      />
    </Card>
  );
};

export default LeaveTypesOverViewChart;
