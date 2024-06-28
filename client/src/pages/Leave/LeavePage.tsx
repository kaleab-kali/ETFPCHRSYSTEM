
import React from "react";
import Title from "antd/lib/typography/Title";
import { Layout, theme, Typography } from "antd";

const { Content } = Layout;
const { Text } = Typography;

function LeavePage() {
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
        
            <Title level={5}> Leave Type Data</Title>
            


          
        </Content>
      </Layout>
    </>
  );
}

export default LeavePage