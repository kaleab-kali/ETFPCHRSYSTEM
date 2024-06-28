import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Typography,
  Button,
  Modal,
  Form,
  Select,
  Input,
  DatePicker,
  message,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { EmployeeData } from "../../../../../shared/types/employeeTypes";
import { useUpdateEmployee } from "../../../services/mutations/employeeMutations";
import Loader from "../../Common/Loader";
import { useMutationWithStatus } from "../UpdateHooks/useMutationWithStatus";
import { useAuth } from "../../../context/AuthContext";

interface MartialInfoProps {
  selectedEmployee?: EmployeeData;
}

function MartialInfo({ selectedEmployee }: MartialInfoProps) {
  
  const { Title } = Typography;
  const { Option } = Select;
  const {user} =useAuth()

  const [martialInfoEditModalVisible, setEditMartialInfoModalVisible] =
    React.useState(false);


  const [maritalStatus, setMaritalStatus] = useState<string>("single");
  const [loaderSpinners, setLoaderSpinners] = useState<boolean>(false);
  const handleMaritalStatusChange = (value: string) => {
    setMaritalStatus(value);
  };

  const handleToggleMartialInfoEditModal = () => {
    setEditMartialInfoModalVisible(!martialInfoEditModalVisible);
  };

  const [form] = Form.useForm();

  const updateEmployeeMutuation = useUpdateEmployee();
  const { status } = updateEmployeeMutuation;

  const { mutate, isLoading } = useMutationWithStatus(updateEmployeeMutuation, {
    onSuccess: () => {
      setEditMartialInfoModalVisible(false);
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
      <Title style={{ fontSize: 24 }}>Martial Information</Title>
      <Row gutter={[16, 16]}>
        <Col span={8} className=" -space-y-2">
          <Title style={{ fontSize: 14 }} type="secondary">
            Martial Status
          </Title>
          <Title style={{ fontSize: 16 }}>
            {selectedEmployee?.maritalStatus}
          </Title>
        </Col>
      </Row>
      {(user?.role==="staff" || user?.role==="hrmanager")&&(
      <Button
        type="primary"
        icon={<EditOutlined />}
        onClick={handleToggleMartialInfoEditModal}
        className=" float-right bg-blue-500"
      >
        Edit
      </Button>
      )}
      <Modal
        title="Edit Martial Information"
        visible={martialInfoEditModalVisible}
        onCancel={handleToggleMartialInfoEditModal}
        footer={null}
      >
        <Form
          name="editMartialInfo"
          initialValues={selectedEmployee}
          form={form}
          onFinish={handleFormSubmit}
        >
          <Form.Item
            label="Marital Status"
            name="maritalStatus"
            initialValue="single"
          >
            <Select onChange={handleMaritalStatusChange}>
              <Option value="married">Married</Option>
              <Option value="single">Single</Option>
              <Option value="divorced">Divorced</Option>
            </Select>
          </Form.Item>

          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.maritalStatus !== currentValues.maritalStatus
            }
          >
            {({ getFieldValue }) => {
              const currentStatus = getFieldValue("maritalStatus");

              return (
                <>
                  {currentStatus === "married" && (
                    <Form.Item label="Spouse Information" name="spouseInfo">
                      <Row gutter={16}>
                        <Col span={16}>
                          <Form.Item
                            label="First Name"
                            name={["spouseInfo", "firstName"]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={16}>
                          <Form.Item
                            label="Middle Name"
                            name={["spouseInfo", "middleName"]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={16}>
                          <Form.Item
                            label="Last Name"
                            name={["spouseInfo", "lastName"]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={16}>
                          <Form.Item
                            label="Date of Birth"
                            name={["spouseInfo", "dob"]}
                          >
                            <DatePicker placement="bottomLeft" />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={16}>
                          <Form.Item
                            label="Phone Number"
                            name={["spouseInfo", "phoneNumber"]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item
                        label="Address"
                        name={["spouseInfo", "address", "currentAddress"]}
                      >
                        <Row gutter={16}>
                          <Col span={16}>
                            <Form.Item
                              label="Region"
                              name={["spouseInfo", "address", "region"]}
                            >
                              <Select></Select>
                            </Form.Item>
                          </Col>
                          <Col span={16}>
                            <Form.Item
                              label="Subcity"
                              name={["spouseInfo", "address", "subcity"]}
                            >
                              <Select></Select>
                            </Form.Item>
                          </Col>
                        </Row>
                      </Form.Item>
                    </Form.Item>
                  )}

                  {currentStatus === "divorced" && (
                    <Form.Item label="Divorced Information" name="divorcedInfo">
                      <Row gutter={16}>
                        <Col span={16}>
                          <Form.Item
                            label="Divorce Date"
                            name={["divorcedInfo", "divorceDate"]}
                          >
                            <DatePicker style={{ width: "100%" }} />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form.Item>
                  )}
                </>
              );
            }}
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ background: "#1890ff", borderColor: "#1890ff" }}
          >
            Save
          </Button>
          <Button type="default" onClick={handleToggleMartialInfoEditModal}>
            Cancel
          </Button>
        </Form>
      </Modal>
      <Loader value={isLoading} />
    </div>
  );
}

export default MartialInfo;
