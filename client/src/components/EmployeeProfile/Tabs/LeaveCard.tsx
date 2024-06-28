import React from "react";
import { Card, Row, Col, Badge, Typography } from "antd";
import { LeaveInfo } from "../../../../../shared/types/leaveTypes";

const { Title, Text } = Typography;

interface LeaveCardProps {
  leaveInfo: LeaveInfo;
}

const LeaveCard: React.FC<LeaveCardProps> = ({ leaveInfo }) => {
  const calculateLeaveDays = () => {
    if (leaveInfo.from && leaveInfo.to) {
      const fromDate = new Date(leaveInfo.from);
      const toDate = new Date(leaveInfo.to);
      const timeDiff = Math.abs(toDate.getTime() - fromDate.getTime());
      return Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
    }
    return 0;
  };

  return (
    <Card style={{ width: "100%", position: "relative" }}>
      <Card style={{ width: "100%", position: "relative" }}>
        <Row gutter={16}>
          <Col span={4}>
            <Text
              type="secondary"
              style={{ marginBottom: "4px", display: "block" }}
            >
              Date
            </Text>
            <Title level={5} style={{ margin: 0 }}>
              {`${
                (leaveInfo.from &&
                  new Date(leaveInfo.from).toLocaleDateString()) ||
                ""
              } to ${
                (leaveInfo.to && new Date(leaveInfo.to).toLocaleDateString()) ||
                ""
              }`}
            </Title>
          </Col>
          <Col span={4}>
            <Text
              type="secondary"
              style={{ marginBottom: "4px", display: "block" }}
            >
              Leave Type
            </Text>
            <Title level={5} style={{ margin: 0 }}>
              {leaveInfo.leaveType}
            </Title>
          </Col>
          <Col span={4}>
            <Text
              type="secondary"
              style={{ marginBottom: "4px", display: "block" }}
            >
              Leave Days
            </Text>
            <Title level={5} style={{ margin: 0 }}>
              {calculateLeaveDays()}
            </Title>
          </Col>
          <Col span={6}>
            <Text
              type="secondary"
              style={{ marginBottom: "4px", display: "block" }}
            >
              Reason
            </Text>
            <Title level={5} style={{ margin: 0, whiteSpace: "wrap" }}>
              {leaveInfo.reason}
            </Title>
          </Col>
          <Col span={4}>
            <Text
              type="secondary"
              style={{ marginBottom: "4px", display: "block" }}
            >
              Delegated To
            </Text>
            <Title level={5} style={{ margin: 0, whiteSpace: "wrap" }}>
              {leaveInfo.delegatedTo}
            </Title>
          </Col>
          <div style={{ position: "absolute", top: 0, right: 0 }}>
            <Badge.Ribbon
              text={leaveInfo.status}
              color={
                leaveInfo.status === "pending"
                  ? "orange"
                  : leaveInfo.status === "approved"
                  ? "green"
                  : "red"
              }
            />
          </div>
        </Row>
      </Card>
    </Card>
  );
};

export default LeaveCard;
