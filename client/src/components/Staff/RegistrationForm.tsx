import React from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Upload,
  Button,
  Row,
  Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext";
import { useCreateStaff } from "../../services/mutations/staffMutation";

const { Option } = Select;

const RegistrationForm: React.FC = () => {
  const [form] = Form.useForm();
  const { user } = useAuth();
  const createStaff = useCreateStaff();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      // Create a new FormData object
      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("role", values.role);
      formData.append(
        "employmentDate",
        values.employmentDate.format("YYYY-MM-DD")
      );
      if (values.photo && values.photo.length > 0) {
        formData.append("photo", values.photo[0].originFileObj);
      }
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("email", values.email);
      formData.append("password", values.password);

      // Log FormData content for debugging
      console.log("FormData before sending:");
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      createStaff.mutate(formData);
    } catch (error) {
      console.log("Validate Failed:", error);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: "Please enter first name" }]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: "Please enter last name" }]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select role" }]}
          >
            <Select placeholder="Select Role">
              {user?.role === "admin" && (
                <>
                  <Option value="hrmanager">HR Manager</Option>
                  <Option value="staff">Staff</Option>
                </>
              )}
              {user?.role === "hrmanager" && (
                <Option value="staff">Staff</Option>
              )}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="employmentDate"
            label="Employment Date"
            rules={[
              { required: true, message: "Please select the employment date" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[{ required: true, message: "Please enter phone number" }]}
          >
            <Input placeholder="Phone Number" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please enter your password" },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character",
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="photo"
            label="Photo"
            valuePropName="fileList"
            getValueFromEvent={(e: any) =>
              Array.isArray(e) ? e : e && e.fileList
            }
            rules={[{ required: true, message: "Please upload a photo" }]}
          >
            <Upload name="photo" listType="picture" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Upload Photo</Button>
            </Upload>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;
