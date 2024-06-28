import React, { useState } from "react";
import {
  Button,
  Table,
  Space,
  Tag,
  Modal,
  Input,
  Form,
  TablePaginationConfig,
} from "antd";
import {
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
} from "antd/es/table/interface";
import { useAuth } from "../../context/AuthContext";

type LeaveRequest = {
  reason: string | undefined;
  from: Date | undefined;
  to: Date | undefined;
  status: string | undefined;
  employeeId: string | undefined;
  leaveType: string | undefined;
  leaveId?: string | undefined;
  employee:
    | {
        firstName: string | undefined;
        email: string | undefined;
        gender: string | undefined;
        department: any;
      }
    | undefined;
};

interface LeaveRequestsTableProps {
  data: LeaveRequest[];
  onApprove: (empId: string, leaveId: string, delegatedTo: string) => void;
  onReject: (empId: string, leaveId: string, reason: string) => void;
}

const LeaveRequestsTable: React.FC<LeaveRequestsTableProps> = ({
  data,
  onApprove,
  onReject,
}) => {
  const [filteredData, setFilteredData] = useState<LeaveRequest[]>([]);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [currentLeaveId, setCurrentLeaveId] = useState<string | null>(null);
  const [delegatedTo, setDelegatedTo] = useState<string>("");
  const [rejectReason, setRejectReason] = useState<string>("");
  const {user}=useAuth()
  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<LeaveRequest> | SorterResult<LeaveRequest>[],
    extra: TableCurrentDataSource<LeaveRequest>
  ) => {
    let newData = data.filter((record) => {
      const nameFilter = filters.employeeFirstName
        ? record.employee?.firstName === filters.employeeFirstName[0]
        : true;
      const idFilter = filters.employeeId
        ? record.employeeId === filters.employeeId[0]
        : true;
      const departmentFilter = filters.employeeDepartment
        ? record.employee?.department === filters.employeeDepartment[0]
        : true;
      const actionFilter = filters.status
        ? record.status === filters.status[0]
        : true;
      return nameFilter && idFilter && departmentFilter && actionFilter;
    });
    setFilteredData(newData);
  };

  const handleApprove = () => {
    if (delegatedTo && currentId && currentLeaveId) {
      onApprove(currentId, currentLeaveId, delegatedTo);
      setIsApproveModalVisible(false);
      setDelegatedTo("");
    }
  };

  const handleReject = () => {
    if (rejectReason && currentId && currentLeaveId) {
      onReject(currentId, currentLeaveId, rejectReason);
      setIsRejectModalVisible(false);
      setRejectReason("");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "employeeId",
      key: "_id",
      filters: data.map((record) => ({
        text: record.employeeId || "",
        value: record.employeeId || "",
      })),
      onFilter: (value: any, record: LeaveRequest) =>
        record.employeeId === value,
      sorter: (a: LeaveRequest, b: LeaveRequest) =>
        (a.employeeId || "").localeCompare(b.employeeId || ""),
    },
    {
      title: "Name",
      dataIndex: ["employee", "firstName"],
      key: "employeeFirstName",
      filters: data
        .map((record) => record.employee?.firstName || "")
        .filter((name, index, self) => self.indexOf(name) === index)
        .map((name) => ({ text: name, value: name })),
      onFilter: (value: any, record: LeaveRequest) =>
        record.employee?.firstName === value,
      sorter: (a: LeaveRequest, b: LeaveRequest) =>
        (a.employee?.firstName || "").localeCompare(
          b.employee?.firstName || ""
        ),
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
      render: (from: Date | undefined) =>
        from && new Date(from).toLocaleDateString(),
    },
    {
      title: "To",
      dataIndex: "to",
      key: "to",
      render: (to: Date | undefined) => to && new Date(to).toLocaleDateString(),
    },
    {
      title: "Department",
      dataIndex: ["employee", "department"],
      key: "employeeDepartment",
      filters: data
        .map((record) => record.employee?.department || "")
        .filter((department, index, self) => self.indexOf(department) === index)
        .map((department) => ({ text: department, value: department })),
      onFilter: (value: any, record: LeaveRequest) =>
        record.employee?.department === value,
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: any, record: LeaveRequest) => {
        if (record.status === "pending" && (user?.role==="manager" || user?.role==="department head")) {
          return (
            <Space>
              <Button
                type="primary"
                onClick={() => {
                  setCurrentId(record.employeeId || "");
                  setCurrentLeaveId(record.leaveId || "");
                  setIsApproveModalVisible(true);
                }}
              >
                Approve
              </Button>
              <Button
                danger
                onClick={() => {
                  setCurrentId(record.employeeId || "");
                  setCurrentLeaveId(record.leaveId || "");
                  setIsRejectModalVisible(true);
                }}
              >
                Reject
              </Button>
            </Space>
          );
        } else {
          let color = "";
          if (record.status === "approved") {
            color = "green";
          } else if (record.status === "rejected") {
            color = "red";
          }
          return (
            <Tag color={color}>
              {record.status && record.status.toUpperCase()}
            </Tag>
          );
        }
      },
      filters: [
        { text: "Pending", value: "pending" },
        { text: "Approved", value: "approved" },
        { text: "Rejected", value: "rejected" },
      ],
      onFilter: (value: any, record: LeaveRequest) => record.status === value,
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={filteredData.length > 0 ? filteredData : data}
        onChange={handleTableChange}
        rowClassName={(record) =>
          record.employeeId === selectedRow ? "selected-row" : ""
        }
      />

      <Modal
        title="Approve Leave Request"
        visible={isApproveModalVisible}
        onOk={handleApprove}
        onCancel={() => setIsApproveModalVisible(false)}
      >
        <Form layout="vertical">
          <Form.Item
            label="Delegated To"
            required
            validateStatus={delegatedTo ? "success" : "error"}
            help={
              !delegatedTo
                ? "Please enter the ID of the employee delegated to"
                : ""
            }
          >
            <Input
              value={delegatedTo}
              onChange={(e) => setDelegatedTo(e.target.value)}
              placeholder="Enter delegated employee ID"
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Reject Leave Request"
        visible={isRejectModalVisible}
        onOk={handleReject}
        onCancel={() => setIsRejectModalVisible(false)}
      >
        <Form layout="vertical">
          <Form.Item
            label="Reason for Rejection"
            required
            validateStatus={rejectReason ? "success" : "error"}
            help={!rejectReason ? "Please enter the reason for rejection" : ""}
          >
            <Input
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter rejection reason"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LeaveRequestsTable;
