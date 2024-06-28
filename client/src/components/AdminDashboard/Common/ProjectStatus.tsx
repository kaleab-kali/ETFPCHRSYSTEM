import React from "react";
import { Card, Table, Progress, Typography } from "antd";

const { Title } = Typography;

const data = [
  {
    key: "1",
    name: "Project A",
    progress: 30,
    duration: "2 Months",
  },
  {
    key: "2",
    name: "Project B",
    progress: 55,
    duration: "3 Months",
  },
  {
    key: "3",
    name: "Project C",
    progress: 67,
    duration: "1 Month",
  },
  {
    key: "4",
    name: "Project D",
    progress: 70,
    duration: "2 Months",
  },
  {
    key: "5",
    name: "Project E",
    progress: 24,
    duration: "3 Months",
  },
  {
    key: "6",
    name: "Project F",
    progress: 77,
    duration: "4 Months",
  },
  {
    key: "7",
    name: "Project G",
    progress: 41,
    duration: "2 Months",
  },
  {
    key: "8",
    name: "Project H",
    progress: 41,
    duration: "2 Months",
  },
];

const columns = [
  {
    title: "Project Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Progress",
    dataIndex: "progress",
    key: "progress",
    render: (progress: number) => <Progress percent={progress} size="small" />,
  },
  {
    title: "Duration",
    dataIndex: "duration",
    key: "duration",
  },
];

const ProjectStatus: React.FC = () => {
  return (
    <Card>
      <Title level={4}>Project Status</Title>
      <Table dataSource={data} columns={columns} pagination={false} />
    </Card>
  );
};

export default ProjectStatus;
