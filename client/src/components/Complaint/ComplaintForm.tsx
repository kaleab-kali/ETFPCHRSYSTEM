import React, { useState } from "react";
import { Form, Select, Input, Button, Layout,Typography, Row, Col } from "antd";
import ComplaintGif from "../../assets/techny-receiving-a-letter-or-email.gif"
import { useCreateComplaint } from "../../services/mutations/complaintMutation";
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
  const [category, setCategory] = useState<string | undefined>(undefined);
  const createComplaint= useCreateComplaint()
  const handleSubmit = (values: Complaint) => {
    console.log("Submitted Complaint:", values);
    // You can send the complaint data to your backend or perform any other action here
    createComplaint.mutate(values)
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    form.setFieldsValue({ complaint: undefined }); // Reset complaint field when category changes
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
                  <Option value="Conduct and Behavior">
                    Conduct and Behavior
                  </Option>
                  <Option value="Performance and Duty-related">
                    Performance and Duty-related
                  </Option>
                  <Option value="Rights Violations">Rights Violations</Option>
                  <Option value="Policy and Procedure">
                    Policy and Procedure
                  </Option>
                  <Option value="Communication and Interaction">
                    Communication and Interaction
                  </Option>
                  <Option value="Training and Preparedness">
                    Training and Preparedness
                  </Option>
                  <Option value="Integrity and Ethics">
                    Integrity and Ethics
                  </Option>
                  <Option value="Miscellaneous">Miscellaneous</Option>
                  {/* Add more categories here */}
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
                  {/* Add complaints based on the selected category */}
                  {category === "Conduct and Behavior" && (
                    <>
                      <Option value="Use of Excessive Force">
                        Use of Excessive Force
                      </Option>
                      <Option value="Harassment">Harassment</Option>
                      <Option value="Discrimination">Discrimination</Option>
                      <Option value="Abuse of Authority">
                        Abuse of Authority
                      </Option>
                      <Option value="Inappropriate Behavior">
                        Inappropriate Behavior
                      </Option>
                      <Option value="Intoxication on Duty">
                        Intoxication on Duty
                      </Option>
                      <Option value="Lack of Respect">Lack of Respect</Option>
                      {/* Add more complaints under "Conduct and Behavior" category */}
                    </>
                  )}
                  {category === "Performance and Duty-related" && (
                    <>
                      <Option value="Negligence or Failure to Act">
                        Negligence or Failure to Act
                      </Option>
                      <Option value="Inefficiency">Inefficiency</Option>
                      <Option value="Failure to Respond to Emergencies">
                        Failure to Respond to Emergencies
                      </Option>
                      <Option value="Improper Securing of Areas">
                        Improper Securing of Areas
                      </Option>
                      <Option value="Inadequate Investigations">
                        Inadequate Investigations
                      </Option>
                      {/* Add more complaints under "Performance and Duty-related" category */}
                    </>
                  )}
                  {category === "Rights Violations" && (
                    <>
                      <Option value="Illegal Search and Seizure">
                        Illegal Search and Seizure
                      </Option>
                      <Option value="Improper Detainment">
                        Improper Detainment
                      </Option>
                      <Option value="Violation of Civil Rights">
                        Violation of Civil Rights
                      </Option>
                      <Option value="Violation of Service Members' Rights">
                        Violation of Service Members' Rights
                      </Option>
                      {/* Add more complaints under "Rights Violations" category */}
                    </>
                  )}
                  {category === "Policy and Procedure" && (
                    <>
                      <Option value="Violation of SOPs">
                        Violation of SOPs
                      </Option>
                      <Option value="Failure to Follow Protocol">
                        Failure to Follow Protocol
                      </Option>
                      <Option value="Breach of Regulations">
                        Breach of Regulations
                      </Option>
                      {/* Add more complaints under "Policy and Procedure" category */}
                    </>
                  )}
                  {category === "Communication and Interaction" && (
                    <>
                      <Option value="Poor Communication">
                        Poor Communication
                      </Option>
                      <Option value="Lack of Professionalism">
                        Lack of Professionalism
                      </Option>
                      <Option value="Inappropriate Language or Conduct">
                        Inappropriate Language or Conduct
                      </Option>
                      <Option value="Misuse of Equipment">
                        Misuse of Equipment
                      </Option>
                      {/* Add more complaints under "Communication and Interaction" category */}
                    </>
                  )}
                  {category === "Training and Preparedness" && (
                    <>
                      <Option value="Inadequate Training">
                        Inadequate Training
                      </Option>
                      <Option value="Lack of Knowledge">
                        Lack of Knowledge
                      </Option>
                      <Option value="Poor Skills Demonstration">
                        Poor Skills Demonstration
                      </Option>
                      {/* Add more complaints under "Training and Preparedness" category */}
                    </>
                  )}
                  {category === "Integrity and Ethics" && (
                    <>
                      <Option value="Dishonesty">Dishonesty</Option>
                      <Option value="Corruption">Corruption</Option>
                      <Option value="Bribery">Bribery</Option>
                      {/* Add more complaints under "Integrity and Ethics" category */}
                    </>
                  )}
                  {category === "Miscellaneous" && (
                    <>
                      <Option value="Personal Bias">Personal Bias</Option>
                      <Option value="Favoritism">Favoritism</Option>
                      <Option value="Conflict of Interest">
                        Conflict of Interest
                      </Option>
                      {/* Add more complaints under "Miscellaneous" category */}
                    </>
                  )}
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
