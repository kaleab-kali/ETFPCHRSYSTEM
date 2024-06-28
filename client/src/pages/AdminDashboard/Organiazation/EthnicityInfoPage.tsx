import React from "react";
import Title from "antd/lib/typography/Title";
import { Layout, theme, Typography } from "antd";

import ListDepartment from "../../../components/Organization/Department/ListDepartment";
import AddEthnicity from "../../../components/Organization/Ethnicity/AddEthnicity";
import ListEthincity from "../../../components/Organization/Ethnicity/ListEthincity";

const { Content } = Layout;
const { Text } = Typography;
const EthnicityInfoPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Title
        level={4}
        style={{ padding: "10px 30px", marginBottom: "0", marginTop: 10 }}
      >
        List of Departments
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
            <AddEthnicity />
            <Title level={5}> Ethinicty Data</Title>
            <ListEthincity />


          
        </Content>
      </Layout>
    </>
  );
}

export default EthnicityInfoPage