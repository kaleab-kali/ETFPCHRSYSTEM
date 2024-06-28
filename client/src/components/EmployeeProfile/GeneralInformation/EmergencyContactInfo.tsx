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
  message,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { data } from "../../../utils/data";
import { EmployeeData } from "../../../../../shared/types/employeeTypes";
import { useUpdateEmployee } from "../../../services/mutations/employeeMutations";
import Loader from "../../Common/Loader";
import { useMutationWithStatus } from "../UpdateHooks/useMutationWithStatus";
import { useAuth } from "../../../context/AuthContext";

interface EmergencyContactInfoProps {
  selectedEmployee?: EmployeeData; 
}

function EmergencyContactInfo({ selectedEmployee }: EmergencyContactInfoProps) {
  const {user}=useAuth()
    const [address, setAddress] = useState<{
      [key: string]: {
        region: string | null;
        subcity: string | null;
        woreda: string | null;
      };
    }>({
      spouseInfo: { region: null, subcity: null, woreda: null },
      emergencyContact: { region: null, subcity: null, woreda: null },
    });
  // Reset subcity and woreda when region changes
    const handleAddressChange = (
      type: string,
      field: string,
      value: string
    ) => {
      setAddress((prevState) => ({
        ...prevState,
        [type]: {
          ...prevState[type],
          [field]: value,
        },
      }));
    };

    useEffect(() => {
      Object.keys(address).forEach((type) => {
        const { region, subcity } = address[type];

        if (region) {
          const subcities = Object.keys(data[region]);
          const firstSubcity = subcities[0];
          handleAddressChange(type, "subcity", firstSubcity);
          form.setFieldsValue({
            [type]: { address: { subcity: firstSubcity } },
          });
        }

        if (region && subcity) {
          const woredas = data[region][subcity];
          const firstWoreda = woredas[0];
          handleAddressChange(type, "woreda", firstWoreda);
          form.setFieldsValue({ [type]: { address: { woreda: firstWoreda } } });
        }
      });
    }, [address]);

  const { Title, Text } = Typography;
  const { Option } = Select;
  // State to track the visibility of the emergency contact information
  const [loaderSpinners, setLoaderSpinners] = useState<boolean>(false);
  const [emergencyEditModalVisible, setEditEmergencyModalVisible] =
    React.useState(false);


  const handleToggleEmergencyEditModal = () => {
    setEditEmergencyModalVisible(!emergencyEditModalVisible);
  };

  const [form] = Form.useForm();

  const updateEmployeeMutuation = useUpdateEmployee();
  const { mutate, isLoading } = useMutationWithStatus(updateEmployeeMutuation, {
    onSuccess: () => {
      setEditEmergencyModalVisible(false);
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
      <Title style={{ fontSize: 24 }}>Emergency Contact Information</Title>
      <Row gutter={[16, 16]}>
        <Col span={8} className=" -space-y-2">
          <Title style={{ fontSize: 14 }} type="secondary">
            First Name
          </Title>
          <Title style={{ fontSize: 16 }}>
            {selectedEmployee?.emergencyContact.info.firstName}
          </Title>
        </Col>
        <Col span={8} className=" -space-y-2">
          <Title style={{ fontSize: 14 }} type="secondary">
            Middle Name
          </Title>
          <Title style={{ fontSize: 16 }}>
            {selectedEmployee?.emergencyContact.info.middleName}
          </Title>
        </Col>
        <Col span={8} className=" -space-y-2">
          <Title style={{ fontSize: 14 }} type="secondary">
            Last Name
          </Title>
          <Title style={{ fontSize: 16 }}>
            {selectedEmployee?.emergencyContact.info.lastName}
          </Title>
        </Col>
        <Col span={8} className=" -space-y-2">
          <Title style={{ fontSize: 14 }} type="secondary">
            Phone Number
          </Title>
          <Title style={{ fontSize: 16 }}>
            {selectedEmployee?.emergencyContact.info.phoneNumber}
          </Title>
        </Col>
        <Col span={8} className=" -space-y-2">
          <Title style={{ fontSize: 14 }} type="secondary">
            Email
          </Title>
          <Title style={{ fontSize: 19 }}>
            {selectedEmployee?.emergencyContact.info.email}
          </Title>
        </Col>
        <Col span={8} className=" -space-y-2">
          <Title style={{ fontSize: 14 }} type="secondary">
            Relationship
          </Title>
          <Title style={{ fontSize: 19 }}>
            {selectedEmployee?.emergencyContact.info.relationship}
          </Title>
        </Col>
        <Col span={8} className=" -space-y-2">
          <Title style={{ fontSize: 14 }} type="secondary">
            House Number
          </Title>
          <Title style={{ fontSize: 19 }}>
            {selectedEmployee?.emergencyContact.address.houseNumber}
          </Title>
        </Col>
        <Col span={8} className=" -space-y-2">
          <Title style={{ fontSize: 14 }} type="secondary">
            Leyu Bota
          </Title>
          <Title style={{ fontSize: 19 }}>
            {selectedEmployee?.emergencyContact.address.leyuBota}
          </Title>
        </Col>
      </Row>
      {(user?.role==="staff" || user?.role==="hrmanager")&&(
      <Button
        type="primary"
        icon={<EditOutlined />}
        onClick={handleToggleEmergencyEditModal}
        className="float-right bg-blue-500"
      >
        Edit
      </Button>
      )}
      <Modal
        title="Edit Emergency Information"
        visible={emergencyEditModalVisible}
        onCancel={handleToggleEmergencyEditModal}
        footer={null}
      >
        <Form
          name="editEmergencyInfo"
          initialValues={selectedEmployee}
          form={form}
          onFinish={handleFormSubmit}
        >
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                label="First Name"
                name={["emergencyContact", "info", "firstName"]}
                rules={[
                  {
                    required: true,
                    message: "Please enter the first name",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item
                label="Middle Name"
                name={["emergencyContact", "info", "middleName"]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item
                label="Last Name"
                name={["emergencyContact", "info", "lastName"]}
                rules={[
                  {
                    required: true,
                    message: "Please enter the last name",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Relationship"
                name={["emergencyContact", "info", "relationship"]}
                rules={[
                  {
                    required: true,
                    message: "Please select the relationship",
                  },
                ]}
              >
                <Select>
                  <Option value="spouse">Spouse</Option>
                  <Option value="sibling">Sibling</Option>
                  <Option value="parent">Parent</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Phone Number"
                name={["emergencyContact", "info", "phoneNumber"]}
                rules={[
                  {
                    required: true,
                    message: "Please enter the phone number",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item
                label="Email"
                name={["emergencyContact", "info", "email"]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Text>Address</Text>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Region"
                name={["emergencyContact", "address", "region"]}
              >
                <Select
                  options={Object.keys(data).map((region) => ({
                    label: region,
                    value: region,
                  }))}
                  //   onChange={handleRegionChange}
                  onChange={(value) =>
                    handleAddressChange("emergencyContact", "region", value)
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Zone/Subcity"
                name={["emergencyContact", "address", "subcity"]}
              >
                <Select
                  options={
                    data &&
                    address["emergencyContact"].region &&
                    data[address["emergencyContact"].region]
                      ? Object.keys(
                          data[address["emergencyContact"].region]
                        ).map((subcity) => ({
                          label: subcity,
                          value: subcity,
                        }))
                      : []
                  }
                  onChange={(value) =>
                    handleAddressChange("emergencyContact", "subcity", value)
                  }
                  value={address["emergencyContact"].subcity}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Woreda"
                name={["emergencyContact", "address", "woreda"]}
              >
                <Select
                  options={
                    data &&
                    address["emergencyContact"].region &&
                    address["emergencyContact"].subcity &&
                    data[address["emergencyContact"].region][
                      address["emergencyContact"].subcity
                    ]
                      ? data[address["emergencyContact"].region][
                          address["emergencyContact"].subcity
                        ].map((woreda) => ({
                          label: woreda,
                          value: woreda,
                        }))
                      : []
                  }
                  value={address["emergencyContact"].woreda}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Leyu Bota"
                name={["emergencyContact", "address", "leyuBota"]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                label="House Number"
                name={["emergencyContact", "address", "houseNumber"]}
              >
                <Input />
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
          <Button type="default" onClick={handleToggleEmergencyEditModal}>
            Cancel
          </Button>
        </Form>
      </Modal>
      <Loader value={isLoading} />
    </div>
  );
}

export default EmergencyContactInfo;
