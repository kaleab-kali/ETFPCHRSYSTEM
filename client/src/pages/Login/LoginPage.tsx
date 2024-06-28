import {
  Layout,
  Typography,
  theme,
  Form,
  Input,
  Button,
  message,
  Select,
} from "antd";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { loginEmployee, loginInvStaff } from "../../services/api/authApi";
import { useNavigate } from "react-router-dom";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const { Option } = Select;

const LoginPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loginType, setLoginType] = useState<"employee" | "hrstaffs">(
    "employee"
  );

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      let data;
      if (loginType === "employee") {
        data = await loginEmployee(values.email, values.password);
      } else {
        data = await loginInvStaff(values.email, values.password);
      }
      login(data.token, data.role, loginType, data?.employeeId, data?.ObjId);
      console.log(data.token, data.role, loginType);
      navigate("/");
      message.success("Login successful!");
    } catch (error) {
      message.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <div className="logo-image-class">
          <img
            src={process.env.PUBLIC_URL + "/fpp.jpg"}
            alt="Company Logo"
            style={{
              height: "70px",
              borderRadius: "20px",
              margin: "20px 10px",
            }}
          />
        </div>
        <Title level={2} style={{ color: "white", margin: 0 }}>
          የፌደራል ማረሚያ ቤቶች አስተዳደር
        </Title>
      </Header>
      <Content>
        <div
          style={{
            padding: 24,
            margin: "5px 24px",
            minHeight: 480,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Title level={4}>Login</Title>
          <Select
            defaultValue="employee"
            style={{ width: 120, marginBottom: 20 }}
            onChange={(value: "employee" | "hrstaffs") => setLoginType(value)}
          >
            <Option value="employee">Employee</Option>
            <Option value="hrstaffs">HRStaffs</Option>
          </Select>
          <Form name="login" onFinish={onFinish} style={{ maxWidth: 300 }}>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
      {/* <Footer style={{ textAlign: "center" }}>
        FPC @ {new Date().getFullYear()} Created by FPC Team
      </Footer> */}
    </Layout>
  );
};

export default LoginPage;
