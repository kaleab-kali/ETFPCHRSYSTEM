import React, { useEffect, useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import "./CreatePassword.css";
import { useResetPasswordEmployeeMutation } from "../../services/mutations/passwordMutation";
import { useLocation } from "react-router-dom";

const { Title } = Typography;

const CreatePassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const newpass = useResetPasswordEmployeeMutation();
  const location = useLocation();

  useEffect(() => {
    // Extract the token from the URL
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get("token");
    setToken(tokenFromUrl);
  }, [location]);
  const onFinish = (values: any) => {
    setLoading(true);
    const { newPassword, confirmPassword } = values;

    // Log the submitted values to the console
    console.log("Submitted values:", values);
    if (!token) {
      message.error("Token is missing!");
      setLoading(false);
      return;
    }
    const data={
      token: token,
      newPassword: newPassword,
    }
    newpass.mutate(data)
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
    <div className='create-password-container'>
      <Title style={{ margin: "2rem" }} level={3}>
        Create New Password
      </Title>
      <Form
        name='createPassword'
        onFinish={onFinish}
        layout='vertical'
        requiredMark='optional'
        className='create-password-form'
      >
        <Form.Item
          name='newPassword'
          label='New Password'
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
            placeholder='Enter new password'
          />
        </Form.Item>
        <Form.Item
          name='confirmPassword'
          label='Confirm Password'
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
            placeholder='Confirm new password'
          />
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            loading={loading}
            className='create-password-button'
          >
            Submit Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreatePassword;
