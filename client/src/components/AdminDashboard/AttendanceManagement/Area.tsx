import React, { useState } from "react";
import Chart from "react-apexcharts";
import { useAttendance } from "../../../services/queries/attendanceQueries";

const Area: React.FC = () => {
  const { data: attendanceData, isLoading, error } = useAttendance();
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Present",
        data: [] as number[],
      },
      {
        name: "Absent",
        data: [] as number[],
      },
      {
        name: "Permission",
        data: [] as number[],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area" as const,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth" as const,
      },
      xaxis: {
        type: "datetime" as const,
        categories: [] as string[],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy",
        },
      },
    },
  });

  if (attendanceData && !chartData.series[0].data.length) {
    // Transform data to fit chart structure
    const categories = attendanceData.map(
      (record: { date: string }) => record.date
    );
    const presentData = attendanceData.map((record: { status: string }) =>
      record.status === "present" ? 1 : 0
    );
    const absentData = attendanceData.map((record: { status: string }) =>
      record.status === "absent" ? 1 : 0
    );
    const permissionData = attendanceData.map((record: { status: string }) =>
      record.status === "permission" ? 1 : 0
    );

    setChartData({
      series: [
        {
          name: "Present",
          data: presentData,
        },
        {
          name: "Absent",
          data: absentData,
        },
        {
          name: "Permission",
          data: permissionData,
        },
      ],
      options: {
        ...chartData.options,
        xaxis: {
          ...chartData.options.xaxis,
          categories: categories,
        },
      },
    });
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div>
      <div id="chart">
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="area"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default Area;
