import React from "react";
import Chart from "react-apexcharts";
import {
  useEmployees,
  useEmployeesIds,
} from "../../../services/queries/employeeQueries";

const GenderDiversityChart: React.FC = () => {
  const employeesIds = useEmployeesIds();
  const employees = useEmployees(employeesIds.data);

  if (!employees || employees.length === 0) {
    return <div>Loading...</div>; // or some other loading indicator
  }

  let maleCount = 0;
  let femaleCount = 0;

  // Calculate the number of male and female employees with explicit checks and logging
  employees.forEach((employee) => {
    if (employee && employee.data && employee.data.gender) {
      const gender = employee.data.gender.toLowerCase();
      if (gender === "male") {
        maleCount++;
      } else if (gender === "female") {
        femaleCount++;
      }
    } else {
      console.log("Invalid employee data: ", employee);
    }
  });

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
        width={400}
      />
    </div>
  );
};

export default GenderDiversityChart;
