import React from "react";
import { Card, Typography } from "antd";
import ReactApexChart from "react-apexcharts";
import { useAllLeaveBalances } from "../../../services/queries/leaveQueries";

const { Title } = Typography;

const LeaveBalanceDistributionChart: React.FC = () => {
  const { data: leaveBalance, isLoading, error } = useAllLeaveBalances();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  type LeaveType = "paternity" | "annual" | "health";

  const leaveTypes: LeaveType[] = ["paternity", "annual", "health"];
  const leaveTypeMap: Record<LeaveType, string> = {
    paternity: "Paternity Leave",
    annual: "Annual Leave",
    health: "Health Leave",
  };

  // Aggregate leave balances
  const aggregatedBalances = leaveTypes.map((type) => {
    return leaveBalance.leaveBalancesData.reduce(
      (total: any, employee: { leaveBalances: any[] }) => {
        return (
          total +
          employee.leaveBalances.reduce(
            (yearTotal: any, yearBalance: { balances: any[] }) => {
              const leave = yearBalance.balances.find(
                (balance: { leaveType: string }) => balance.leaveType === type
              );
              return yearTotal + (leave ? leave.available : 0);
            },
            0
          )
        );
      },
      0
    );
  });

  // Calculate the percentage for each leave type
  const totalBalance = aggregatedBalances.reduce(
    (sum, balance) => sum + balance,
    0
  );
  const percentages = aggregatedBalances.map(
    (balance) => (balance / totalBalance) * 100
  );

  return (
    <Card style={{ width: "350px" }}>
      <Title level={4}>Leave Balance Distribution</Title>
      <ReactApexChart
        options={{
          chart: {
            type: "radialBar",
            height: 350,
          },
          plotOptions: {
            radialBar: {
              dataLabels: {
                name: {
                  show: true,
                },
                value: {
                  show: true,
                  formatter: (val) => `${Math.round(val)}%`,
                },
              },
            },
          },
          labels: leaveTypes.map((type) => leaveTypeMap[type]),
          legend: {
            position: "bottom",
          },
        }}
        series={percentages}
        type="radialBar"
        height={350}
        width={300}
      />
    </Card>
  );
};

export default LeaveBalanceDistributionChart;
