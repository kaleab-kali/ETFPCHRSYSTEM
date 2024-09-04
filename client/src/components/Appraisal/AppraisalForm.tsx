import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  Layout,
  Typography,
  message,
  Avatar,
  List,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import moment from "moment";
import { useUpdateEmployee } from "../../services/mutations/employeeMutations";
import {
  useEmployees,
  useEmployeesIds,
} from "../../services/queries/employeeQueries";
import { useCreateNewAppraisal } from "../../services/mutations/appraisalMutation";
import { useAllAppraisal } from "../../services/queries/appraisaQueries";
import PerformanceGif from "../../assets/Performance overview.gif";
import { EmployeeData } from "../../../../shared/types/employeeTypes";

const { Content } = Layout;
const { Option } = Select;
const { Title } = Typography;

const aplevels = [
  "Constable",
  "Assistant Sergeant",
  "Deputy Sergeant",
  "Sergeant",
  "Chief Sergeant",
  "Assistant Inspector",
  "Deputy Inspector",
  "Inspector",
  "Chief Inspector",
  "DeputyCommander",
  "Commander",
  "Assistant Commissioner",
  "Deputy Commissioner",
  "Commissioner General",
];

const ApprasialForm: React.FC = () => {
  const [totalScore, setTotalScore] = useState(0);
  const [form] = Form.useForm();
  const updateEmployeeMutuation = useUpdateEmployee();
  const employeesIdQuery = useEmployeesIds();
  const employeeQueries = useEmployees(employeesIdQuery.data);
  const [employeeData, setEmployeeData] = useState<any>(null);
  const [searchInput, setSearchInput] = useState("");
  const [totalValue, setTotalValue] = useState(Number);
  const createAppraisal=useCreateNewAppraisal()
  const appraisalQuery = useAllAppraisal();


  const handleDatePickerChange = (
    date: moment.Moment | null,
    dateString: string
  ) => {
    form.setFieldsValue({ promotionDate: date }); // Set the moment object directly
  };

  const onFinish = (values: any): void => {
    const {
      education,
      service,
      attitude,
      behaviour,
      workEfficiency,
      disciplinary,
    } = values;
    const total =
      parseInt(education) +
      parseInt(service) +
      parseInt(attitude) +
      parseInt(behaviour) +
      parseInt(workEfficiency) -
      parseInt(disciplinary);
    setTotalScore(total);

    const evalData = {
      currentLevel: values.currentLevel,
      nextLevel: values.desiredLevel,
      employeeId: values.employeeId,
      position: values.position,
      scores: {
        education: values.education,
        service: values.service,
        attitude: values.attitude,
        behaviour: values.behaviour,
        workEfficiency: values.workEfficiency,
        disciplinary: values.disciplinary,
      },
      totalScore: total,
      status: "pending",
    };

    createAppraisal.mutate(evalData);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const filteredEmployeeData = employeeQueries?.filter((employee: any) =>
    employee?.data?.empId?.includes(searchInput)
  );
  console.log("filtered employee data: ", +filteredEmployeeData)
  return (
    <Layout>
      <Title
        level={4}
        style={{
          padding: "10px 30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Appraisal Form
      </Title>

      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "30px",
        }}
      >
        
        <Form
          form={form}
          style={{
            background: "#fff",
            padding: "30px",
            height: "540px",
          }}
          layout="vertical"
          onFinish={onFinish}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Employee ID"
                name="employeeId"
                rules={[
                  { required: true, message: "Please input your Employee ID!" },
                ]}
              >
                <Input onChange={handleSearchInputChange} />
              </Form.Item>
              {searchInput && (
                <div
                  style={{
                    width: "450px",
                  }}
                >
                  <List
                    itemLayout="horizontal"
                    dataSource={filteredEmployeeData}
                    renderItem={(item, index) => (
                      <List.Item
                        onClick={() => {
                          form.setFieldsValue({
                            employeeId: item.data?.empId,
                            currentLevel: item.data?.title,
                            desiredLevel: item.data?.title,
                            position: item.data?.position,
                          });
                          setSearchInput("");
                          if (
                            item.data?.evaluations &&
                            item.data?.evaluations.length > 0 &&
                            item.data?.evaluations[0].total
                          ) {
                            form.setFieldsValue({
                              workEfficiency: item.data?.evaluations[0].total,
                              behaviour:item.data?.evaluations[0].total,
                              attitude: item.data?.evaluations[0].total,
                              service: item.data?.evaluations[0].total * 0.6,
                              

                            });
                          } else {
                            form.setFieldsValue({
                              workEfficiency: 0,
                              behaviour:0,
                              attitude: 0,
                              service: 0,
                              disciplinary: 0,


                            });
                          }
                        }}
                      >
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              src={`http://localhost:8000/uploads/${item.data?.photo}`}
                            />
                          }
                          title={<div>{item.data?.firstName}</div>}
                          description={`ID: ${item.data?.empId} Department: ${item.data?.department} `}
                          style={{ cursor: "pointer" }}
                        />
                      </List.Item>
                    )}
                  />
                </div>
              )}
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                label="Current level"
                name="currentLevel"
                rules={[
                  {
                    required: true,
                    message: "Please input your current level!",
                  },
                ]}
              > 
              {/* {filteredEmployeeData.map((employee: any) => 
              return{

              }} */}
                <Select>
                  {aplevels.map((level) => (
                    <Option key={level} value={level}>
                      {level}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Desired level"
                name="desiredLevel"
                rules={[
                  {
                    required: true,
                    message: "Please input your desired level!",
                  },
                ]}
              >
                <Select>
                  {aplevels.map((level) => (
                    <Option key={level} value={level}>
                      {level}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Position"
                name="position"
                rules={[
                  { required: true, message: "Please input your position!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24} align="middle">
            <Col span={8}>
              <Form.Item
                label="Education (10)"
                name="education"
                rules={[
                  {
                    required: true,
                    message: "Please input the Education score!",
                  },
                ]}
              >
                <Input type="number" min={0} max={10} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Service (15)"
                name="service"
                rules={[
                  {
                    required: true,
                    message: "Please input the Service score!",
                  },
                ]}
              >
                <Input disabled={true} type="number" min={0} max={15} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Attitude (25)"
                name="attitude"
                rules={[
                  {
                    required: true,
                    message: "Please input the Attitude score!",
                  },
                ]}
              >
                <Input disabled={true} type="number" min={0} max={25} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24} align="bottom">
            <Col span={8}>
              <Form.Item
                label="Work Efficiency (25)"
                name="workEfficiency"
                rules={[
                  {
                    required: true,
                    message: "Please input the Work Efficiency score!",
                  },
                ]}
              >
                <Input disabled={true} type="number" min={0} max={25} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Disciplinary Deductions"
                name="disciplinary"
                rules={[
                  {
                    required: true,
                    message: "Please input the Disciplinary Deductions!",
                  },
                ]}
              >
                <Input type="number" min={0} max={100} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Behaviour"
                name="behaviour"
                rules={[
                  {
                    required: true,
                    message: "Please input the Behaviour!",
                  },
                ]}
              >
                <Input disabled={true} type="number" min={0} max={25} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col></Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          <div>Total Score: {totalScore}</div>
        </Form>
        <div>
          <img
            src={PerformanceGif}
            alt="trip"
            width="500px"
            height="540px"
            style={{
              borderTopLeftRadius: "30px",
              borderBottomLeftRadius: "30px",
              marginTop: "4px",
            }}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default ApprasialForm;
