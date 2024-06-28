import React, { useEffect, useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import "../LoginEmployee/CreatePassword.css";
import { useFirstTimePasswordEmployeeMutation } from "../../services/mutations/passwordMutation";
import { useLocation } from "react-router-dom";

const { Title } = Typography;

const FirstEmployeePasswordComp: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const newpass = useFirstTimePasswordEmployeeMutation();

  const onFinish = (values: any) => {
    setLoading(true);
    const { newPassword, confirmPassword, email } = values;

    // Log the submitted values to the console
    console.log("Submitted values:", values);
    const data = {
      email: email,
      newPassword: newPassword,
    };
    newpass.mutate(data);
    // Simulate a server request for password creation
    // setTimeout(() => {
    //   if (newPassword === confirmPassword) {
    //     message.success("Password has been successfully created!");
    //     console.log("Password has been successfully created!");
    //   } else {
    //     message.error("Passwords do not match!");
    //     console.log("Passwords do not match!");
    //   }
    //   setLoading(false);
    // }, 2000);
  };

  return (
    <div className="create-password-container">
      <Title style={{ margin: "2rem" }} level={3}>
        Create New Password
      </Title>
      <Form
        name="First Employee Password"
        onFinish={onFinish}
        layout="vertical"
        requiredMark="optional"
        className="create-password-form"
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[
            {
              required: true,
              message: "Please input your new password!",
            },
            {
              min: 8,
              message: "Password must be at least 8 characters!",
            },
            {
              pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
              message:
                "Password must include uppercase, lowercase, and a number!",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Enter new password"
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={["newPassword"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Confirm new password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="create-password-button"
          >
            Submit Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FirstEmployeePasswordComp;
