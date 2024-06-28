import React from "react";
import { Card, Progress, Typography } from "antd";

const { Title } = Typography;

interface MetricCardProps {
  title: string;
  value: string;
  percentage: number;
  color: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  percentage,
  color,
}) => {
  console.log(`MetricCard`, percentage)
  return (
    <Card
      styles={{
        body: {
          backgroundColor: color,
          color: "black",
          height: "140px",
          width: "180px",
          borderRadius: "10px",
        },
        header: { color: "black" },
      }}
      size="small"
      style={{ width: "180px", height: "140px", borderRadius: "10px" }}
    >
      <Title style={{ color: "black", marginTop: "-5px" }} level={4}>
        {title}
      </Title>
      <p style={{ fontSize: "24px", margin: "0", color: "black" }}>{value}</p>
      {color === "1" && (
        <Progress
          style={{ color: "black" }}
          percent={percentage}
          strokeColor="orange"
          status="active"
        />
      )}
      {color === "2" && (
        <Progress
          style={{ color: "black" }}
          percent={percentage}
          strokeColor="lightgreen"
          status="active"
        />
      )}
      {color === "3" && (
        <Progress
          style={{ color: "black" }}
          percent={percentage}
          strokeColor="blue"
          status="active"
        />
      )}
      {color === "4" && (
        <Progress
          style={{ color: "black" }}
          percent={percentage}
          strokeColor="purple"
          status="active"
        />
      )}
      {/* <p style={{ color: "white" }}>{percentage} Since last month</p> */}
    </Card>
  );
};
