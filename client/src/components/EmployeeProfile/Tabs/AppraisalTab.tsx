import React from "react";
import { Card, Table, Collapse, Tag, Descriptions, Row, Col } from "antd";
import "../../../styles/Apprasialtab.css";
import { useAppraisalById } from "../../../services/queries/appraisaQueries";
import { EmployeeData } from "../../../../../shared/types/employeeTypes";
import moment from "moment";
const { Panel } = Collapse;

const dummyData = [
  {
    employeeId: "E123",
    currentLevel: "Level 3",
    desiredLevel: "Level 4",
    yearsOfWork: 5,
    position: "Software Engineer",
    lastPromotionDate: "2022-01-01",
    appraisalScores: {
      education: 8,
      service: 12,
      attitude: 20,
      behaviour: 20,
      workEfficiency: 20,
      disciplinary: 2,
      totalScore: 78,
    },

    passFail: "Pass",
  },
  {
    employeeId: "E123",
    currentLevel: "Level 2",
    desiredLevel: "Level 3",
    yearsOfWork: 3,
    position: "Product Manager",
    lastPromotionDate: "2023-01-01",
    appraisalScores: {
      education: 9,
      service: 13,
      attitude: 22,
      behaviour: 22,
      workEfficiency: 22,
      disciplinary: 1,
      totalScore: 87,
    },
    passFail: "Pass",
  },
  {
    employeeId: "E123",
    currentLevel: "Level 4",
    desiredLevel: "Level 5",
    yearsOfWork: 7,
    position: "Software Architect",
    lastPromotionDate: "2024-01-01",
    appraisalScores: {
      education: 10,
      service: 15,
      attitude: 25,
      behaviour: 25,
      workEfficiency: 25,
      disciplinary: 0,
      totalScore: 100,
    },
    passFail: "Pass",
  },
];

const columns = [
  { title: "Education", dataIndex: ["scores", "education"], key: "education" },
  { title: "Service", dataIndex: ["scores", "service"], key: "service" },
  { title: "Attitude", dataIndex: ["scores", "attitude"], key: "attitude" },
  { title: "Behaviour", dataIndex: ["scores", "behaviour"], key: "behaviour" },
  {
    title: "Work Efficiency",
    dataIndex: ["scores", "workEfficiency"],
    key: "workEfficiency",
  },
  { title: "Disciplinary", dataIndex: ["scores", "disciplinary"], key: "disciplinary" },
  { title: "Total Score", dataIndex: "totalScore", key: "totalScore" },
];
interface EmployeeId {
  selectedEmployee?: EmployeeData;
}
const AppraisalTab = ({ selectedEmployee }: EmployeeId) => {
  const appraisalById = useAppraisalById(selectedEmployee?.empId);
  const sortedData = [...dummyData].sort(
    (a, b) =>
      new Date(b.lastPromotionDate).getTime() -
      new Date(a.lastPromotionDate).getTime()
  );
  const fetchedData= appraisalById.data;

  return (
    <div>
      {Array.isArray(fetchedData) &&
        fetchedData.map((data, index) => (
          <div style={{ marginBottom: "10px" }} key={index}>
            <Collapse accordion>
              <Panel
                header={`Appraisal ${index + 1}`}
                key={index}
                extra={
                  <Tag color={data.status === "accepted" ? "green" : "red"}>
                    {data.status}
                  </Tag>
                }
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Descriptions column={1}>
                      <Descriptions.Item label="Previous Level">
                        {data.currentLevel}
                      </Descriptions.Item>
                      <Descriptions.Item label="Position">
                        {data.employee?.position}
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                  <Col span={12}>
                    <Descriptions column={1}>
                      <Descriptions.Item label="Next Level">
                        {data.nextLevel}
                      </Descriptions.Item>
                      <Descriptions.Item label="Promotion Date">
                        {data.employee?.promotionDate
                          ? moment(data?.employee.promotionDate).format(
                              "YYYY-MM-DD"
                            )
                          : ""}
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                </Row>
                <Table
                  dataSource={[data]}
                  columns={columns}
                  pagination={false}
                />
              </Panel>
            </Collapse>
          </div>
        ))}
    </div>
  );

};

export default AppraisalTab;
