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
  Spin,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { data } from "../../../utils/data";
import { EmployeeData } from "../../../../../shared/types/employeeTypes";
import { useUpdateEmployee } from "../../../services/mutations/employeeMutations";
import Loader from "../../Common/Loader";
import { useMutationWithStatus } from "../UpdateHooks/useMutationWithStatus";
import { useAuth } from "../../../context/AuthContext";

interface CurrentAddProps {
  selectedEmployee?: EmployeeData;
}

function CurrentAdd({ selectedEmployee }: CurrentAddProps) {
  const [region, setRegion] = useState<string | null>(null);
  const [subcity, setSubcity] = useState<string | null>(null);
  const [woreda, setWoreda] = useState<string | null>(null);
  const [loaderSpinners, setLoaderSpinners] = useState<boolean>(false);
  const [spinning, setSpinning] = React.useState<boolean>(false);
  const {user} =useAuth()
  const showLoader = () => {
    // setSpinning(true);
    setLoaderSpinners(true);
    setTimeout(() => {
      // setSpinning(false);
      setLoaderSpinners(false);
    }, 3000);
  };

  // Reset subcity and woreda when region changes
useEffect(() => {
  if (region) {
    const subcities = Object.keys(data[region] || {});
    const firstSubcity = subcities[0];
    setSubcity(firstSubcity);
    form.setFieldsValue({ currentAddress: { subcity: firstSubcity } });

    const woredas = data[region][firstSubcity] || [];
    const firstWoreda = woredas[0];
    setWoreda(firstWoreda);
    form.setFieldsValue({ currentAddress: { woreda: firstWoreda } });
  }
}, [region]);

useEffect(() => {
  if (region && subcity) {
    const woredas = data[region][subcity] || [];
    const firstWoreda = woredas[0];
    setWoreda(firstWoreda);
    form.setFieldsValue({ currentAddress: { woreda: firstWoreda } });
  }
}, [subcity]);


  const handleRegionChange = (value: string) => {
    setRegion(value);
  };

  const handleSubcityChange = (value: string) => {
    setSubcity(value);
  };
  const { Title } = Typography;

  const [currentAddEditModalVisible, setEditCurrentAddModalVisible] =
    React.useState(false);



  const handleToggleCurrentAddEditModal = () => {
    setEditCurrentAddModalVisible(!currentAddEditModalVisible);
  };


  const [form] = Form.useForm();

  const updateEmployeeMutuation = useUpdateEmployee();
  const { mutate, isLoading } = useMutationWithStatus(updateEmployeeMutuation, {
    onSuccess: () => {
      setEditCurrentAddModalVisible(false);
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
      <Title style={{ fontSize: 24 }}>Current Address</Title>
      <Row gutter={[16, 16]}>
        <Col span={8} className=" -space-y-2">
          <Title style={{ fontSize: 14 }} type="secondary">
            Region
          </Title>
          <Title style={{ fontSize: 16 }}>
            {selectedEmployee?.currentAddress.region}
          </Title>
        </Col>
        <Col span={8} className=" -space-y-2">
          <Title style={{ fontSize: 14 }} type="secondary">
            Zone/Subcity
          </Title>
          <Title style={{ fontSize: 16 }}>
            {selectedEmployee?.currentAddress.subcity}
          </Title>
        </Col>
        <Col span={8} className=" -space-y-2">
          <Title style={{ fontSize: 14 }} type="secondary">
            Woreda
          </Title>
          <Title style={{ fontSize: 16 }}>
            {selectedEmployee?.currentAddress.woreda}
          </Title>
        </Col>
        <Col span={8} className=" -space-y-2">
          <Title style={{ fontSize: 14 }} type="secondary">
            House Number
          </Title>
          <Title style={{ fontSize: 16 }}>
            {selectedEmployee?.currentAddress.houseNumber}
          </Title>
        </Col>
        <Col span={8} className=" -space-y-2">
          <Title style={{ fontSize: 14 }} type="secondary">
            Leyu Bota
          </Title>
          <Title style={{ fontSize: 16 }}>
            {selectedEmployee?.currentAddress.leyuBota}
          </Title>
        </Col>
      </Row>
      {(user?.role==="staff" || user?.role==="hrmanager")&&(
      <Button
        type="primary"
        icon={<EditOutlined />}
        onClick={handleToggleCurrentAddEditModal}
        className=" float-right bg-blue-500"
      >
        Edit
      </Button>
      )}
      <Modal
        title="Edit Current Address Information"
        visible={currentAddEditModalVisible}
        onCancel={handleToggleCurrentAddEditModal}
        footer={null}
      >
        <Form
          name="editCurrentAddressForm"
          initialValues={selectedEmployee}
          form={form}
        >
          <Row gutter={16}>
            <Col span={10}>
              <Form.Item label="Region" name={["currentAddress", "region"]}>
                <Select
                  options={Object.keys(data)?.map((region) => ({
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
                name={["currentAddress", "subcity"]}
              >
                <Select
                  options={
                    region
                      ? Object.keys(data[region])?.map((subcity) => ({
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
              <Form.Item label="Woreda" name={["currentAddress", "woreda"]}>
                <Select
                  options={
                    region && subcity
                      ? data[region][subcity]?.map((woreda) => ({
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
                name={["currentAddress", "houseNumber"]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={10}>
              <Form.Item
                label="Leyu Bota"
                name={["currentAddress", "leyuBota"]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label="Camp" name={["currentAddress", "camp"]}>
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
          <Button
            type="default"
            onClick={handleToggleCurrentAddEditModal}
            className="ml-3"
          >
            Cancel
          </Button>
        </Form>
      </Modal>
      {/* {loaderSpinners ===true ?
    <Loader value={loaderSpinners} />:""  
    } */}
      <Loader value={isLoading} />
      {/* <Spin spinning={spinning} fullscreen /> */}
    </div>
  );
}

export default CurrentAdd;
