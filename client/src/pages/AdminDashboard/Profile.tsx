import React from "react";
import {
  Layout,
  Avatar,
  Typography,
  Button,
  List,
  Progress,
  Statistic,
  Row,
  Col,
  Divider,
  Card,
} from "antd";
import { LinkedinOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface Task {
  title: string;
  members: number;
}

const tasks: Task[] = [
  {
    title: "1. Start the two hours design sprint",
    members: 7,
  },
  {
    title: "2. Complete the Documentation of Travito.app",
    members: 2,
  },
  {
    title: "3. Do A/B Testing on bench with team members",
    members: 1,
  },
];

const ProfilePage: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      <Layout.Content style={{ padding: "24px" }}>
        <Card
          style={{
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Row gutter={[24, 24]}>
            <Col span={24} style={{ display: "flex", alignItems: "center" }}>
              <Avatar
                size={64}
                src="https://example.com/avatar.jpg"
                style={{ marginRight: "16px" }}
              />
              <div>
                <Title level={4} style={{ marginBottom: "4px" }}>
                  Harish Ramachandran
                </Title>
                <Text>UI/UX Designer</Text>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "8px",
                  }}
                >
                  <Text style={{ marginRight: "16px" }}>+91 766187209</Text>
                  <Text style={{ marginRight: "16px" }}>Hyderabad</Text>
                  <LinkedinOutlined />
                </div>
              </div>
            </Col>
            <Col span={24}>
              <Divider />
            </Col>
            <Col span={12}>
              <Title level={5} style={{ marginBottom: "8px" }}>
                Start where you left off
              </Title>
              <Text>Complete the two hours design sprint</Text>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "8px",
                }}
              >
                <Avatar.Group
                  maxCount={3}
                  size="small"
                  maxStyle={{ color: "#999", backgroundColor: "#f5f5f5" }}
                >
                  {Array.from({ length: 7 }, (_, i) => (
                    <Avatar
                      key={i}
                      src={`https://example.com/avatar-${i}.jpg`}
                    />
                  ))}
                </Avatar.Group>
                <Text style={{ marginLeft: "8px" }}>7 members</Text>
              </div>
              <Button type="primary" style={{ marginTop: "16px" }}>
                Jump to the project
              </Button>
            </Col>
            <Col
              span={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Progress
                type="circle"
                percent={70}
                width={120}
                strokeColor="#7265e6"
                format={() => (
                  <div>
                    <Title level={4}>70%</Title>
                    <Text>Score</Text>
                  </div>
                )}
              />
              <Button
                type="text"
                style={{ color: "#7265e6", marginLeft: "16px" }}
              >
                Fantastic job
              </Button>
            </Col>
            <Col span={24}>
              <Divider />
            </Col>
            <Col span={24}>
              <Row gutter={[16, 16]}>
                <Col span={6}>
                  <Statistic title="Active goals" value={3} />
                </Col>
                <Col span={6}>
                  <Statistic title="Progress" value={40} suffix="%" />
                </Col>
                <Col span={6}>
                  <Statistic title="Completed Task" value={6} />
                </Col>
                <Col span={6}>
                  <Statistic title="Due Tasks" value={2} />
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Title level={5} style={{ marginBottom: "16px" }}>
                Complete Due Tasks
              </Title>
              <List
                itemLayout="horizontal"
                dataSource={tasks}
                renderItem={(task) => (
                  <List.Item
                    style={{
                      padding: "16px",
                      borderRadius: "8px",
                      background: "#f5f5f5",
                      marginBottom: "8px",
                    }}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar.Group
                          maxCount={3}
                          size="small"
                          maxStyle={{
                            color: "#999",
                            backgroundColor: "#e9e9e9",
                          }}
                        >
                          {Array.from({ length: task.members }, (_, i) => (
                            <Avatar
                              key={i}
                              src={`https://example.com/avatar-${i}.jpg`}
                            />
                          ))}
                        </Avatar.Group>
                      }
                      title={<Text>{task.title}</Text>}
                      description={<Text>{task.members} members</Text>}
                    />
                  </List.Item>
                )}
              />
            </Col>
            <Col span={24}>
              <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
                <Col span={8}>
                  <Statistic
                    title="Performance"
                    value={43}
                    valueStyle={{ color: "#7265e6" }}
                    suffix="%"
                    prefix={<Text>Based on work</Text>}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Success"
                    value={76}
                    valueStyle={{ color: "#52c41a" }}
                    suffix="%"
                    prefix={<Text>Based on Projects</Text>}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Innovation"
                    value={32}
                    valueStyle={{ color: "#faad14" }}
                    suffix="%"
                    prefix={<Text>worked ideas</Text>}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Layout.Content>
    </Layout>
  );
};

export default ProfilePage;
