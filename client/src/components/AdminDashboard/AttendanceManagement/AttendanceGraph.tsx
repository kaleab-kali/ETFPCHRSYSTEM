import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import {
  useEmployees,
  useEmployeesIds,
} from "../../../services/queries/employeeQueries";

// Define the types for Employee and AttendanceRecord
interface AttendanceRecord {
  date: string;
  status: "on time" | "late" | "absent" | "permission";
}

interface Employee {
  attendanceRecords: AttendanceRecord[];
}

const AttendanceGraph: React.FC = () => {
  const {
    data: employeeIds,
    isLoading: isLoadingIds,
    error: errorIds,
  } = useEmployeesIds();

  const employeeQueries = useEmployees(employeeIds || []);
  const employees = employeeQueries
    .map((query) => query.data)
    .filter(Boolean) as unknown as Employee[];
  const isLoadingEmployees = employeeQueries.some((query) => query.isLoading);
  const errorEmployees = employeeQueries.find((query) => query.error)?.error;

  const [chartData, setChartData] = useState<{
    options: ApexCharts.ApexOptions;
    series: { name: string; data: number[] }[];
  }>({
    options: {},
    series: [],
  });

  // Process data when employees data is available
  useEffect(() => {
    if (employees && employees.length > 0) {
      const processedData: {
        [date: string]: {
          present: number;
          absent: number;
          late: number;
          permission: number;
        };
      } = {};

      employees.forEach((employee) => {
        const attendanceRecords = employee.attendanceRecords || [];
        attendanceRecords.forEach((record) => {
          const date = new Date(record.date);
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const day = date.getDate();
          const dateString = `${year}-${month < 10 ? "0" : ""}${month}-${
            day < 10 ? "0" : ""
          }${day}`;

          if (!processedData[dateString]) {
            processedData[dateString] = {
              present: 0,
              absent: 0,
              late: 0,
              permission: 0,
            };
          }

          if (record.status === "on time") {
            processedData[dateString].present++;
          } else if (record.status === "absent") {
            processedData[dateString].absent++;
          } else if (record.status === "late") {
            processedData[dateString].late++;
          } else if (record.status === "permission") {
            processedData[dateString].permission++;
          }
        });
      });

      const categories = Object.keys(processedData).sort();
      const presentData = categories.map((date) => processedData[date].present);
      const absentData = categories.map((date) => processedData[date].absent);
      const lateData = categories.map((date) => processedData[date].late);
      const permissionData = categories.map(
        (date) => processedData[date].permission
      );

      const options: ApexCharts.ApexOptions = {
        chart: {
          type: "bar",
          height: 350,
          stacked: true,
          toolbar: {
            show: true,
          },
          zoom: {
            enabled: true,
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10,
            borderRadiusApplication: "end",
            borderRadiusWhenStacked: "last",
            dataLabels: {
              total: {
                enabled: true,
                style: {
                  fontSize: "13px",
                  fontWeight: 900,
                },
              },
            },
          },
        },
        xaxis: {
          type: "datetime",
          categories: categories,
        },
        legend: {
          position: "right",
          offsetY: 40,
        },
        fill: {
          opacity: 1,
        },
      };

      const series = [
        { name: "On Time", data: presentData },
        { name: "Absent", data: absentData },
        { name: "Late", data: lateData },
        { name: "Permission", data: permissionData },
      ];

      setChartData({ options, series });
    }
  }, [employees]);

  if (isLoadingIds || isLoadingEmployees) return <div>Loading...</div>;
  if (errorIds || errorEmployees) return <div>Error loading data</div>;

  return (
    <div className="workforce-chart">
      {chartData.series.length > 0 && (
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
        />
      )}
    </div>
  );
};

export default AttendanceGraph;
