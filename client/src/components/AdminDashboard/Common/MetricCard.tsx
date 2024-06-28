import React from "react";
import { Card, Progress, Typography,  } from "antd";
import '../../../styles/Adminside/metricCard.css'

const { Title , Text} = Typography;

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
      className="wrapCard"
      styles={{
        body: {
          backgroundColor: color,
          color: "black",
          height: "120px",
          width: "180px",
          borderRadius: "10px",
          display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"
        },
        header: { color: "black" },
      }}
      size="small"
    >
      <Title style={{ color: "#6c6c6c",margin: 0  }} level={4}>
        {title}
      </Title>
      <Text style={{ fontSize: "2.5em",fontWeight: "600", color: "#323c43"}}>{value}</Text>
      {/* <p style={{ , margin: "0", }}>{value}</p> */}
      {/* {color === "1" && (
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
      )} */}
      {/* <p style={{ color: "white" }}>{percentage} Since last month</p> */}
    </Card>
  );
};
