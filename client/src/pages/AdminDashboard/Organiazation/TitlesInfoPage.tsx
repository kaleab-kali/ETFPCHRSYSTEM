import React from "react";
import Title from "antd/lib/typography/Title";
import { Layout, theme, Typography } from "antd";
import AddDepartment from "../../../components/Organization/Department/AddDepartment";
import ListDepartment from "../../../components/Organization/Department/ListDepartment";
import ListTitles from "../../../components/Organization/Titles/ListTitles";
import AddTitles from "../../../components/Organization/Titles/AddTitles";

const { Content } = Layout;
const { Text } = Typography;

const TitlesInfoPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Title
        level={4}
        style={{ padding: "10px 30px", marginBottom: "0", marginTop: 10 }}
      >
        List of Titles
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
            <AddTitles />
            <Title level={5}> Titles Data</Title>
            <ListTitles />


          
        </Content>
      </Layout>
    </>
  );
}

export default TitlesInfoPage