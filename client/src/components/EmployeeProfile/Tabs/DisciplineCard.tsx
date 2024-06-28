import React from "react";
import { Card, Row, Col, Badge, Typography } from "antd";
import { LeaveInfo } from "../../../../../shared/types/leaveTypes";

const { Title, Text } = Typography;

interface DisciplineProps {
  leaveInfo: LeaveInfo;
}

interface Complaint {
  employeeId?: string;
  category?: string;
  complaint?: string;
  description?: string;
  complaintId?: string;
  status?: string;
}
interface DisciplineCardProps {
  complaint: Complaint;
}
const DisciplineCard: React.FC<DisciplineCardProps> = ({ complaint }) => {
  // const calculateLeaveDays = () => {
  //   if (leaveInfo.from && leaveInfo.to) {
  //     const fromDate = new Date(leaveInfo.from);
  //     const toDate = new Date(leaveInfo.to);
  //     const timeDiff = Math.abs(toDate.getTime() - fromDate.getTime());
  //     return Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
  //   }
  //   return 0;
  // };

  return (
    <Card style={{ width: "100%", position: "relative" }}>
      <Card style={{ width: "100%", position: "relative" }}>
        <Row gutter={16}>
          <Col span={6}>
            <Text
              type="secondary"
              style={{ marginBottom: "4px", display: "block" }}
            >
              Complaint ID
            </Text>
            <Title level={5} style={{ margin: 0 }}>
              {/* {`${
                (leaveInfo.from &&
                  new Date(leaveInfo.from).toLocaleDateString()) ||
                ""
              } to ${
                (leaveInfo.to && new Date(leaveInfo.to).toLocaleDateString()) ||
                ""
              }`} */}
              {complaint.complaintId}
            </Title>
          </Col>
          <Col span={4}>
            <Text
              type="secondary"
              style={{ marginBottom: "4px", display: "block" }}
            >
              Complaint Type
            </Text>
            <Title level={5} style={{ margin: 0 }}>
              {complaint.category}
            </Title>
          </Col>
          <Col span={4}>
            <Text
              type="secondary"
              style={{ marginBottom: "4px", display: "block" }}
            >
              Complaint
            </Text>
            <Title level={5} style={{ margin: 0 }}>
              {/* {calculateLeaveDays()} */}
              {complaint.complaint}
            </Title>
          </Col>
          <Col span={8}>
            <Text
              type="secondary"
              style={{ marginBottom: "4px", display: "block" }}
            >
              Description
            </Text>
            <Title level={5} style={{ margin: 0, whiteSpace: "wrap" }}>
              {complaint.description}
            </Title>
          </Col>
          <div style={{ position: "absolute", top: 0, right: 0 }}>
            <Badge.Ribbon
              text={complaint.status}
              color={
                complaint.status === "Medium"
                  ? "orange"
                  : complaint.status === "Low"
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

export default DisciplineCard;
