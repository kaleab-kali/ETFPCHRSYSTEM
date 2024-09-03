import React, { useState, useEffect } from "react";
import {
  Layout,
  Typography,
  Button,
  Modal,
  Form,
  InputNumber,
  Row,
  Col,
  Table,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useCreatePerformance } from "../../../services/mutations/performanceMutation";
import { EmployeeData } from "../../../../../shared/types/employeeTypes";
import { usePerformaces } from "../../../services/queries/performanceQueries";
import { EvaluationData } from "../../../../../shared/types/performaceTypes";
import { useAuth } from "../../../context/AuthContext";

interface EmployeeId {
  selectedEmployee?: EmployeeData;
}

const HealthTab = ({ selectedEmployee }: EmployeeId) => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const { Title } = Typography;
  const { Content } = Layout;
  const performance = useCreatePerformance();
  const fetchedEmployeePerformances = usePerformaces(selectedEmployee?.empId);
  const [performanceData, setPerformanceData] = useState<EvaluationData[]>([]);
  const {user}=useAuth()
  useEffect(() => {
    const data = fetchedEmployeePerformances.data;
    if (Array.isArray(data) && data.length > 0) {
      console.log(data[0]);
      setPerformanceData(data);
    } else if (selectedEmployee?.evaluations) {
      setPerformanceData(selectedEmployee.evaluations);
    }
    console.log(data);
  }, [fetchedEmployeePerformances.data, selectedEmployee?.evaluations]);

  const onFinish = (values: any) => {
    console.log(selectedEmployee?.department);
    values.employeeId = selectedEmployee?.empId;
    console.log(values);
    performance.mutate(values);
    setModalVisible(false);
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const columns = [
    {
      title: "Work Quality (out of 20)",
      dataIndex: "workQuality",
      key: "workQuality",
    },
    {
      title: "Productivity (out of 20)",
      dataIndex: "productivity",
      key: "productivity",
    },
    {
      title: "Communication (out of 20)",
      dataIndex: "communication",
      key: "communication",
    },
    {
      title: "Collaboration (out of 20)",
      dataIndex: "collaboration",
      key: "collaboration",
    },
    {
      title: "Punctuality (out of 20)",
      dataIndex: "punctuality",
      key: "punctuality",
    },
    {
      title: "Year",
      dataIndex: "evaluationYear",
      key: "year",
    },
  ];

  return (
    <Layout>
      <Content
        style={{
          display: "flex",
          backgroundColor: "white",
          padding: 20,
          position: "relative",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2>Recent Performance</h2>
        </div>
        <Table
          columns={columns}
          dataSource={performanceData}
          pagination={false}
          size="middle"
          bordered
        />
        {(user?.role === "department head" || user?.role === "manager") && selectedEmployee?.empId!==user?.employeeId && (
          <Button
            type="primary"
            shape="circle"
            size="large"
            icon={<PlusOutlined />}
            style={{
              position: "absolute",
              bottom: 20,
              right: 20,
            }}
            onClick={showModal}
          />
        )}

        <Modal
          title="Rate Performance"
          open={modalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
              name="employeeId"
              hidden
              initialValue={selectedEmployee?.empId}
            >
              <InputNumber style={{ display: "none" }} />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="workQuality"
                  label="Work Quality (out of 20)"
                  rules={[{ required: true, message: "Please rate!" }]}
                >
                  <InputNumber min={0} max={20} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="productivity"
                  label="Productivity (out of 20)"
                  rules={[{ required: true, message: "Please rate!" }]}
                >
                  <InputNumber min={0} max={20} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="communication"
                  label="Communication (out of 20)"
                  rules={[{ required: true, message: "Please rate!" }]}
                >
                  <InputNumber min={0} max={20} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="collaboration"
                  label="Collaboration (out of 20)"
                  rules={[{ required: true, message: "Please rate!" }]}
                >
                  <InputNumber min={0} max={20} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="punctuality"
                  label="Punctuality (out of 20)"
                  rules={[{ required: true, message: "Please rate!" }]}
                >
                  <InputNumber min={0} max={20} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};

export default HealthTab;
