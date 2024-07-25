import React, { useState } from "react";
import {
  Button,
  theme,
  Card,
  Col,
  Form,
  Input,
  Layout,
  Row,
  Select,
  Typography,
  message,
  Modal,
} from "antd";
import { useNavigate } from "react-router-dom";
import Login from "../../assets/Login.jpg";
import "./LoginPage.css";
import { Option } from "antd/es/mentions";
import {
  useLoginMutation,
  useForgetPasswordRequestMutation,
} from "../../services/mutations/authMutation";

const { Header, Content, Footer } = Layout;
const { Title, Text, Link } = Typography;

const LoginPage2: React.FC = () => {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState<"employee" | "hrstaffs">(
    "employee"
  );
  const forgetPassReq = useForgetPasswordRequestMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email, setEmail] = useState("");

  const { mutate: handleLogin, status: loading } = useLoginMutation(loginType);

  const onFinish = (values: { email: string; password: string }) => {
    handleLogin(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Handle email submission logic here
    forgetPassReq.mutate(email);
    setIsModalVisible(false);
    // message.success("Password reset email sent!\n the Admin will contact you");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout
      style={{
        backgroundImage: "url(/6.webp)",
        height: "100vh",
        width: "100vw",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
          padding: 20,
        }}
      >
        <img
          src={process.env.PUBLIC_URL + "/fpp.jpg"}
          alt="Company Logo"
          style={{
            height: "70px",
            borderRadius: "50%",
            marginLeft: 30,
          }}
        />
      </Header>
      <Content style={{ background: "transparent" }}>
        <Title style = {{color: "white", textAlign: "center", backgroundColor: "blue", borderRadius: "2rem", width: "60%", marginLeft:"17rem", padding:"0.2rem 0"}}>የፌዴራል ማረሚያ ፖሊስ የሰው ሀብት ሲስተም ዳታ ቤዝ</Title>
        <Row className="login-container" style={{ background: "transparent", marginTop: "-7rem"}}>
          <Col className="login-form-container" xs={24} md={12}>
            <Card
              bordered={false}
              style={{ width: "60%", marginTop: 0}}
              // title="Ethiopian Federal Prison Commission"
            >
              <Select
                defaultValue="employee"
                style={{
                  width: "60%",
                  marginBottom: 20,
                  textAlign: "center",
                  left: "20%",
                  right: "20%",
                }}
                onChange={(value: "employee" | "hrstaffs") =>
                  setLoginType(value)
                }
              >
                <Option value="employee">Employee</Option>
                <Option value="hrstaffs">HRStaffs</Option>
              </Select>
              <br />
              <Form
                name="login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input
                    placeholder="Enter the email"
                    // className="transparent-input"
                  />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password placeholder="Enter the password" />
                </Form.Item>

                {loginType === "employee" && (
                  <Form.Item>
                    <Link href="#" onClick={showModal}>
                      Forgot password?
                    </Link>
                  </Form.Item>
                )}

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={loading === "pending"}
                  >
                    Sign in
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </Content>

      <Modal
        title="Forgot Password"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item
            label="Email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default LoginPage2;
