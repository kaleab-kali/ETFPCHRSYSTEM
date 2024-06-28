import React from "react";
import { Table, Tag, Button, Avatar, Card } from "antd";

interface LeaveRequest {
  id: string;
  employeeName: string;
  employeeAvatar: string;
  leaveType: string;
  leaveFrom: string;
  leaveTo: string;
  days: number;
  status: string;
}

const leaveRequests: LeaveRequest[] = [
  {
    id: "ID7865",
    employeeName: "Jens Brincker",
    employeeAvatar: "https://i.pravatar.cc/150?img=6",
    leaveType: "Sick Leave",
    leaveFrom: "22/05/2021",
    leaveTo: "27/05/2021",
    days: 6,
    status: "Approve",
  },
  {
    id: "ID9357",
    employeeName: "Mark Harry",
    employeeAvatar: "https://i.pravatar.cc/150?img=7",
    leaveType: "Casual Leave",
    leaveFrom: "12/06/2021",
    leaveTo: "15/06/2021",
    days: 4,
    status: "Reject",
  },
  {
    id: "ID3987",
    employeeName: "Anthony Davie",
    employeeAvatar: "https://i.pravatar.cc/150?img=8",
    leaveType: "Marriage Leave",
    leaveFrom: "02/02/2021",
    leaveTo: "12/02/2021",
    days: 6,
    status: "Pending",
  },
  {
    id: "ID2483",
    employeeName: "David Perry",
    employeeAvatar: "https://i.pravatar.cc/150?img=9",
    leaveType: "Maternity Leave",
    leaveFrom: "10/01/2021",
    leaveTo: "10/03/2021",
    days: 90,
    status: "Approve",
  },
  {
    id: "ID2986",
    employeeName: "John Doe",
    employeeAvatar: "https://i.pravatar.cc/150?img=10",
    leaveType: "Unpaid Leave",
    leaveFrom: "20/05/2021",
    leaveTo: "22/05/2021",
    days: 3,
    status: "Reject",
  },
  {
    id: "ID1267",
    employeeName: "Sarah Smith",
    employeeAvatar: "https://i.pravatar.cc/150?img=11",
    leaveType: "Sick Leave",
    leaveFrom: "10/07/2021",
    leaveTo: "11/07/2021",
    days: 2,
    status: "Approve",
  },
  {
    id: "ID3398",
    employeeName: "Cara Stevens",
    employeeAvatar: "https://i.pravatar.cc/150?img=12",
    leaveType: "Casual Leave",
    leaveFrom: "11/04/2021",
    leaveTo: "13/04/2021",
    days: 3,
    status: "Pending",
  },
  {
    id: "ID9965",
    employeeName: "Ashton Cox",
    employeeAvatar: "https://i.pravatar.cc/150?img=13",
    leaveType: "Sick Leave",
    leaveFrom: "14/05/2021",
    leaveTo: "15/05/2021",
    days: 2,
    status: "Approve",
  },
];

const LeaveRequests: React.FC = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Employee Name",
      dataIndex: "employeeName",
      key: "employeeName",
      render: (text: string, record: LeaveRequest) => (
        <>
          <Avatar src={record.employeeAvatar} style={{ marginRight: 8 }} />
          {text}
        </>
      ),
    },
    {
      title: "Leave Type",
      dataIndex: "leaveType",
      key: "leaveType",
    },
    {
      title: "Leave From",
      dataIndex: "leaveFrom",
      key: "leaveFrom",
    },
    {
      title: "Leave To",
      dataIndex: "leaveTo",
      key: "leaveTo",
    },
    {
      title: "Days",
      dataIndex: "days",
      key: "days",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color;
        if (status === "Approve") {
          color = "green";
        } else if (status === "Reject") {
          color = "volcano";
        } else {
          color = "blue";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Details",
      key: "details",
      render: () => (
        <Button type="primary" size="small">
          Details
        </Button>
      ),
    },
  ];

  return (
    <Card title="Leave Requests">
      <Table
        columns={columns}
        dataSource={leaveRequests}
        pagination={false}
        rowKey="id"
      />
    </Card>
  );
};

export default LeaveRequests;
