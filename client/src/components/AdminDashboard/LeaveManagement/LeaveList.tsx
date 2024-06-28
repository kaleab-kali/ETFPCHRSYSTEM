import React, { useState, useRef } from "react";
import {
  Card,
  Table,
  Tag,
  Spin,
  Alert,
  Input,
  Button,
  DatePicker,
  Select,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useAllLeaves } from "../../../services/queries/leaveQueries";
import {
  SearchOutlined,
  DownloadOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";
import ReactToPrint from "react-to-print";
import moment from "moment";

const { RangePicker } = DatePicker;
const { Option } = Select;

interface LeaveRequest {
  employeeId: string;
  employeeName: string;
  leaveType: string;
  leaveFrom: string;
  leaveTo: string;
  noOfDays: number;
  status: "Approved" | "Rejected" | "Pending";
  reason: string;
}

const columns: ColumnsType<LeaveRequest> = [
  {
    title: "Employee ID",
    dataIndex: "employeeId",
    key: "employeeId",
  },
  {
    title: "Employee Name",
    dataIndex: "employeeName",
    key: "employeeName",
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
    title: "No Of Days",
    dataIndex: "noOfDays",
    key: "noOfDays",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: "Approved" | "Rejected" | "Pending") => (
      <Tag
        color={
          status === "Approved"
            ? "green"
            : status === "Rejected"
            ? "red"
            : "orange"
        }
      >
        {status}
      </Tag>
    ),
  },
  {
    title: "Reason",
    dataIndex: "reason",
    key: "reason",
  },
];

const LeaveRequestTable: React.FC = () => {
  const { data, isLoading, error } = useAllLeaves();
  const [searchText, setSearchText] = useState("");
  const [filteredStatus, setFilteredStatus] = useState<string | null>(null);
  const [filteredLeaveType, setFilteredLeaveType] = useState<string | null>(
    null
  );
  const [dateRange, setDateRange] = useState<
    [moment.Moment, moment.Moment] | null
  >(null);
  const componentRef = useRef<HTMLDivElement>(null);

  if (isLoading) {
    return (
      <Card>
        <Spin tip="Loading...">
          <Alert message="Fetching leave requests" type="info" />
        </Spin>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <Alert
          message="Error fetching leave requests"
          type="error"
          description={error.message}
        />
      </Card>
    );
  }

  const leaveRequests: LeaveRequest[] = (data || []).map((leave: any) => ({
    employeeId: leave.employeeId,
    employeeName: leave.employee?.fullName || "Unknown",
    leaveType: leave.leaveType,
    leaveFrom: new Date(leave.from).toLocaleDateString(),
    leaveTo: new Date(leave.to).toLocaleDateString(),
    noOfDays: Math.ceil(
      (new Date(leave.to).getTime() - new Date(leave.from).getTime()) /
        (1000 * 60 * 60 * 24)
    ),
    status:
      leave.status.charAt(0).toUpperCase() +
      leave.status.slice(1).toLowerCase(),
    reason: leave.reason,
  }));

  const filteredData = leaveRequests.filter((leave) => {
    const matchesSearch =
      leave.employeeName.toLowerCase().includes(searchText.toLowerCase()) ||
      leave.employeeId.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = filteredStatus
      ? leave.status === filteredStatus
      : true;
    const matchesLeaveType = filteredLeaveType
      ? leave.leaveType === filteredLeaveType
      : true;
    const matchesDateRange = dateRange
      ? moment(leave.leaveFrom).isBetween(
          dateRange[0],
          dateRange[1],
          undefined,
          "[]"
        ) &&
        moment(leave.leaveTo).isBetween(
          dateRange[0],
          dateRange[1],
          undefined,
          "[]"
        )
      : true;
    return (
      matchesSearch && matchesStatus && matchesLeaveType && matchesDateRange
    );
  });

  const exportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [
        [
          "Employee ID",
          "Employee Name",
          "Leave Type",
          "Leave From",
          "Leave To",
          "No Of Days",
          "Status",
          "Reason",
        ],
      ],
      body: filteredData.map((leave) => [
        leave.employeeId,
        leave.employeeName,
        leave.leaveType,
        leave.leaveFrom,
        leave.leaveTo,
        leave.noOfDays,
        leave.status,
        leave.reason,
      ]),
    });
    doc.save("leave_requests.pdf");
  };

  return (
    <Card>
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Input
          placeholder="Search by Name or ID"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 200 }}
          prefix={<SearchOutlined />}
        />
        <Select
          placeholder="Filter by Status"
          allowClear
          style={{ width: 150 }}
          onChange={(value) => setFilteredStatus(value)}
        >
          <Option value="Approved">Approved</Option>
          <Option value="Rejected">Rejected</Option>
          <Option value="Pending">Pending</Option>
        </Select>
        <Select
          placeholder="Filter by Leave Type"
          allowClear
          style={{ width: 150 }}
          onChange={(value) => setFilteredLeaveType(value)}
        >
          <Option value="annual">Annual</Option>
          <Option value="paternity">Paternity</Option>
          <Option value="medical">Medical</Option>
        </Select>
        <RangePicker
          onChange={(dates) =>
            setDateRange(dates as unknown as [moment.Moment, moment.Moment])
          }
        />
        <Button icon={<DownloadOutlined />} onClick={exportPDF}>
          Download PDF
        </Button>
        <Button icon={<PrinterOutlined />}>
          <ReactToPrint
            trigger={() => <span>Print</span>}
            content={() => componentRef.current}
          />
        </Button>
        <Button>
          <CSVLink data={filteredData} filename={"leave_requests.csv"}>
            <DownloadOutlined /> Download CSV
          </CSVLink>
        </Button>
      </div>
      <div ref={componentRef}>
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey={(record) => record.employeeId + record.leaveFrom}
        />
      </div>
    </Card>
  );
};

export default LeaveRequestTable;
