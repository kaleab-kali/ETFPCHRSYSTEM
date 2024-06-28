import React, { useState } from "react";
import { Button, Table, Space } from "antd";

interface SalaryRaise {
  // _id: string;
  employeeId?: string;
  title?: string;
  currentSalary?: number;
  newSalary?: number;
  salaryRaiseTime?: Date;
  status?: string;
}
interface SalaryRaiseRequestsTableProps {
  data: SalaryRaise[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const RewardsTable: React.FC<SalaryRaiseRequestsTableProps> = ({
  data,
  onApprove,
  onReject,
}) => {
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  // Filter the data based on status (exclude approved and rejected)
  const filteredData = data.filter(
    (record) => record.status !== "approved" && record.status !== "rejected"
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "employeeId",
      key: "_id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Current Salary",
      dataIndex: "currentSalary",
      key: "currentSalary",
    },
    {
      title: "New Salary",
      dataIndex: "newSalary",
      key: "newSalary",
    },
    {
      title: "Salary Raise Time",
      dataIndex: "salaryRaiseTime",
      key: "salaryRaiseTime",
      render: (from: Date | undefined) =>
        from && new Date(from).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: any, record: SalaryRaise) => (
        <Space>
          <Button
            type="primary"
            onClick={() => {
              const employeeId = record.employeeId ?? "";
              setSelectedRow(employeeId);
              onApprove(employeeId);
            }}
          >
            Approve
          </Button>
          <Button
            danger
            onClick={() => {
              const employeeId = record.employeeId ?? "";
              setSelectedRow(employeeId);
              onReject(employeeId);
            }}
          >
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={filteredData} // Use the filtered data
      rowClassName={(record) =>
        record.employeeId === selectedRow ? "selected-row" : ""
      }
    />
  );
};

export default RewardsTable;
