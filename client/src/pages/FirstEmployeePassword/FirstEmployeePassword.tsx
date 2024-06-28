import { Layout, Typography } from "antd";
import React from "react";
import FirstEmployeePasswordComp from "../../components/FirstEmployeePassword/FirstEmployeePasswordComp";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const FirstEmployeePassword = () => {
  return (
    <Layout
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
          backgroundColor: "#ADD8E6",
          zIndex: 10,
        }}
      >
        <img
          src={process.env.PUBLIC_URL + "/fpp.jpg"}
          alt="Company Logo"
          style={{
            height: "60px",
            borderRadius: "50%",
            marginRight: "20px",
          }}
        />
        <Title level={2} style={{ color: "white", margin: 0 }}>
          Federal Prison HR
        </Title>
      </Header>
      <Content style={{ flex: 1 }}>
        <FirstEmployeePasswordComp />
      </Content>
      <Footer style={{ textAlign: "center", zIndex: 10 }}>
        FPC @ {new Date().getFullYear()} Created by FPC Team
      </Footer>
    </Layout>
  );
};

export default FirstEmployeePassword;
