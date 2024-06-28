import React, { useState } from "react";
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

interface BirthPlaceInfoProps {
  selectedEmployee?: EmployeeData;
}

function BirthPlaceInfo({ selectedEmployee }: BirthPlaceInfoProps) {
  const [region, setRegion] = useState<string | null>(null);
  const [subcity, setSubcity] = useState<string | null>(null);
  const [woreda, setWoreda] = useState<string | null>(null);
  const {user} =useAuth()
  const handleRegionChange = (value: string) => {
    setRegion(value);
    const subcities = Object.keys(data[value]);
    const firstSubcity = subcities[0];
    setSubcity(firstSubcity);
    form.setFieldsValue({ currentAddress: { subcity: firstSubcity } });

    const woredas = data[value][firstSubcity];
    const firstWoreda = woredas[0];
    setWoreda(firstWoreda);
    form.setFieldsValue({ currentAddress: { woreda: firstWoreda } });
  };

  const handleSubcityChange = (value: string) => {
    setSubcity(value);
    const woredas = data[region!][value];
    const firstWoreda = woredas[0];
    setWoreda(firstWoreda);
    form.setFieldsValue({ currentAddress: { woreda: firstWoreda } });
  };

  const { Title } = Typography;

  const [birthDateEditModalVisible, setEditBirthDateModalVisible] =
    useState(false);
  const handleToggleBirthDateEditModal = () => {
    setEditBirthDateModalVisible(!birthDateEditModalVisible);
  };

  const [form] = Form.useForm();

  const updateEmployeeMutation = useUpdateEmployee();
  const { mutate, isLoading } = useMutationWithStatus(updateEmployeeMutation, {
    onSuccess: () => {
      setEditBirthDateModalVisible(false);
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
    <div>
      <Title style={{ fontSize: 24 }}>Birth Place Information</Title>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Title style={{ fontSize: 14 }} type="secondary">
            Region
          </Title>
          <Title style={{ fontSize: 16 }}>
            {selectedEmployee?.birthplaceInfo.region}
          </Title>
        </Col>
        <Col span={8}>
          <Title style={{ fontSize: 14 }} type="secondary">
            Zone/Subcity
          </Title>
          <Title style={{ fontSize: 16 }}>
            {selectedEmployee?.birthplaceInfo.subcity}
          </Title>
        </Col>
        <Col span={8}>
          <Title style={{ fontSize: 14 }} type="secondary">
            Woreda
          </Title>
          <Title style={{ fontSize: 16 }}>
            {selectedEmployee?.birthplaceInfo.woreda}
          </Title>
        </Col>
        <Col span={8}>
          <Title style={{ fontSize: 14 }} type="secondary">
            House Number
          </Title>
          <Title style={{ fontSize: 16 }}>
            {selectedEmployee?.birthplaceInfo.houseNumber}
          </Title>
        </Col>
        <Col span={8}>
          <Title style={{ fontSize: 14 }} type="secondary">
            Leyu Bota
          </Title>
          <Title style={{ fontSize: 16 }}>
            {selectedEmployee?.birthplaceInfo.leyuBota}
          </Title>
        </Col>
      </Row>
      {(user?.role==="staff" || user?.role==="hrmanager")&&(
      <Button
        type="primary"
        icon={<EditOutlined />}
        onClick={handleToggleBirthDateEditModal}
        className="float-right bg-blue-500"
      >
        Edit
      </Button>
      )}
      <Modal
        title="Edit Birth Place Information"
        visible={birthDateEditModalVisible}
        onCancel={handleToggleBirthDateEditModal}
        footer={null}
      >
        <Form
          name="editBirthPlaceInfo"
          initialValues={selectedEmployee}
          form={form}
          onFinish={handleFormSubmit}
        >
          <Row gutter={16}>
            <Col span={10}>
              <Form.Item label="Region" name={["birthplaceInfo", "region"]}>
                <Select
                  options={Object.keys(data).map((region) => ({
                    label: region,
                    value: region,
                  }))}
                  onChange={handleRegionChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Zone/Subcity"
                name={["birthplaceInfo", "subcity"]}
              >
                <Select
                  options={
                    region
                      ? Object.keys(data[region]).map((subcity) => ({
                          label: subcity,
                          value: subcity,
                        }))
                      : []
                  }
                  onChange={handleSubcityChange}
                  value={subcity}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Woreda" name={["birthplaceInfo", "woreda"]}>
                <Select
                  options={
                    region && subcity
                      ? data[region][subcity].map((woreda) => ({
                          label: woreda,
                          value: woreda,
                        }))
                      : []
                  }
                  value={woreda}
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                label="House Number"
                name={["birthplaceInfo", "houseNumber"]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={10}>
              <Form.Item
                label="Leyu Bota"
                name={["birthplaceInfo", "leyuBota"]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label="Camp" name={["birthplaceInfo", "camp"]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Button
            type="primary"
            onClick={handleFormSubmit}
            style={{ background: "#1890ff", borderColor: "#1890ff" }}
          >
            Save
          </Button>
          <Button type="default" onClick={handleToggleBirthDateEditModal}>
            Cancel
          </Button>
        </Form>
      </Modal>
      <Loader value={isLoading} />
    </div>
  );
}

export default BirthPlaceInfo;
