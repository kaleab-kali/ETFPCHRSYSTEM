import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Badge,
  Typography,
  Upload,
  message,
  Button,
  Form,
  Modal,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useUpdateEvidenceComplaint } from "../../../services/mutations/complaintMutation";

const { Title, Text } = Typography;

interface Complaint {
  employeeId?: string;
  category?: string;
  complaint?: string;
  description?: string;
  complaintId?: string;
  status?: string;
}

interface DisciplineCardProps {
  complaint: Complaint;
}

const DisciplineCard: React.FC<DisciplineCardProps> = ({ complaint }) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<string>("");

  const evidenceSubmit = useUpdateEvidenceComplaint();

  const showUploadModal = (record: any) => {
    setCurrentRecord(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("file", values.file[0].originFileObj);
      formData.append("complaintId", currentRecord);
      evidenceSubmit.mutate(formData);
      console.log("formData "+ formData);
    console.log("Data before mutation:", Array.from(formData.entries()));

      message.success("File uploaded and evidence updated successfully");
      setIsModalVisible(false);
      form.resetFields();
    } catch (info) {
      console.log("Validate Failed:", info);
    }
  };

  return (
    <Card style={{ width: "100%", position: "relative" }}>
      <Row gutter={16}>
        <Col span={6}>
          <Text
            type="secondary"
            style={{ marginBottom: "4px", display: "block" }}
          >
            Complaint ID
          </Text>
          <Title level={5} style={{ margin: 0 }}>
            {complaint.complaintId}
          </Title>
        </Col>
        <Col span={4}>
          <Text
            type="secondary"
            style={{ marginBottom: "4px", display: "block" }}
          >
            Complaint Type
          </Text>
          <Title level={5} style={{ margin: 0 }}>
            {complaint.category}
          </Title>
        </Col>
        <Col span={4}>
          <Text
            type="secondary"
            style={{ marginBottom: "4px", display: "block" }}
          >
            Complaint
          </Text>
          <Title level={5} style={{ margin: 0 }}>
            {complaint.complaint}
          </Title>
        </Col>
        <Col span={8}>
          <Text
            type="secondary"
            style={{ marginBottom: "4px", display: "block" }}
          >
            Description
          </Text>
          <Title level={5} style={{ margin: 0, whiteSpace: "wrap" }}>
            {complaint.description}
          </Title>
        </Col>
        {complaint.status === "inprogress" && (
          <Button
            icon={<UploadOutlined />}
            onClick={() => showUploadModal(complaint?.complaintId)}
          >
            Submit File
          </Button>
        )}
        <div style={{ position: "absolute", top: 0, right: 0 }}>
          <Badge.Ribbon
            text={complaint.status}
            color={
              complaint.status === "inprogress"
                ? "orange"
                : complaint.status === "not guilt"
                ? "green"
                : "red"
            }
          />
        </div>
      </Row>
      <Modal
        title="Upload File and Update Evidence"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="file"
            label="Upload File"
            valuePropName="fileList"
            getValueFromEvent={(e: any) =>
              Array.isArray(e) ? e : e && e.fileList
            }

            rules={[{ required: true, message: "Please upload a file!" }]}
          >
            <Upload name="file" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default DisciplineCard;
