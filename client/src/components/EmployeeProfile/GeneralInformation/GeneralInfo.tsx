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
  Radio,
  message,
  notification,
  Space,
  Spin,
  DatePicker,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { data } from "../../../utils/data";
import { EmployeeData } from "../../../../../shared/types/employeeTypes";
import { useUpdateEmployee } from "../../../services/mutations/employeeMutations";
import Loader from "../../Common/Loader";
import dayjs from "dayjs";
import moment from "moment";
import { useMutationWithStatus } from "../UpdateHooks/useMutationWithStatus";
import { useAuth } from "../../../context/AuthContext";
import CommissionerGeneral from "../../../assets/CommissionerGeneral.jpg"
import DeputyCommissioner from "../../../assets/DeputyCommissioner.jpg"
import AssistantCommissioner from "../../../assets/AssistantCommissioner.jpg"
import Commander from "../../../assets/Commander.jpg"
import DeputyCommander from "../../../assets/DeputyCommander.jpg"
import ChiefInspector from "../../../assets/ChiefInspector.jpg"
import Inspector from "../../../assets/Inspector.jpg"
import DeputyInspector from "../../../assets/DeputyInspector.jpg"
import AssistantInspector from "../../../assets/AssistantInspector.jpg"
import ChiefSergeant from "../../../assets/ChiefSergeant.jpg"
import Sergeant from "../../../assets/Sergeant.jpg"
import DeputySergeant from "../../../assets/DeputySergeant.jpg"
import AssistantSergeant from "../../../assets/AssistantSergeant.jpg"

interface GeneralInformationProps {
  selectedEmployee?: EmployeeData;
}
type NotificationType = "success" | "info" | "warning" | "error";
function GeneralInfo({ selectedEmployee }: GeneralInformationProps) {
  const [region, setRegion] = useState<string | null>(null);
  const [subcity, setSubcity] = useState<string | null>(null);
  const [woreda, setWoreda] = useState<string | null>(null);
  const [api, contextHolder] = notification.useNotification();
  const [spinning, setSpinning] = React.useState<boolean>(false);
  const [loaderSpinners, setLoaderSpinners]= useState<boolean>(false);
  const {user}=useAuth()
  // Reset subcity and woreda when region changes
  useEffect(() => {
    if (region) {
      const subcities = Object.keys(data[region]);
      const firstSubcity = subcities[0];
      setSubcity(firstSubcity);
      form.setFieldsValue({ currentAddress: { subcity: firstSubcity } });

      const woredas = data[region][firstSubcity];
      const firstWoreda = woredas[0];
      setWoreda(firstWoreda);
      form.setFieldsValue({
        currentAddress: { woreda: firstWoreda },
      });
    }
  }, [region]);

  // Reset woreda when subcity changes
  useEffect(() => {
    if (region && subcity) {
      const woredas = data[region][subcity];
      const firstWoreda = woredas[0];
      setWoreda(firstWoreda);
      form.setFieldsValue({ currentAddress: { woreda: firstWoreda } });
    }
  }, [subcity]);

  const { Title, Text } = Typography;
  const { Option } = Select;

  // State to track the visibility of each edit modal
  const [generalEditModalVisible, setEditGeneralModalVisible] =
    React.useState(false);

  // Handler to toggle the visibility of the edit modal for each card
  const handleToggleGeneralEditModal = () => {
    setEditGeneralModalVisible(!generalEditModalVisible);
  };

  const [form] = Form.useForm();

  const updateEmployeeMutuation = useUpdateEmployee();
  const { mutate, isLoading } = useMutationWithStatus(updateEmployeeMutuation, {
    onSuccess: () => {
      setEditGeneralModalVisible(false);
    },
  });
  console.log("date: "+ selectedEmployee?.birthday)
  const formattedDate = dayjs(selectedEmployee?.birthday);
  const employeeWithDate = {...selectedEmployee, birthday: formattedDate}
  console.log("date after: " + formattedDate);

  const getAge = (birthdate: Date | undefined): number | undefined => {
    if (!birthdate) return undefined; // Return undefined if birthdate is not provided

    // Calculate age using dayjs
    const today = dayjs();
    const birthDate = dayjs(birthdate);

    // Validate birthdate format
    if (!birthDate.isValid()) return undefined;

    const age = today.diff(birthDate, "year");

    return age;
  };
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

  const getImageSrc = (title:string) => {
    switch (title) {
      case "Commissioner General":
        return CommissionerGeneral;
      case "Deputy Commissioner":
        return DeputyCommissioner;
      case "Assistant Commissioner":
        return AssistantCommissioner;
      case "Commander":
        return Commander;
      case "Deputy Commander":
        return DeputyCommander;
      case "Chief Inspector":
        return ChiefInspector;
      case "Inspector":
        return Inspector;
      case "Deputy Inspector":
        return DeputyInspector;
      case "Assistant Inspector":
        return AssistantInspector;
      case "Chief Sergeant":
        return ChiefSergeant;
      case "Sergeant":
        return Sergeant;
      case "Deputy Sergeant":
        return DeputySergeant;
      case "Assistant Sergeant":
        return AssistantSergeant;
      default:
        return ""; // You can provide a default image or return an empty string
    }
  };

  return (
    <div className="">
      {contextHolder}
      <Title style={{ fontSize: 24 }}>General Information</Title>
      <Row gutter={[16, 16]}>
        <Col span={6} className=" -space-y-2">
          <Title style={{ fontSize: 14 }} type="secondary">
            Title
          </Title>
          <Title style={{ fontSize: 16 }}>
            {selectedEmployee?.title}{" "}
            {selectedEmployee?.title && (
              <img
                src={getImageSrc(selectedEmployee.title)}
                alt={selectedEmployee.title}
                style={{ width: 20, height: 20, marginLeft: 8 }}
              />
            )}
          </Title>
        </Col>
        <Col span={6} className=" -space-y-2">
          <Title style={{ fontSize: 14 }} type="secondary">
            First Name
          </Title>
          <Title style={{ fontSize: 16 }}>{selectedEmployee?.firstName}</Title>
        </Col>
        <Col span={6} className=" -space-y-2">
          <Title style={{ fontSize: 14 }} type="secondary">
            Middle Name
          </Title>
          <Title style={{ fontSize: 16 }}>{selectedEmployee?.middleName}</Title>
        </Col>
        <Col span={6} className=" -space-y-2">
          <Title style={{ fontSize: 14 }} type="secondary">
            Last Name
          </Title>
          <Title style={{ fontSize: 16 }}>{selectedEmployee?.lastName}</Title>
        </Col>
        <Col span={6} className=" -space-y-2">
          <Title style={{ fontSize: 14 }} type="secondary">
            Age
          </Title>
          <Title style={{ fontSize: 16 }}>
            {getAge(selectedEmployee?.birthday)}
          </Title>
        </Col>
        <Col span={6} className=" -space-y-2">
          <Title style={{ fontSize: 14 }} type="secondary">
            Gender
          </Title>
          <Title style={{ fontSize: 16 }}>{selectedEmployee?.gender}</Title>
        </Col>
        <Col span={6} className=" -space-y-2">
          <Title style={{ fontSize: 14 }} type="secondary">
            Phone
          </Title>
          <Title style={{ fontSize: 16 }}>
            {" "}
            {selectedEmployee?.phoneNumber.number}
          </Title>
        </Col>
        <Col span={6} className=" -space-y-2">
          <Title style={{ fontSize: 14 }} type="secondary">
            Email
          </Title>
          <Title style={{ fontSize: 16 }}>{selectedEmployee?.email}</Title>
        </Col>
        <Col span={6} className=" -space-y-2">
          <Title style={{ fontSize: 14 }} type="secondary">
            Position
          </Title>
          <Title style={{ fontSize: 16 }}> {selectedEmployee?.position}</Title>
        </Col>
        <Col span={6} className=" -space-y-2">
          <Title style={{ fontSize: 14 }} type="secondary">
            Department
          </Title>
          <Title style={{ fontSize: 16 }}>{selectedEmployee?.department}</Title>
        </Col>
        <Col span={6} className=" -space-y-2">
          <Title style={{ fontSize: 14 }} type="secondary">
            Ethnicity
          </Title>
          <Title style={{ fontSize: 16 }}> {selectedEmployee?.ethnicity}</Title>
        </Col>
        <Col span={6} className=" -space-y-2">
          <Title style={{ fontSize: 14 }} type="secondary">
            Salary
          </Title>
          <Title style={{ fontSize: 16 }}>{selectedEmployee?.salary}</Title>
        </Col>
      </Row>
      {(user?.role === "staff" || user?.role === "hrmanager") && (
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={handleToggleGeneralEditModal}
          className=" float-right bg-blue-500"
        >
          Edit
        </Button>
      )}
      <Modal
        title="Edit General Information"
        visible={generalEditModalVisible}
        onCancel={handleToggleGeneralEditModal}
        footer={null}
      >
        <Form
          name="editGeneralInfoForm"
          initialValues={employeeWithDate}
          form={form}
          onFinish={handleFormSubmit}
          // onFinish={handleFormSubmit} // Uncomment and provide your form submit handler
        >
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: "Please select a title" }]}
              >
                <Select>
                  <Option value="ato">Ato</Option>
                  <Option value="doctor">Doctor</Option>
                  <Option value="Constable">Constable</Option>
                  <Option value="Assistant Sergeant">Assistant Sergeant</Option>
                  <Option value="Deputy Sergeant">Deputy Sergeant</Option>
                  <Option value="Sergeant">Sergeant</Option>
                  <Option value="Chief Sergeant">Chief Sergeant</Option>
                  <Option value="Assistant Inspector">
                    Assistant Inspector
                  </Option>
                  <Option value="Deputy Inspector">Deputy Inspector</Option>
                  <Option value="Inspector">Inspector</Option>
                  <Option value="Chief Inspector">Chief Inspector</Option>
                  <Option value="DeputyCommander">Deputy Commander</Option>
                  <Option value="Commander">Commander</Option>
                  <Option value="Assistant Superintendent">
                    Assistant Superintendent
                  </Option>
                  <Option value="Deputy Superintendent">
                    Deputy Superintendent
                  </Option>
                  <Option value="Superintendent">Superintendent</Option>
                  <Option value="Commissioner">Commissioner</Option>
                  <Option value="Commissioner General">
                    Commissioner General
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "Please enter your first name",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Middle Name" name="middleName">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          {/* second Row */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Please enter your last name",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item
                label="Birthday"
                name="birthday"
                rules={[
                  {
                    required: true,
                    message: "Please select your birthday",
                  },
                ]}
              >
                <DatePicker style={{ width: "100%" }} format={"YYYY/MM/DD"} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select your gender" }]}
          >
            <Radio.Group>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
              <Radio value="other">Other</Radio>
            </Radio.Group>
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Position"
                name="position"
                rules={[
                  { required: true, message: "Please enter your position" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Department"
                name="department"
                rules={[
                  {
                    required: true,
                    message: "Please enter your department",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          {/* <Form.Item
                label="Photo"
                name="photo"
                rules={[
                  { required: true, message: "Please upload your photo" },
                ]}
              >
                <Input type="file" />
              </Form.Item> */}

          <Form.Item
            label="Ethnicity"
            name="ethnicity"
            rules={[
              {
                required: true,
                message: "Please enter your ethnicity",
              },
            ]}
          >
            <Select placeholder="Select Ethnicity">
              <Option value="Amhara">Amhara</Option>
              <Option value="Afar">Afar</Option>
              <Option value="Oromo">Oromo</Option>
              <Option value="Tigray">Tigray</Option>
              <Option value="Somale">Somale</Option>
              <Option value="Gurage">Gurage</Option>
              <Option value="Wolyaita">Wolyaita</Option>
              <Option value="Gambela">Gambela</Option>
              <Option value="Gumuz">Gumuz</Option>
            </Select>
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Phone Number" name="phoneNumber">
                <Input.Group compact>
                  <Form.Item name={["phoneNumber", "number"]} noStyle>
                    <Input style={{ width: "80%" }} />
                  </Form.Item>
                </Input.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please enter your email" }]}
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
          <Button
            type="default"
            onClick={handleToggleGeneralEditModal}
            className="ml-3"
          >
            Cancel
          </Button>
        </Form>
      </Modal>
      {/* <Spin spinning={spinning} fullscreen /> */}
      <Loader value={isLoading} />
    </div>
  );
}

export default GeneralInfo;
