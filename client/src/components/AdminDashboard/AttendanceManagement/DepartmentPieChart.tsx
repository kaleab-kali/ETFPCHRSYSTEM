import React, { useState } from "react";
import Chart from "react-apexcharts";
import {
  useEmployees,
  useEmployeesIds,
} from "../../../services/queries/employeeQueries";

interface DepartmentCounts {
  [department: string]: number;
}

const DepartmentChart: React.FC = () => {
  const employeesIds = useEmployeesIds();
  const employees = useEmployees(employeesIds.data);

  // Calculate the number of employees per department
  const departmentCounts: DepartmentCounts = employees.reduce(
    (acc, employee) => {
      if (employee.data?.department) {
        const department = employee.data.department as string; // Type assertion
        acc[department] = (acc[department] || 0) + 1;
      }
      return acc;
    },
    {} as DepartmentCounts
  );

  // Extract department names and counts from the calculated data
  const departments = Object.keys(departmentCounts);
  const departmentCountsArray = departments.map(
    (department) => departmentCounts[department]
  );

  return (
    <div>
      <Chart
        options={{
          labels: departments,
          plotOptions: {
            pie: {
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
            text: "Department Diversity",
          },
        }}
        series={departmentCountsArray}
        type="polarArea"
        width={190}
      />
    </div>
  );
};

export default DepartmentChart;
