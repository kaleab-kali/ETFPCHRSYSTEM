import React from "react";
import { Card, Typography, Progress } from "antd";

const { Title } = Typography;

const data = [
  {
    source: "envato.com",
    amount: "$90,808",
    percentage: 17,
    color: "cyan",
  },
  {
    source: "google.com",
    amount: "$90,808",
    percentage: 27,
    color: "red",
  },
  {
    source: "yahoo.com",
    amount: "$90,808",
    percentage: 25,
    color: "blue",
  },
  {
    source: "store",
    amount: "$90,808",
    percentage: 18,
    color: "green",
  },
  {
    source: "Others",
    amount: "$90,808",
    percentage: 13,
    color: "purple",
  },
];

const EarningSource: React.FC = () => {
  return (
    <Card>
      <Title level={4}>Department Coverage</Title>
      <Title level={2} style={{ color: "orange" }}>
        $90,808
      </Title>
      {data.map((item, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{item.source}</span>
            <span>{item.percentage}%</span>
          </div>
          <Progress
            percent={item.percentage}
            showInfo={false}
            strokeColor={item.color}
          />
        </div>
      ))}
    </Card>
  );
};

export default EarningSource;
