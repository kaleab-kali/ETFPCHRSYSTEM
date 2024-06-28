import React from "react";
import { Form, InputNumber, Button, Layout, Typography, Row, Col } from "antd";

// interface LeaveCredits {
//   annualLeave: number;
//   familyLeave: number;
//   paternityLeave: number;
//   healthLeave: number;
//   educationLeave: number;
// }

// interface Props {
//   onSubmit: (values: LeaveCredits) => void;
// }

const LeaveCreditsForm: React.FC = () => {
  const [form] = Form.useForm();
  const { Title } = Typography;
const { Content } = Layout;

  const onFinish = (values: any) => {
    console.log(values)
  };

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
        Leave Balance Form
      </Title>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form
          style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "30px",
            width: "400px",
          }}
          layout="vertical"
          form={form}
          onFinish={onFinish}
          labelCol={{ span: 12 }}
          wrapperCol={{ span: 24 }}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="annualLeave"
                label="Annual Leave"
                rules={[
                  {
                    required: true,
                    message: "Please input Annual Leave credit!",
                  },
                  {
                    type: "number",
                    message: "Annual Leave credit must be a number!",
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="familyLeave"
                label="Family Leave"
                rules={[
                  {
                    required: true,
                    message: "Please input Family Leave credit!",
                  },
                  {
                    type: "number",
                    message: "Family Leave credit must be a number!",
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="paternityLeave"
                label="Paternity Leave"
                rules={[
                  {
                    required: true,
                    message: "Please input Paternity Leave credit!",
                  },
                  {
                    type: "number",
                    message: "Paternity Leave credit must be a number!",
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="healthLeave"
                label="Health Leave"
                rules={[
                  {
                    required: true,
                    message: "Please input Health Leave credit!",
                  },
                  {
                    type: "number",
                    message: "Health Leave credit must be a number!",
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="educationLeave"
                label="Education Leave"
                rules={[
                  {
                    required: true,
                    message: "Please input Education Leave credit!",
                  },
                  {
                    type: "number",
                    message: "Education Leave credit must be a number!",
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default LeaveCreditsForm;
