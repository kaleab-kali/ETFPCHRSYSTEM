import React from "react";
import Title from "antd/lib/typography/Title";
import { Layout, theme, Typography } from "antd";
import AddDepartment from "../../../components/Organization/Department/AddDepartment";
import ListDepartment from "../../../components/Organization/Department/ListDepartment";
import AddHolidays from "../../../components/Organization/Holidays/AddHolidays";

const { Content } = Layout;
const { Text } = Typography;

const HolidayInfoPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Title
        level={4}
        style={{ padding: "10px 30px", marginBottom: "0", marginTop: 10 }}
      >
        List of Holidays
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
            <AddHolidays />
            <Title level={5}> holiday Data</Title>
            <ListDepartment />


          
        </Content>
      </Layout>
    </>
  );
}

export default HolidayInfoPage