import React from "react";
import { Row, Col, Card, Typography } from "antd";
import LeaveOverviewChart from "./LeaveOverviewChart";
import LeaveBalanceSummary from "./LeaveBalanceSummary";
// import LeaveRequestButton from "./LeaveRequestButton";
import LeaveTrendsChart from "./LeaveTrendsChart";
import LeaveTypesDistributionChart from "./LeaveTypesDistributionChart";
import LeaveRequestsOverTimeChart from "./LeaveRequestsOverTimeChart";
import LeaveBalanceDistributionChart from "./LeaveBalanceDistributionChart";
import CountryWiseSalesChart from "./LeaveRegion";
// import LeaveRequestTable from "./LeaveList";

const { Title } = Typography;

const LeaveDashboard: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      {/* Leave Overview */}
      <Row gutter={16}>
        <Col span={24}>
          <Card>
            <Title level={4}>Leave Overview</Title>
            <LeaveOverviewChart />
          </Card>
        </Col>
      </Row>

      {/* Leave Balance Summary */}
      <Row gutter={16} style={{ marginTop: "20px" }}>
        <LeaveBalanceSummary />
      </Row>

      {/* Leave Request Button */}
      <Row gutter={16} style={{ marginTop: "20px" }}>
        {/* <LeaveRequestButton /> */}
        {/* <LeaveRequestTable /> */}
        {/* <CountryWiseSalesChart /> */}
      </Row>
      <Row
        gutter={16}
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* <LeaveRequestButton /> */}
        {/* <LeaveRequestTable /> */}
        <CountryWiseSalesChart />
        <LeaveTypesDistributionChart />
      </Row>

      {/* Leave Charts */}
      <Row
        gutter={16}
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <LeaveTrendsChart />
        <LeaveBalanceDistributionChart />
        <LeaveRequestsOverTimeChart />
      </Row>

      {/* Leave Requests Over Time and Balance Distribution */}
      <Row gutter={16} style={{ marginTop: "20px" }}></Row>
    </div>
  );
};

export default LeaveDashboard;
