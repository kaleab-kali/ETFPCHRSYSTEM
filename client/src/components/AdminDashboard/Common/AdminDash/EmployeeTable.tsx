import React, { useState } from "react";
import {
  Table,
  Card,
  Typography,
  Input,
  Button,
  Select,
  Avatar,
  Row,
  Col,
} from "antd";
import {
  UserOutlined,
  SearchOutlined,
  DownloadOutlined,
  PrinterOutlined,
} from "@ant-design/icons";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";
import { Link, useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Option } = Select;

interface Employee {
  empId: string;
  firstName: string;
  lastName: string;
  position: string;
  department: string;
  email: string;
  photo: string; // URL of the avatar image
}

interface Props {
  employees: Employee[];
}

const EmployeeTable: React.FC<Props> = ({ employees }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedPosition, setSelectedPosition] = useState<string | undefined>(
    undefined
  );
  const [selectedDepartment, setSelectedDepartment] = useState<
    string | undefined
  >(undefined);

  const navigate = useNavigate();

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handlePositionFilter = (value: string) => {
    setSelectedPosition(value);
  };

  const handleDepartmentFilter = (value: string) => {
    setSelectedDepartment(value);
  };

  const handleResetFilters = () => {
    setSearchText("");
    setSelectedPosition(undefined);
    setSelectedDepartment(undefined);
  };

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearchText =
      employee.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
      employee.empId.includes(searchText);
    const matchesPosition = selectedPosition
      ? employee.position === selectedPosition
      : true;
    const matchesDepartment = selectedDepartment
      ? employee.department === selectedDepartment
      : true;
    return matchesSearchText && matchesPosition && matchesDepartment;
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "firstName",
      key: "firstName",
      render: (text: string, record: any) => (
        <Link to={`/employee/view/${record?._id}`}>
          <Avatar
            src={`http://localhost:8000/${record.photo}`}
            icon={!record?.photo ? <UserOutlined /> : undefined}
            style={{ marginRight: 8 }}
          />
          {`${record.firstName} ${record.lastName}`}
        </Link>
      ),
    },
    {
      title: "ID",
      dataIndex: "empId",
      key: "empId",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  const downloadPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Name", "ID", "Position", "Department", "Email"]],
      body: filteredEmployees.map((emp) => [
        `${emp.firstName} ${emp.lastName}`,
        emp.empId,
        emp.position,
        emp.department,
        emp.email,
      ]),
    });
    doc.save("employees.pdf");
  };

  const csvData = filteredEmployees.map((emp) => ({
    Name: `${emp.firstName} ${emp.lastName}`,
    ID: emp.empId,
    Position: emp.position,
    Department: emp.department,
    Email: emp.email,
  }));

  return (
    <Card>
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={4}>Employee List</Title>
        </Col>
        <Col>
          <Input
            placeholder="Search by name or ID"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 200, marginRight: 16 }}
          />
          <Select
            placeholder="Filter by position"
            style={{ width: 200, marginRight: 16 }}
            onChange={handlePositionFilter}
            allowClear
          >
            {[
              ...Array.from(
                new Set(employees.map((employee) => employee.position))
              ),
            ].map((position) => (
              <Option key={position} value={position}>
                {position}
              </Option>
            ))}
          </Select>
          <Select
            placeholder="Filter by department"
            style={{ width: 200, marginRight: 16 }}
            onChange={handleDepartmentFilter}
            allowClear
          >
            {[
              ...Array.from(
                new Set(employees.map((employee) => employee.department))
              ),
            ].map((department) => (
              <Option key={department} value={department}>
                {department}
              </Option>
            ))}
          </Select>
          <Button onClick={handleResetFilters} style={{ marginRight: 16 }}>
            Reset Filters
          </Button>
          <Button
            icon={<DownloadOutlined />}
            onClick={downloadPDF}
            style={{ marginRight: 16 }}
          >
            Download PDF
          </Button>
          <CSVLink data={csvData} filename="employees.csv">
            <Button icon={<DownloadOutlined />} style={{ marginRight: 16 }}>
              Download CSV
            </Button>
          </CSVLink>
          <Button icon={<PrinterOutlined />} onClick={() => window.print()}>
            Print
          </Button>
        </Col>
      </Row>
      <Table
        dataSource={filteredEmployees}
        columns={columns}
        rowKey="empId"
        style={{ marginTop: 16 }}
      />
    </Card>
  );
};

export default EmployeeTable;
