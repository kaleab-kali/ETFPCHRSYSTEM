import React from "react";
import ReactApexChart from "react-apexcharts";
import { Card, Typography } from "antd";
import { ApexOptions } from "apexcharts";

const { Title } = Typography;

interface Props {
  leavePercentages: number[];
  leaveTypes: string[];
  leaveTypeMap: Record<string, string>;
}

const LeaveBalanceDistributionChart: React.FC<Props> = ({
  leavePercentages,
  leaveTypes,
  leaveTypeMap,
}) => {
  const leaveOptions:ApexOptions = {
    chart: {
      type: "radialBar",
      height: 300,
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            show: true,
          },
          value: {
            show: true,
            formatter: (val: number) => `${Math.round(val)}%`,
          },
        },
      },
    },
    labels: leaveTypes.map((type) => leaveTypeMap[type]),
    legend: {
      position: "bottom",
    },
  };

  return (
    <Card>
      <Title level={4}>Leave Balance Distribution</Title>
      <ReactApexChart
        options={leaveOptions}
        series={leavePercentages}
        type="radialBar"
        height={300}
      />
    </Card>
  );
};

export default LeaveBalanceDistributionChart;
