import React, { useState } from "react";
import Chart from "react-apexcharts";
import {
  useEmployees,
  useEmployeesIds,
} from "../../../services/queries/employeeQueries";

const GenderDiversityChart: React.FC = () => {
  const employeesIds = useEmployeesIds();
  const employees = useEmployees(employeesIds.data);

  // Calculate the number of male and female employees
  const maleCount = employees.filter(
    (employee) => employee.data?.gender.toLowerCase() === "male"
  ).length;
  const femaleCount = employees.filter(
    (employee) => employee.data?.gender.toLowerCase() === "female"
  ).length;

  return (
    <div>
      <Chart
        options={{
          labels: ["Male", "Female"],
          plotOptions: {
            pie: {
              donut: {
                size: "50%",
                labels: {
                  show: true,
                  total: {
                    show: true,
                    fontSize: "30px",
                    color: "green",
                  },
                },
              },
            },
          },
          dataLabels: {
            enabled: true,
          },
          legend: {
            show: false,
            offsetX: 3, // Adjust the offset to move legend sideward
            fontSize: "16px",
            offsetY: 10, // Adjust the offset to move legend downward
          },
          title: {
            text: "Gender Diversity",
          },
        }}
        series={[maleCount, femaleCount]}
        type="donut"
        width={250}
      />
    </div>
  );
};

export default GenderDiversityChart;
