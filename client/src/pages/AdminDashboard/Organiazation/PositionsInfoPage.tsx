import React from "react";
import Title from "antd/lib/typography/Title";
import { Layout, theme, Typography } from "antd";
import AddDepartment from "../../../components/Organization/Department/AddDepartment";
import ListDepartment from "../../../components/Organization/Department/ListDepartment";
import AddPosition from "../../../components/Organization/Position/AddPosition";
import ListPosition from "../../../components/Organization/Position/ListPosition";

const { Content } = Layout;
const { Text } = Typography;

const PositionsInfoPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Title
        level={4}
        style={{ padding: "10px 30px", marginBottom: "0", marginTop: 10 }}
      >
        List of Positions
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
            <AddPosition />
            <Title level={5}> position Data</Title>
            <ListPosition />


          
        </Content>
      </Layout>
    </>
  );
}

export default PositionsInfoPage