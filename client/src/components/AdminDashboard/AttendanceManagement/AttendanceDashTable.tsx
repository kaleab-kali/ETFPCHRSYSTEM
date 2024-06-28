import React, { useState, useRef, useEffect } from "react";
import { Table, Avatar, Tag, Input, Button } from "antd";
import {
  SearchOutlined,
  PrinterOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { CSVLink } from "react-csv";
import ReactToPrint from "react-to-print";
import { useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import { useAttendance } from "../../../services/queries/attendanceQueries";

const AttendanceDashTable: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const tableRef = useRef(null);
  const navigate = useNavigate();
  const attendance = useAttendance();
  const [filteredData, setFilteredData] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (attendance.data) {
      setFilteredData(attendance.data.slice(0, 3));
    }
  }, [attendance.data]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = attendance.data.filter(
      (employee: any) =>
        employee.name.toLowerCase().includes(value) ||
        employee.employeeId.includes(value)
    );
    setFilteredData(filtered.slice(0, showAll ? filtered.length : 3));
  };

  const handleShowMore = () => {
    setShowAll(true);
    setFilteredData(attendance.data);
  };

  const handleShowLess = () => {
    setShowAll(false);
    setFilteredData(attendance.data.slice(0, 3));
  };

  const csvData = filteredData.map((employee: any) => ({
    "Employee ID": employee.employeeId,
    "Profile Avatar": employee.photo,
    Name: employee.name,
    Status: employee.status,
    Department: employee.department,
  }));

  const columns: ColumnsType = [
    {
      title: "Employee ID",
      dataIndex: "employeeId",
      key: "id",
    },
    {
      title: "Profile & Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <span style={{ display: "flex", alignItems: "center" }}>
          <Avatar src={record.avatar} style={{ marginRight: 8 }} />
          <Button
            type="link"
            onClick={() => navigate(`/profile/${record.employeeId}`)}
          >
            {record.name}
          </Button>
        </span>
      ),
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Present", value: "on time" },
        { text: "Absent", value: "absent" },
        { text: "Late", value: "late" },
        { text: "Permission", value: "permission" },
      ],
      onFilter: (value, record) => record.status.includes(value as string),
      render: (status: "on time" | "absent" | "late" | "permission") => {
        let color = "";
        let label = "";
        switch (status) {
          case "on time":
            color = "green";
            label = "Present";
            break;
          case "absent":
            color = "red";
            label = "Absent";
            break;
          case "late":
            color = "yellow";
            label = "Late";
            break;
          case "permission":
            color = "orange";
            label = "Permission";
            break;
        }
        return <Tag color={color}>{label}</Tag>;
      },
    },
  ];

  return (
    <div style={{ marginTop: "20px" }}>
      <Input
        placeholder="Search by name or ID"
        value={searchText}
        onChange={handleSearch}
        prefix={<SearchOutlined />}
        style={{ marginBottom: 16, width: 300 }}
      />
      <Button
        type="primary"
        icon={<DownloadOutlined />}
        style={{ marginBottom: 16, marginLeft: 8 }}
      >
        <CSVLink
          data={csvData}
          filename="employees.csv"
          style={{ color: "#fff" }}
        >
          Download CSV
        </CSVLink>
      </Button>
      <ReactToPrint
        trigger={() => (
          <Button
            type="primary"
            icon={<PrinterOutlined />}
            style={{ marginBottom: 16, marginLeft: 8 }}
          >
            Print
          </Button>
        )}
        content={() => tableRef.current}
      />
      <div
        ref={tableRef}
        style={{
          maxHeight: showAll ? 250 : "none",
          overflowY: showAll ? "auto" : "visible",
        }}
      >
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={false}
        />
      </div>
      {!showAll ? (
        <Button type="link" onClick={handleShowMore} style={{ marginTop: 16 }}>
          See More
        </Button>
      ) : (
        <Button type="link" onClick={handleShowLess} style={{ marginTop: 16 }}>
          See Less
        </Button>
      )}
    </div>
  );
};

export default AttendanceDashTable;
