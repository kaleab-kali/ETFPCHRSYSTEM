import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import {
  useEmployees,
  useEmployeesIds,
} from "../../../services/queries/employeeQueries";


const AttendanceGraph: React.FC = () => {
  const employeesIds = useEmployeesIds();
  const employees = useEmployees(employeesIds.data);
  const [chartOptions, setChartOptions] = useState<any>({});
  const [chartSeries, setChartSeries] = useState<any[]>([]);
  useEffect(() => {
    if (employees && employees.length > 0) {
      // Process attendance data here based on filter criteria
      const processedData: {
        [date: string]: { present: number; absent: number; late: number };
      } = {};
      
let absentCount = 0;
let onTimeCount = 0;
let lateCount = 0;

      employees.forEach((employee) => {
        const attendanceRecords =
          (employee.data && employee.data.attendanceRecords) || [];
        attendanceRecords.forEach((record) => {
          // Process the record, you may need to convert date format or extract relevant information
          // For demonstration, let's assume some processing and filtering based on date
          const date = new Date(record.date);
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const day = date.getDate();
          const dateString = `${year}-${month < 10 ? "0" : ""}${month}-${
            day < 10 ? "0" : ""
          }${day}`;

          // Initialize counts for the date if not already present
          if (!processedData[dateString]) {
            processedData[dateString] = { present: 0, absent: 0, late: 0 };
          }

          // Update counts based on record status
          if (record.status === "on time") {
            processedData[dateString].present++;
          } else if (record.status === "absent") {
            processedData[dateString].absent++;
          } else if (record.status === "late") {
            processedData[dateString].late++;
          }
        });
      });

      // Extracting data for chart
      const categories = Object.keys(processedData).sort();
      const presentData = categories.map((date) => processedData[date].present);
      const absentData = categories.map((date) => processedData[date].absent);
      const lateData = categories.map((date) => processedData[date].late);
      setChartOptions({
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
            borderRadiusApplication: "end", // 'around', 'end'
            borderRadiusWhenStacked: "last", // 'all', 'last'
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
      });

      setChartSeries([
        { name: "On Time", data: presentData },
        { name: "Absent", data: absentData },
        { name: "Late", data: lateData },
      ]);
      console.log("prsent "+ presentData)
    }
    
  }, []);

  return (
    <div className="workforce-chart">
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default AttendanceGraph;
