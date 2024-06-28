import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Typography,
  Button,
  Modal,
  Form,
  Input,
  message,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { EmployeeData } from "../../../../../shared/types/employeeTypes";
import { useUpdateEmployee } from "../../../services/mutations/employeeMutations";
import Loader from "../../Common/Loader";
import { useMutationWithStatus } from "../UpdateHooks/useMutationWithStatus";
import { useAuth } from "../../../context/AuthContext";

interface MotherIfnoProps {
  selectedEmployee?: EmployeeData;
}

function MotherIfno({ selectedEmployee }: MotherIfnoProps) {

  const { Title } = Typography;
// State to track the visibility of each edit modal
  const {user} =useAuth()
  const [motherInfoEditModalVisible, setEditMotherInfoModalVisible] =
    React.useState(false);
  const [loaderSpinners, setLoaderSpinners] = useState<boolean>(false);
  const handleToggleMotherInfoEditModal = () => {
    setEditMotherInfoModalVisible(!motherInfoEditModalVisible);
  };

  const [form] = Form.useForm();

  const updateEmployeeMutuation = useUpdateEmployee();
  const { status } = updateEmployeeMutuation;
  useEffect(() => {
    if (status === "pending") {
      setLoaderSpinners(true);
      // setEditCurrentAddModalVisible(!currentAddEditModalVisible);

      // showLoader();
    }
    if (status === "success") {
      setEditMotherInfoModalVisible(!motherInfoEditModalVisible);
      setLoaderSpinners(false);
      message.success("Form updated successfully!");
    }
  }, [status, setLoaderSpinners, setEditMotherInfoModalVisible]);
  const { mutate, isLoading } = useMutationWithStatus(updateEmployeeMutuation, {
    onSuccess: () => {
      setEditMotherInfoModalVisible(false);
    },
  });
  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (values) {
        mutate({ ...selectedEmployee, ...values });
      }
    } catch (errorInfo) {
      console.log("Validation failed:", errorInfo);
    }
  };

  return (
    <div className="">
      <Title style={{ fontSize: 24 }}>Mother's Information</Title>
      <Row gutter={[16, 16]}>
        <Col span={8} className=" -space-y-2">
          <Title style={{ fontSize: 14 }} type="secondary">
            First Name
          </Title>
          <Title style={{ fontSize: 16 }}>
            {selectedEmployee?.motherInformation.firstName}
          </Title>
        </Col>
        <Col span={8} className=" -space-y-2">
          <Title style={{ fontSize: 14 }} type="secondary">
            Middle Name
          </Title>
          <Title style={{ fontSize: 16 }}>
            {selectedEmployee?.motherInformation?.middleName}
          </Title>
        </Col>
        <Col span={8} className=" -space-y-2">
          <Title style={{ fontSize: 14 }} type="secondary">
            Last Name
          </Title>
          <Title style={{ fontSize: 16 }}>
            {selectedEmployee?.motherInformation.lastName}
          </Title>
        </Col>
        <Col span={8} className=" -space-y-2">
          <Title style={{ fontSize: 14 }} type="secondary">
            Phone Number
          </Title>
          <Title style={{ fontSize: 16 }}>
            {selectedEmployee?.motherInformation.phoneNumber.number}
          </Title>
        </Col>
      </Row>
      {(user?.role==="staff" || user?.role==="hrmanager")&&(
      <Button
        type="primary"
        icon={<EditOutlined />}
        onClick={handleToggleMotherInfoEditModal}
        className=" float-right bg-blue-500"
      >
        Edit
      </Button>
      )}
      <Modal
        title="Edit Mother's Information"
        visible={motherInfoEditModalVisible}
        onCancel={handleToggleMotherInfoEditModal}
        footer={null}
      >
        <Form
          name="editMotherInfo"
          initialValues={selectedEmployee}
          form={form}
          onFinish={handleFormSubmit}
        >
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                label="Mother's First Name"
                name={["motherInformation", "firstName"]}
                rules={[
                  {
                    required: true,
                    message: "Please enter your mother's first name",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item
                label="Mother's Middle Name"
                name={["motherInformation", "middleName"]}
                
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item
                label="Mother's Last Name"
                name={["motherInformation", "lastName"]}
                rules={[
                  {
                    required: true,
                    message: "Please enter your mother's last name",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              {/* Input Group for Phone Number */}
              <Form.Item
                label="Mother's Phone Number"
                name={["motherInformation", "phoneNumber"]}
                rules={[
                  {
                    required: true,
                    message: "Please enter your mother's phone number",
                  },
                ]}
              >
                <Input.Group compact>
                  {/* Ethiopian country code */}
                  {/* <Form.Item
                    name={["motherInformation", "phoneNumber", "prefix"]}
                    noStyle
                    initialValue="+251"
                  >
                    <Input style={{ width: "20%" }} readOnly />
                  </Form.Item> */}
                  {/* Phone number input */}
                  <Form.Item
                    name={["motherInformation", "phoneNumber", "number"]}
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: "Please enter your mother's phone number",
                      },
                    ]}
                  >
                    <Input style={{ width: "130px" }} />
                  </Form.Item>
                </Input.Group>
              </Form.Item>
            </Col>
          </Row>
          <Button
            type="primary"
            htmlType="submit"
            style={{ background: "#1890ff", borderColor: "#1890ff" }}
          >
            Save
          </Button>
          <Button type="default" onClick={handleToggleMotherInfoEditModal}>
            Cancel
          </Button>
        </Form>
      </Modal>
      <Loader value={isLoading} />
    </div>
  );
}

export default MotherIfno;
