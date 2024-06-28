import React, { useState } from "react";
import Chart from "react-apexcharts";
import { useAttendance } from "../../../services/queries/attendanceQueries";

const Radial: React.FC = () => {
  const { data, isLoading, error } = useAttendance();

  const [chartData, setChartData] = useState<{
    series: number[];
    options: ApexCharts.ApexOptions;
  }>({
    series: [],
    options: {
      chart: {
        type: "radialBar" as const,
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px",
            },
            value: {
              fontSize: "16px",
            },
            total: {
              show: true,
              label: "Total",
            },
          },
        },
      },
      labels: ["On Time", "Late", "Absent", "Permission"],
    },
  });

  if (data && !chartData.series.length) {
    // Process attendance data to get the counts for each status
    const statusCounts = data.reduce(
      (acc: any, record: any) => {
        acc[record.status] = (acc[record.status] || 0) + 1;
        return acc;
      },
      { "on time": 0, late: 0, absent: 0, permission: 0 }
    );

    // Prepare data for the chart
    const series = [
      statusCounts["on time"],
      statusCounts["late"],
      statusCounts["absent"],
      statusCounts["permission"],
    ];

    setChartData({
      series: series,
      options: {
        ...chartData.options,
      },
    });
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="radialBar"
        height={350}
      />
    </div>
  );
};

export default Radial;
