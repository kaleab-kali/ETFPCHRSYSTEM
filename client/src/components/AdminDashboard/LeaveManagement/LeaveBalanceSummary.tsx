import React from "react";
import { Col, Card, Typography } from "antd";
import ReactApexChart from "react-apexcharts";
import { useAllLeaveBalances } from "../../../services/queries/leaveQueries";

const { Title } = Typography;

interface LeaveBalance {
  year: number;
  balances: {
    leaveType: string;
    available: number;
    credit: number;
  }[];
}

interface Employee {
  leaveBalances: LeaveBalance[];
}

const LeaveBalanceSummary: React.FC = () => {
  const { data: leaveBalances, isLoading, error } = useAllLeaveBalances();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  console.log("leaveBalances", leaveBalances.leaveBalancesData);
  const leaveB = leaveBalances.leaveBalancesData;

  // Extracting leave types
  const leaveTypes = Array.isArray(leaveB)
    ? leaveB.reduce<string[]>((types, employee: Employee) => {
        const currentYearLeaveBalances = employee.leaveBalances.find(
          (balance) => balance.year === 2024
        );
        if (currentYearLeaveBalances) {
          currentYearLeaveBalances.balances.forEach((leave) => {
            if (!types.includes(leave.leaveType)) {
              types.push(leave.leaveType);
            }
          });
        }
        return types;
      }, [])
    : [];

  console.log("leaveTypes", leaveTypes);

  // Calculating remaining balance for each leave type
  const remainingBalance = leaveTypes.map((type) => {
    return Array.isArray(leaveB)
      ? leaveB.reduce<number>((total, employee: Employee) => {
          const currentYearLeaveBalances = employee.leaveBalances.find(
            (balance) => balance.year === 2024
          );
          if (currentYearLeaveBalances) {
            const leave = currentYearLeaveBalances.balances.find(
              (leave) => leave.leaveType === type
            );
            total += leave ? leave.available : 0;
          }
          return total;
        }, 0)
      : 0;
  });

  console.log("remainingBalance", remainingBalance);

  // Calculate the total available leave balance
  const totalAvailableLeaveBalance = remainingBalance.reduce(
    (total, balance) => total + balance,
    0
  );

  return (
    <>
      {leaveTypes.map((type, index) => (
        <Col span={6} key={index}>
          <Card>
            <Title level={5}>{type}</Title>
            <p>{remainingBalance[index]} Days</p>
            <ReactApexChart
              options={{
                chart: {
                  height: 150,
                  type: "radialBar",
                },
                plotOptions: {
                  radialBar: {
                    hollow: {
                      size: "70%",
                    },
                    dataLabels: {
                      name: {
                        show: false,
                      },
                      value: {
                        show: true,
                        fontSize: "22px",
                        fontWeight: "bold",
                        formatter: (val) => `${val}%`,
                      },
                    },
                  },
                },
                fill: {
                  type: "gradient",
                  gradient: {
                    shade: "dark",
                    type: "horizontal",
                    shadeIntensity: 0.5,
                    gradientToColors: ["#ABE5A1"],
                    inverseColors: true,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100],
                  },
                },
                labels: ["%"],
              }}
              series={[
                Math.round(
                  ((remainingBalance[index] / totalAvailableLeaveBalance) *
                    100 +
                    Number.EPSILON) *
                    100
                ) / 100,
              ]}
              type="radialBar"
              height={150}
            />
          </Card>
        </Col>
      ))}
    </>
  );
};

export default LeaveBalanceSummary;
