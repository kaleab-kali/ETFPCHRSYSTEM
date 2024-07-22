import React, { useState } from "react";
import {
  Form,
  Select,
  Input,
  Button,
  Layout,
  Typography,
  Row,
  Col,
} from "antd";
import ComplaintGif from "../../assets/techny-receiving-a-letter-or-email.gif";
import { useCreateComplaint } from "../../services/mutations/complaintMutation";
import { useComplaintforForm } from "../../services/queries/complaintQueries";

const { Content } = Layout;
const { Option } = Select;
const { Title } = Typography;

interface Complaint {
  category: string;
  complaint: string;
  description?: string;
}

const ComplaintForm: React.FC = () => {
  const [form] = Form.useForm();
  const complaintForForm = useComplaintforForm();
  const [category, setCategory] = useState<string | undefined>(undefined);
  const createComplaint = useCreateComplaint();

  const handleSubmit = (values: Complaint) => {
    console.log("Submitted Complaint:", values);
    createComplaint.mutate(values);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    form.setFieldsValue({ complaint: undefined }); // Reset complaint field when category changes
  };

  // Group complaints by category
  const complaintsByCategory = complaintForForm.data?.reduce(
    (acc: { [key: string]: any[] }, item: any) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {}
  );

  return (
    <Layout>
      <Title
        level={4}
        style={{
          padding: "10px 30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Military Police Complaint Form
      </Title>

      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "30px",
          marginLeft: "50px",
          backgroundColor: "white",
          width: "91%",
        }}
      >
        <Form
          form={form}
          style={{
            background: "#fff",
            padding: "30px",
            height: "540px",
            width: "50%",
          }}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="employeeId"
                label="Employee ID"
                rules={[
                  { required: true, message: "Please Enter Employee ID" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={18}>
              <Form.Item
                name="category"
                label="Category"
                rules={[
                  { required: true, message: "Please select a category" },
                ]}
              >
                <Select
                  placeholder="Select Category"
                  onChange={handleCategoryChange}
                >
                  {Object.keys(complaintsByCategory || {}).map((category) => (
                    <Option key={category} value={category}>
                      {category}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                name="complaint"
                label="Complaint"
                rules={[
                  { required: true, message: "Please select a complaint" },
                ]}
              >
                <Select placeholder="Select Complaint">
                  {category &&
                    complaintsByCategory?.[category]?.map((complaint:any) => (
                      <Option key={complaint._id} value={complaint.name}>
                        {complaint.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="description" label="Description">
            <Input.TextArea placeholder="Optional Description" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit Complaint
            </Button>
          </Form.Item>
        </Form>

        <div>
          <img
            src={ComplaintGif}
            alt="complaint"
            width="300px"
            height="540px"
            style={{
              borderTopRightRadius: "30px",
              borderBottomRightRadius: "30px",
              marginTop: "4px",
              marginLeft: "-50px",
            }}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default ComplaintForm;
