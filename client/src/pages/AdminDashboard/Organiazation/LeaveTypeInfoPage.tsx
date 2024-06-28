import React from "react";
import Title from "antd/lib/typography/Title";
import { Layout, theme, Typography } from "antd";
import AddDepartment from "../../../components/Organization/Department/AddDepartment";
import ListDepartment from "../../../components/Organization/Department/ListDepartment";
import AddLeaveType from "../../../components/Organization/LeaveType/AddLeaveType";
import ListLeaveType from "../../../components/Organization/LeaveType/ListLeaveType";

const { Content } = Layout;
const { Text } = Typography;

const LeaveTypeInfoPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Title
        level={4}
        style={{ padding: "10px 30px", marginBottom: "0", marginTop: 10 }}
      >
        List of LeaveTypes
      </Title>
      <Layout>
        <Content
          style={{
            padding: 24,
            margin: "5px 24px",
            minHeight: 480,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
            <AddLeaveType />
            <Title level={5}> Leave Type Data</Title>
            <ListLeaveType />


          
        </Content>
      </Layout>
    </>
  );
}

export default LeaveTypeInfoPage