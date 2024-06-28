import React from "react";
import { Button, Table, Space } from "antd";

interface LeaveRequest {
  id: string;
  name: string;
  department: string;
  reason: string;
  from: string;
  to: string;
  description: string;
}

interface LeaveRequestsTableProps {
  data: LeaveRequest[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const LeaveRequestsTable: React.FC<LeaveRequestsTableProps> = ({
  data,
  onApprove,
  onReject,
}) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
    },
    {
      title: "To",
      dataIndex: "to",
      key: "to",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: any, record: LeaveRequest) => (
        <Space>
          <Button type="primary" onClick={() => onApprove(record.id)}>
            Approve
          </Button>
          <Button danger onClick={() => onReject(record.id)}>
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default LeaveRequestsTable;


