import React from "react";
import Title from "antd/lib/typography/Title";
import { Layout, theme, Typography } from "antd";
import AddDepartment from "../../../components/Organization/Department/AddDepartment";
import ListDepartment from "../../../components/Organization/Department/ListDepartment";
import RoleChangeForm from "../../../components/Organization/RoleChangeDepartment/RoleChangeForm";
import ManagerRoleChangeForm from "../../../components/Organization/RoleChangeManager/ManagerRoleChangeForm";
import AddManagerToDepartmentForm from "../../../components/Organization/AddManagerToDepartment/AddManagerToDepartment";

const { Content } = Layout;
const { Text } = Typography;

const DepartmentManagerAssign = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Title
        level={4}
        style={{ padding: "10px 30px", marginBottom: "0", marginTop: 10 }}
      >
        Add Manager To Department
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
          <AddManagerToDepartmentForm />
        </Content>
      </Layout>
    </>
  );
};

export default DepartmentManagerAssign;
