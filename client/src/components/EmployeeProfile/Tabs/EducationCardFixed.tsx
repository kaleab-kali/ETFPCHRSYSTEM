import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Row,
  Col,
  Layout,
  Modal,
  Card,
  Typography
} from "antd";
import moment from "moment";
import { EmployeeData } from "../../../../../shared/types/employeeTypes";
import { useUpdateEmployee } from "../../../services/mutations/employeeMutations";
import {  Education } from "../../../../../shared/types/employeeProfileModel";

const universitiesInEthiopia = [
  // Public Universities
  "Addis Ababa University (AAU)",
  "Adama Science and Technology University (ASTU)",
  "Arba Minch University (AMU)",
  "Adigrat University (AU)",
  "Ambo University (AU)",
  "Aksum University (ASU)",
  "Arsi University (ASPU)",
  "Bahir Dar University (BDU)",
  "Dilla University (DU)",
  "Debre Tabor University (DTU)",
  "Gambella University (GU)",
  "Haramaya University (HU)",
  "Hawassa University (HWU)",
  "Jigjiga University (JJU)",
  "Jimma University (JU)",
  "Jomo Kenyatta University of Agriculture and Technology (JKUAT) - Ethiopian Campus",
  "Kemise University (Kemu)",
  "Mekelle University (MU)",
  "Metu University (MTU)",
  "Nekemte University (NU)",
  "Sodo University (SU)",
  "Wollega University (WU)",
  "Wollo University (WU)",
  "Wolayta Sodo University (WSU)",

  // Private Universities
  "Admas University",
  "Akaki Science and Technology University (ASTU)",
  "Ambo University",
  "Bethel University",
  "Blue Nile University",
  "Central Ethiopia University",
  "Defense University",
  "Debre Markos University",
  "EiABC Engineering College",
  "Ethiopian Institute of Technology (EiT)",
  "Ethiopian Medical College",
  "Gondar University",
  "Hope University",
  "Jimma University of Science and Technology",
  "Kotebe Metropolitan University",
  "Mekelle University",
  "Millennium Institute of Leadership and Governance",
  "Nekemte University",
  "New Hope University College",
  "Rift Valley University College",
  "Saint Mary's University",
  "Selam University",
  "St. Paul's University College",
  "Unity University",
  "Wako University",
  "Woldia University",

  // Colleges
  "Asbeha Technical College",
  "Awassa College of Agriculture",
  "Babur Technical College",
  "Debre Birhan Polytechnic College",
  "Debub University - College of Law",
  "Dire Dawa Polytechnic College",
  "Ethiopia Institute of Public Administration & Development",
  "Gambella College of Teacher Education",
  "Gondar College of Education",
  "Haramaya University - College of Education",
  "Hawassa College of Technology",
  "Jigjiga Polytechnic College",
  "Jimma College of Agriculture",
  "Mekelle College of Technology",
  "Nekemte College of Teacher Education",
  "Shoa College of Agriculture",
  "Wondo Genet Agriculture College",
];

const { Content } = Layout;
const { Title, Text } = Typography;


interface EducationCardProps {
  selectedEmployee?: EmployeeData;
}

function EducationCard({ selectedEmployee }: EducationCardProps) {
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentEducation, setCurrentEducation] = useState<Education | null>(null);
  const [educationData, setEducationData] = useState<Education[]>([]);
  const [form] = Form.useForm();
  console.log(selectedEmployee?._id)
  console.log(selectedEmployee?.education);
  
  // Fetch education data from the selectedEmployee
  // useEffect(() => {
  //   if (selectedEmployee?.education) {
  //     const { educationLevel, education } = selectedEmployee;
  
  //     let mergedEducationData: Education[] = [];
  
  //     if (educationLevel === "bachelor" && education.bachelor) {
  //       mergedEducationData = education.bachelor;
  //     } else if (educationLevel === "master" && education.master) {
  //       mergedEducationData = education.master;
  //     } else if (educationLevel === "phd" && education.phd) {
  //       mergedEducationData = education.phd;
  //     }
  
  //     setEducationData(mergedEducationData);
  //   }
  // }, [selectedEmployee]);

  const updateEmployeeMutuation = useUpdateEmployee();

  const handleFormSubmit = async (values: any) => {
    try {
      await form.validateFields();
      console.log("Received values of form: ", values);
      setIsModalVisible(false);
      if (currentEducation && selectedEmployee) {
        const updatedEducationData = educationData.map((edu) =>
          edu === currentEducation ? { ...edu, ...values } : edu
        );
        setEducationData(updatedEducationData);
  
        // Call the mutation to update the employee data in the database
        const updatedEmployeeData = {
          ...selectedEmployee,
          education: {
            ...selectedEmployee.education,
            [selectedEmployee.educationLevel]: updatedEducationData,
          },
        };
        // updateEmployeeMutuation.mutate(updatedEmployeeData);
      }
    } catch (errorInfo) {
      console.log("Validation failed:", errorInfo);
    }
  };
  
  

  const showModal = (edu: Education) => {
    form.setFieldsValue({
      ...edu,
      graduationYear: moment(edu.graduationYear.toString(), "YYYY"),
    });
    setCurrentEducation(edu);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  return (
    <Content>
      <Card title="Education">
        {selectedEmployee?.education.map((edu:any, index:any) => (
          <div key={index}>
            <Row gutter={16}>
              <Col span={8}>
              <Text type="secondary" style={{marginTop:"0", marginBottom:"15px"}}>Field of Study</Text>
      <Title level={5} style={{marginTop:"0px"}}>{edu.fieldofstudy}</Title>

              </Col>
              <Col span={8}>
              <Text type="secondary" style={{marginTop:"0", marginBottom:"15px"}}>Institution</Text>
      <Title level={5} style={{marginTop:"0px"}}>{edu.institution}</Title>

              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
              <Text type="secondary" style={{marginTop:"0", marginBottom:"15px"}}>Graduation Year</Text>
      <Title level={5} style={{marginTop:"0px"}}>{edu.graduationYear}</Title>
                
              </Col>
            </Row>
            <Button type="primary" onClick={() => showModal(edu)}>
              Edit
            </Button>
            <hr />
          </div>
        ))}
      </Card>
      <Modal
  title="Edit Education"
  visible={isModalVisible}
  onCancel={handleCancel}
  footer={[
    <Button key="cancel" onClick={handleCancel}>
      Cancel
    </Button>,
    <Button key="save" type="primary" htmlType="submit" form="educationForm">
      Save
    </Button>,
  ]}
>
  <Form
    id="educationForm"
    form={form}
    layout="vertical"
    // onFinish={onFinish}
    onFinish={handleFormSubmit}
    initialValues={{
      fieldOfStudy: currentEducation?.educationLevel,
      universityName: currentEducation?.institution,
      graduationYear: currentEducation?.graduationYear,
    }}
  >
    <Form.Item
      name="fieldOfStudy"
      label="Field of Study"
      rules={[{ required: true, message: "Please enter field of study" }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="universityName"
      label="Institution"
      rules={[{ required: true, message: "Please select institution" }]}
    >
      <Select>
        {universitiesInEthiopia.map((uni) => (
          <Select.Option key={uni} value={uni}>
            {uni}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
    <Form.Item
      name="graduationYear"
      label="Graduation Year"
      rules={[{ required: true, message: "Please select graduation year" }]}
    >
      {/* <DatePicker picker="year" /> */}
      <Input />
    </Form.Item>
  </Form>
</Modal>
    </Content>
  );
};

export default EducationCard;
