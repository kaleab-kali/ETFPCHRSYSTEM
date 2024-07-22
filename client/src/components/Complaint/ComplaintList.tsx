import React, { useRef } from "react";
import { Button, message, Skeleton, Space, Table, Tag } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";
import { useReactToPrint } from "react-to-print";
import { CSVLink } from "react-csv";
import { useAllComplaints } from "../../services/queries/complaintQueries";
import Loader from "../Common/Loader";
import { useUpdateValidateComplaint } from "../../services/mutations/complaintMutation";

interface Complaint {
  employeeId?: string;
  category?: string;
  complaint?: string;
  description?: string;
  complaintId?: string;
  status?: string;
}

const ComplaintList: React.FC = () => {
  const allComplaints = useAllComplaints();
  const validateComplaint= useUpdateValidateComplaint()
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleAccept = (complaintId: string) => {
    // Add logic to handle accept action
    const complaintData = {
      complaintId: complaintId,
      status: "inprogress",
    };
    validateComplaint.mutate(complaintData);
    // message.success(`Complaint ${complaintId} accepted`);
  };

  const handleReject = (complaintId: string) => {
    // Add logic to handle reject action
    const complaintData = {
      complaintId: complaintId,
      status: "reject",
    };
    validateComplaint.mutate(complaintData);
    // message.error(`Complaint ${complaintId} rejected`);
  };

  if (!allComplaints.data) {
    return (
      <div style={{ marginTop: "50px" }}>
        <Skeleton active paragraph={{ rows: 6 }} />
      </div>
    );
  }

  const columns = [
    {
      title: "Employee ID",
      dataIndex: "employeeId",
      key: "employeeId",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Complaint ID",
      dataIndex: "complaintId",
      key: "complaintId",
    },
    {
      title: "Complaint",
      dataIndex: "complaint",
      key: "complaint",
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
        if (text.toLocaleUpperCase() === "PENDING") {
          color = "blue";
        } else if (text.toLocaleUpperCase() === "LOW") {
          color = "green";
        } else if (text.toLocaleUpperCase() === "MEDIUM") {
          color = "yellow";
        } else if (text.toLocaleUpperCase() === "HIGH") {
          color = "red";
        }
        return <Tag color={color}>{text.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: Complaint) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => handleAccept(record.complaintId!)}
          >
            Accept
          </Button>
          <Button
            type="default"
            danger
            onClick={() => handleReject(record.complaintId!)}
          >
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  const pendingComplaints = allComplaints.data.filter(
    (complaint: Complaint) => complaint.status?.toUpperCase() === "PENDING"
  );

  return (
    <div style={{ margin: "20px" }}>
      <Space style={{ float: "right" }}>
        {/* Export to CSV */}
        <Button type="primary">
          <CSVLink
            filename={"Complaint_List.csv"}
            data={pendingComplaints.map((item: Complaint) => ({
              Employee_ID: item.employeeId,
              Complaint_ID: item.complaintId,
              Category: item.category,
              Complaint: item.complaint,
              Description: item.description,
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
        <Table columns={columns} dataSource={pendingComplaints} />
      </div>
    </div>
  );
};

export default ComplaintList;
