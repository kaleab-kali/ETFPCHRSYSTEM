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
import { useLoginMutation, useForgetPasswordRequestMutation } from "../../services/mutations/authMutation";

const { Header, Content, Footer } = Layout;
const { Title, Text, Link } = Typography;

const LoginPage2: React.FC = () => {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState<"employee" | "hrstaffs">(
    "employee"
  );
  const forgetPassReq= useForgetPasswordRequestMutation()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { mutate: handleLogin, status: loading } =
    useLoginMutation(loginType);

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
    forgetPassReq.mutate(email)
    setIsModalVisible(false);
    // message.success("Password reset email sent!\n the Admin will contact you");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout style={{ background: "#fff" }}>
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
      <Content>
        <Row className="login-container" style={{ background: "white" }}>
          <Col className="login-form-container" xs={24} md={12}>
            <Card bordered={false} style={{ width: "60%" }}>
              <div className="logo">
                <img
                  src={process.env.PUBLIC_URL + "/fpp.jpg"}
                  alt="Company Logo"
                  style={{
                    height: "70px",
                    borderRadius: "20px",
                    margin: "20px 10px",
                  }}
                />
                <Title level={3} style={{ margin: 0 }}>
                  Federal Prison HR
                </Title>
              </div>
              <Title style={{ textAlign: "center" }} level={2}>
                Welcome Back!
              </Title>
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
              <Text>Please enter login details below</Text>
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
                  <Input placeholder="Enter the email" />
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
                    loading={loading==="pending"}
                  >
                    Sign in
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col
            className="login-image-container"
            style={{
              background: "white",
              marginLeft: "-140px",
              height: "800px",
              marginTop: "-100px",
              zIndex: "1",
            }}
            xs={0}
            md={12}
          >
            <img src={Login} alt="Login Image" height={"900px"} />
          </Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: "center", zIndex: 10 }}>
        FPC @ {new Date().getFullYear()} Created by FPC Team
      </Footer>

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
