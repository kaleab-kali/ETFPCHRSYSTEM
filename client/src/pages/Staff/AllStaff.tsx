import React, { useState } from "react";
import { Layout, Typography, Space, Button, Modal } from "antd";
import RegistrationForm from "../../components/Staff/RegistrationForm";
import Table from "../../components/Staff/Table";
const { Header, Content } = Layout;
const { Title } = Typography;

const AllStaff: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout className="layout">
        <Title >
          Staff Management
        </Title>
      <Content className="content">
        <Space direction="vertical" style={{ width: "100%", padding: "20px" }}>
          <Button type="primary" onClick={showModal}>
            Register New Staff
          </Button>
          <Table  />
        </Space>
        <Modal
          title="Register New Staff"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null} // No default footer
        >
          <RegistrationForm />
        </Modal>
      </Content>
    </Layout>
  );
};

export default AllStaff;
