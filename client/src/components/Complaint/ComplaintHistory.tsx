import React, { useRef } from "react";
import { Button, message, Skeleton, Space, Table, Tag } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";
import { useReactToPrint } from "react-to-print";
import { CSVLink } from "react-csv";
import { useAllComplaints } from "../../services/queries/complaintQueries";
import Loader from "../Common/Loader";

interface Compaint {
  employeeId?: string;
  category?: string;
  complaint?: string;
  description?: string;
  complaintId?: string;
  status?: string;
}

const ComplaintHistory: React.FC = () => {
  const allComplaints = useAllComplaints();

  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  if (!allComplaints.data) {
    return (
      <div style={{marginTop:"50px"}}>
        <Skeleton active paragraph={{ rows: 6 }} />
      </div>
    );
  }
  const columns = [
    {
      title: "Enployee ID",
      dataIndex: "employeeId",
      key: "EmployeeId",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Compliant ID",
      dataIndex: "complaintId",
      key: "complaintId",
    },
    {
      title: "Complaint",
      dataIndex: "complaint",
      key: "compliant",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: string) => {
        let color = "";
        if (text.toLocaleUpperCase() === "LOW") {
          color = "green";
        } else if (text.toLocaleUpperCase() === "MEDIUM") {
          color = "yellow";
        } else if (text.toLocaleUpperCase() === "HIGH") {
          color = "red";
        }
        return <Tag color={color}>{text.toUpperCase()}</Tag>;
      },
    },
  ];

  return (
    <div style={{ margin: "20px" }}>
      <Space style={{ float: "right" }}>
        {/* Export to CSV */}
        <Button type="primary">
          <CSVLink
            filename={"Attendance_Table.csv"}
            data={allComplaints.data.map((item: Compaint) => ({
              Employee_ID: item.employeeId,
              Complaint_ID: item.complaintId,
              Category: item.category,
              Complaint: item.complaint,
              Discription: item.description,
              Status: item.status,
            }))}
            onClick={() => {
              message.success("CSV file is downloading");
            }}
          >
            Export to CSV
          </CSVLink>
        </Button>
        {/* Export to PDF */}
        <Button onClick={handlePrint} type="primary" danger>
          <FilePdfOutlined /> Export to PDF
        </Button>
      </Space>
      {/* Antd table */}
      <div ref={componentRef}>
        <Table columns={columns} dataSource={allComplaints.data} />
      </div>
    </div>
  );
};

export default ComplaintHistory;
