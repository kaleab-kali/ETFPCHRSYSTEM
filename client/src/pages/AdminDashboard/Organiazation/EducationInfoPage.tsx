import React from "react";
import Title from "antd/lib/typography/Title";
import { Layout, theme, Typography } from "antd";
import AddDepartment from "../../../components/Organization/Department/AddDepartment";
import ListDepartment from "../../../components/Organization/Department/ListDepartment";
import ListOfInstitution from "../../../components/Organization/EducationInfo/ListOfInstitution";
import AddEducation from "../../../components/Organization/EducationInfo/AddEducation";

const { Content } = Layout;
const { Text } = Typography;
const EducationInfoPage = () => {
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
            <AddEducation />
            <Title level={5}> Department Data</Title>
            <ListOfInstitution />


          
        </Content>
      </Layout>
    </>
  );
}

export default EducationInfoPage