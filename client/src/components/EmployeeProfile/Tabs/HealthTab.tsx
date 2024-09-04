import React, { useState, useEffect } from "react";
import { Layout, Typography, Collapse, Table } from "antd";
import { ColumnsType } from "antd/lib/table";

const { Title } = Typography;
const { Content } = Layout;
const { Panel } = Collapse;

interface MedicalHistory {
  date: string;
  healthIssue: string;
  treatment: string;
  doctor: string;
}

interface HealthRecord {
  key: string;
  date?: string;
  bloodType?: string;
  healthIssue: string;
  costOfCoverage: string;
  name?: string;
  age?: number;
  medicalHistory?: MedicalHistory[];
}

interface EmployeeId {
  selectedEmployee?: any; // Replace `any` with a proper type if available
}

const HealthTab: React.FC<EmployeeId> = ({ selectedEmployee }) => {
  const [personalHealthData, setPersonalHealthData] = useState<HealthRecord[]>([]);
  const [wifeHealthData, setWifeHealthData] = useState<HealthRecord[]>([]);
  const [childrenHealthData, setChildrenHealthData] = useState<HealthRecord[]>([]);

  useEffect(() => {
    // Fetch or initialize health data here
    setPersonalHealthData([
      {
        key: "1",
        date: "2024-01-15",
        bloodType: "A+",
        healthIssue: "Hypertension",
        costOfCoverage: "$1500",
      },
    ]);

    setWifeHealthData([
      {
        key: "1",
        date: "2024-02-20",
        bloodType: "B+",
        healthIssue: "Diabetes",
        costOfCoverage: "$2000",
      },
    ]);

    setChildrenHealthData([
      {
        key: "1",
        name: "John",
        age: 16,
        healthIssue: "Asthma",
        costOfCoverage: "$1200",
        medicalHistory: [
          {
            date: "2023-06-01",
            healthIssue: "Asthma",
            treatment: "Inhaler prescription",
            doctor: "Dr. Smith",
          },
          {
            date: "2022-12-10",
            healthIssue: "Seasonal Flu",
            treatment: "Flu shot",
            doctor: "Dr. Brown",
          },
        ],
      },
      {
        key: "2",
        name: "Anna",
        age: 19,
        healthIssue: "Allergy",
        costOfCoverage: "$0",
        medicalHistory: [
          {
            date: "2024-01-20",
            healthIssue: "Allergy",
            treatment: "Antihistamines",
            doctor: "Dr. Johnson",
          },
        ],
      },
    ]);
  }, []);

  const personalColumns: ColumnsType<HealthRecord> = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Blood Type",
      dataIndex: "bloodType",
      key: "bloodType",
    },
    {
      title: "Health Issue",
      dataIndex: "healthIssue",
      key: "healthIssue",
    },
    {
      title: "Cost of Coverage",
      dataIndex: "costOfCoverage",
      key: "costOfCoverage",
    },
  ];

  const childrenColumns: ColumnsType<HealthRecord> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Health Issue",
      dataIndex: "healthIssue",
      key: "healthIssue",
    },
    {
      title: "Cost of Coverage",
      dataIndex: "",
      key: "costOfCoverage",
      render: (_, record) =>
        record.age !== undefined && record.age > 18 ? (
          <span style={{ color: "red" }}>Not Eligible for Coverage</span>
        ) : (
          record.costOfCoverage
        ),
    },
  ];

  const medicalHistoryColumns: ColumnsType<MedicalHistory> = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Health Issue",
      dataIndex: "healthIssue",
      key: "healthIssue",
    },
    {
      title: "Treatment",
      dataIndex: "treatment",
      key: "treatment",
    },
    {
      title: "Doctor",
      dataIndex: "doctor",
      key: "doctor",
    },
  ];

  return (
    <Layout>
      <Content
        style={{
          display: "flex",
          backgroundColor: "white",
          padding: 20,
          flexDirection: "column",
        }}
      >
        <Title level={2}>Health Information</Title>
        <Collapse accordion>
          <Panel header="Personal" key="1">
            <Table
              columns={personalColumns}
              dataSource={personalHealthData}
              pagination={false}
              size="middle"
              bordered
            />
          </Panel>
          <Panel header="Wife" key="2">
            <Table
              columns={personalColumns}
              dataSource={wifeHealthData}
              pagination={false}
              size="middle"
              bordered
            />
          </Panel>
          <Panel header="Children" key="3">
            <Table
              columns={childrenColumns}
              dataSource={childrenHealthData}
              pagination={false}
              size="middle"
              bordered
              expandable={{
                expandedRowRender: (record) =>
                  record.medicalHistory ? (
                    <Table
                      columns={medicalHistoryColumns}
                      dataSource={record.medicalHistory}
                      pagination={false}
                      size="small"
                      bordered
                    />
                  ) : (
                    <p>No medical history available.</p>
                  ),
                rowExpandable: (record) => !!record.medicalHistory,
              }}
            />
          </Panel>
        </Collapse>
      </Content>
    </Layout>
  );
};

export default HealthTab;
