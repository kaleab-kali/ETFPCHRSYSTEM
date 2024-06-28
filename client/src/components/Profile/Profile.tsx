import React, { useState, useEffect } from "react";
import {
  Layout,
  Card,
  Avatar,
  Space,
  Badge,
  Modal,
  Form,
  Input,
  Button,
  Typography,
  List,
  Row,
  Col,
} from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  BellOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { useProfile } from "../../services/queries/profileQueries";
import { usePasswordResetApproval, useUpdateSelfPassword } from "../../services/mutations/staffMutation";
import { useEmployeeProfile } from "../../services/queries/employeeProfileQueries";
import { useAuth } from "../../context/AuthContext";
import "./Profile.css";
import { useNotification } from "../../services/queries/notificationQueries";
import { useUpdateNotification } from "../../services/mutations/notificationMutation";

const { Content } = Layout;
const { Text, Title } = Typography;

interface Message {
  _id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const employee = useEmployeeProfile();
  const profile = employee.data;
  const getNotification = useNotification(user?.ObjId || "");
  const updateSelfPassword = useUpdateSelfPassword();
  const employeeNotifications = getNotification.data;
  const updateNotification = useUpdateNotification();
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [isMessageModalVisible, setIsMessageModalVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const passResetApproval = usePasswordResetApproval()
  useEffect(() => {
    if (employeeNotifications?.notifications) {
      setMessages(
        employeeNotifications.notifications.sort(
          (a:any, b:any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
    }
  }, [employeeNotifications]);

  const showPasswordModal = () => setIsPasswordModalVisible(true);
  const hidePasswordModal = () => setIsPasswordModalVisible(false);

  const showMessageModal = (message: Message) => {
    setSelectedMessage(message);
    const notificationSeen = { ...message, isRead: true };
    updateNotification.mutate(notificationSeen);
    setIsMessageModalVisible(true);
  };

  const hideMessageModal = () => setIsMessageModalVisible(false);

  const handleFinish = (values: any) => {
    const updateValues = { ...values, email: profile?.email };
    updateSelfPassword.mutate(updateValues);
    hidePasswordModal();
  };
  const extractEmail = (message:any) => {
    const emailPattern = /Email:\s*([^\s,]+)/;
    const match = message.match(emailPattern);
    return match ? match[1] : null;
  };
  const handleApprove = (message:string) => {
    const email = extractEmail(message);
    const status = "approved"
    const data = {
      email: email,
      status: status,
    }
    passResetApproval.mutate(data);
    console.log("Approved:", selectedMessage);
    // Add your approve logic here
    hideMessageModal();
  };

  const handleReject = (message:any) => {
    const email = extractEmail(message);
    const status = "rejected";
    const data = {
      email: email,
      status: status,
    };
    passResetApproval.mutate(data);
    console.log("Rejected:", selectedMessage);
    // Add your reject logic here
    hideMessageModal();
  };

  const uniqueMessageTypes = Array.from(
    new Set(messages.map((message) => message.title))
  );

  const [showAllMessages, setShowAllMessages] = useState<
    Record<string, boolean>
  >(Object.fromEntries(uniqueMessageTypes.map((type) => [type, false])));

  const toggleShowAllMessages = (type: string) => {
    setShowAllMessages((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const truncateMessage = (message: string, length: number) => {
    return message.length > length
      ? message.substring(0, length) + "..."
      : message;
  };

  return (
    <Layout className="layout">
      <Content className="content">
        <Space direction="vertical" size="large" style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-evenly",
            }}
          >
            <Card className="profile-card" hoverable style={{ width: "70%" }}>
              <Space size="large">
                <Avatar
                  size={130}
                  src={`http://localhost:7000/${profile?.photo}`}
                />
                <div>
                  <Title level={4}>
                    {profile?.firstName + " " + profile?.lastName}
                  </Title>
                  <Text type="secondary">{profile?.role}</Text>
                  <br />
                  <Text type="secondary">{profile?.title}</Text>
                  <br />
                  <Space size="middle">
                    <Text>
                      <MailOutlined /> {profile?.email}
                    </Text>
                    <Text>
                      <PhoneOutlined />{" "}
                      {user?.type === "hrstaffs"
                        ? profile?.phoneNumber
                        : profile?.phoneNumber.prefix +
                          " " +
                          profile?.phoneNumber.number}
                    </Text>
                    <Text>{profile?.company}</Text>
                  </Space>
                </div>
              </Space>
            </Card>
            <Space size="small">
              <div className="current-plan">
                <Title level={4} style={{ color: "#9254de" }}>
                  Welcome {profile?.firstName}
                </Title>
                {user?.type === "hrstaffs" ? (
                  <>
                    <Text>Click Here to Change your Password</Text>
                    <br />
                    <br />
                    <Button type="primary" onClick={showPasswordModal}>
                      Change Password
                    </Button>
                  </>
                ) : (
                  <div style={{ display: "flex" }}>
                    <h3>{profile?.gender}</h3>
                    <Text>Gender</Text>
                    <h3>{profile?.empId}</h3>
                    <Text>ID</Text>
                  </div>
                )}
              </div>
              <Modal
                title="Change Password"
                visible={isPasswordModalVisible}
                onCancel={hidePasswordModal}
                footer={null}
              >
                <Form layout="vertical" onFinish={handleFinish}>
                  <Form.Item
                    name="currentPassword"
                    label="Current Password"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your current password",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    name="newPassword"
                    label="New Password"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your new password",
                      },
                      {
                        pattern:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                          "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    name="confirmPassword"
                    label="Confirm Password"
                    dependencies={["newPassword"]}
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your new password",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (
                            !value ||
                            getFieldValue("newPassword") === value
                          ) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("The two passwords do not match")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Change Password
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>
            </Space>
          </div>

          {/* Messages Section */}
          <Row gutter={[16, 16]}>
            {uniqueMessageTypes.map((type) => {
              const filteredMessages = messages.filter(
                (message) => message.title === type
              );
              const displayMessages = showAllMessages[type]
                ? filteredMessages
                : filteredMessages.slice(0, 3);

              return (
                <Col span={8} key={type}>
                  <Card title={type} className="message-card">
                    <List
                      itemLayout="horizontal"
                      dataSource={displayMessages.sort(
                        (a, b) =>
                          new Date(b.createdAt).getTime() -
                          new Date(a.createdAt).getTime()
                      )}
                      renderItem={(message) => (
                        <List.Item
                          onClick={() => showMessageModal(message)}
                          style={{ cursor: "pointer" }}
                        >
                          <List.Item.Meta
                            avatar={
                              <Badge dot={!message.isRead}>
                                <Avatar icon={<BellOutlined />} />
                              </Badge>
                            }
                            title={truncateMessage(message.message, 50)} // Truncate the message here
                            description={
                              message.createdAt
                                ? new Date(message.createdAt).toLocaleString()
                                : "Unknown date"
                            }
                          />
                        </List.Item>
                      )}
                    />
                    {filteredMessages.length > 3 && (
                      <Button
                        type="link"
                        onClick={() => toggleShowAllMessages(type)}
                      >
                        {showAllMessages[type] ? "Show Less" : "Show More"}
                      </Button>
                    )}
                  </Card>
                </Col>
              );
            })}
          </Row>

          <Modal
            title={selectedMessage?.title}
            visible={isMessageModalVisible}
            onCancel={hideMessageModal}
            footer={
              selectedMessage?.title === "Password Reset Request" ? (
                [
                  <Button key="approve" type="primary" onClick={()=>handleApprove(selectedMessage.message)}>
                    Approve
                  </Button>,
                  <Button key="reject" danger onClick={()=>handleReject(selectedMessage.message)}>
                    Reject
                  </Button>,
                  <Button key="close" onClick={hideMessageModal}>
                    Close
                  </Button>,
                ]
              ) : (
                <Button key="close" onClick={hideMessageModal}>
                  Close
                </Button>
              )
            }
          >
            <p>{selectedMessage?.message}</p>
            <p>
              <ClockCircleOutlined />{" "}
              {selectedMessage?.createdAt
                ? new Date(selectedMessage.createdAt).toLocaleString()
                : "Unknown date"}
            </p>
          </Modal>
        </Space>
      </Content>
    </Layout>
  );
};

export default Profile;
