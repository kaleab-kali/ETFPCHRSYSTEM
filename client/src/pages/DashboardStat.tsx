import React from "react";
import {
  Card,
  Col,
  Row,
  Statistic,
  Layout,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
// import { Column, Pie } from '@ant-design/charts';

const { Content } = Layout;

const DashboardStat: React.FC = () => {
  
  const data = [
    { type: 'Employee', category: 'Active', value: 1500 },
    { type: 'Employee', category: 'On Leave', value: 56 },
    { type: 'Employee', category: 'Shift', value: 240 },
    { type: 'Employee', category: 'Retired', value: 100 },
  ];

const columnConfig = {
    data: data,
    isGroup: true,
    xField: 'type',
    yField: 'value',
    seriesField: 'category',
    dodgePadding: 2,
    width: 350, 
    height: 200,
  };

  const pieData = [
    { type: 'Active', value: 1500 },
    { type: 'On Leave', value: 56 },
    { type: 'Shift', value: 240 },
    { type: 'Retired', value: 100 },
  ];
  
  
  // Define the configuration for the pie chart
const pieConfig = {
    appendPadding: 10,
    data: pieData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'spider',
      content: '{name} {percentage}',
    },
    width: 350, // specify the width
    height: 200, // specify the height
  };
  

  return (
    <>
      <Title
        level={4}
        style={{ padding: "10px 30px", marginBottom: "0", marginTop: 15 }}
      >
        Employee Statistics
      </Title>
      <Layout>
        <Content>
          <div
            className="site-layout-background"
            style={{ padding: "0 24px", minHeight: 360 }}
          >
            <Row gutter={{ xs: 16, sm: 32, md: 64, lg: 200 }}>
              <Col xs={24} sm={12} md={8} lg={4}>
                <Card bordered={false} style={{ width: 200, marginBottom:"20px" }}>
                  <Statistic
                    title="Employee"
                    value={2000}
                    valueStyle={{ color: "#3f8600" }}
                    prefix={<UserOutlined />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8} lg={4}>
                <Card bordered={false} style={{ width: 200, marginBottom:"20px" }}>
                  <Statistic
                    title="Active Employee"
                    value={1500}
                    valueStyle={{ color: "#3f8600" }}
                    prefix={<UserOutlined />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8} lg={4}>
                <Card bordered={false} style={{ width: 200, marginBottom:"20px" }}>
                  <Statistic
                    title="On Leave"
                    value={56}
                    valueStyle={{ color: "#3f8600" }}
                    prefix={<UserOutlined />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8} lg={4}>
                <Card bordered={false} style={{ width: 200, marginBottom:"20px" }}>
                  <Statistic
                    title="Shift Employee"
                    value={240}
                    valueStyle={{ color: "#3f8600" }}
                    prefix={<UserOutlined />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8} lg={4}>
                <Card bordered={false} style={{ width: 200, marginBottom:"20px" }}>
                  <Statistic
                    title="Retired"
                    value={100}
                    valueStyle={{ color: "#3f8600" }}
                    prefix={<UserOutlined />}
                  />
                </Card>
              </Col>
            </Row>
            {/* <Row  gutter={16}>
              <Col xs={24} sm={24} md={12} lg={12}>
                <Card bordered={false}>
                  <Column {...columnConfig} />
                </Card>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12}>
                <Card bordered={false}>
                  <Pie {...pieConfig} />
                </Card>
              </Col>
            </Row> */}
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default DashboardStat;
