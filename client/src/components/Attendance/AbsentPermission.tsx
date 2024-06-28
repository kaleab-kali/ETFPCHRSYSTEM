import React, { useEffect, useState } from "react";
import { Table, Button, message, Tag, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useSubmittedEvidenceAttendance, useDepartmentHeadSubmittedEvidenceAttendance, useManagerSubmittedEvidenceAttendance } from "../../services/queries/attendanceQueries";
import { useUpdateReviewEvidence } from "../../services/mutations/attendanceMutation";
import { IAttendance } from "../../../../shared/types/employeeTypes";
import { useAuth } from "../../context/AuthContext";

interface EvidenceRequest {
  _id: string;
  employeeId: string;
  date: string;
  evidence: string;
  reviewStatus: string;
}

const EvidenceReview: React.FC = () => {
  const [evidenceRequests, setEvidenceRequests] = useState<EvidenceRequest[]>(
    []
  );
  const {user}=useAuth()
  const [loading, setLoading] = useState<boolean>(true);
  const attendance = useSubmittedEvidenceAttendance();
  const depHead= useDepartmentHeadSubmittedEvidenceAttendance(user?.employeeId||"")
  const manager = useManagerSubmittedEvidenceAttendance(user?.employeeId || "");
  const attendanceRequest = user?.role ==="department head"? depHead : user?.role ==="manager"? manager:attendance;
  console.log("attendanceRequest: "+attendanceRequest.data)
  const review = useUpdateReviewEvidence();

  const handleApprove = async (record: IAttendance) => {
    try {
      review.mutate({ ...record, reviewStatus: "approved" });
      message.success("Evidence approved successfully");
    } catch (error) {
      console.error("Error approving evidence:", error);
      message.error("Error approving evidence");
    }
  };

  const handleReject = async (record: IAttendance) => {
    try {
      review.mutate({ ...record, reviewStatus: "rejected" });
      message.success("Evidence rejected successfully");
    } catch (error) {
      console.error("Error rejecting evidence:", error);
      message.error("Error rejecting evidence");
    }
  };

  const downloadFile = (url: string, filename: string) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
        message.error("Error downloading file");
      });
  };

  const columns = [
    {
      title: "Employee ID",
      dataIndex: "employeeId",
      key: "employeeId",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text: string) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Evidence",
      dataIndex: "evidence",
      key: "evidence",
      render: (text: string, record: IAttendance) => (
        <Button
          icon={<UploadOutlined />}
          onClick={() =>
            downloadFile(
              `http://localhost:8000/${record.evidence}`,
              record.evidence || "evidence"
            )
          }
        >
          Download
        </Button>
      ),
    },
    {
      title: "Status",
      dataIndex: "reviewStatus",
      key: "reviewStatus",
      render: (status: string) => (
        <Tag color={status === "approved" ? "green" : "red"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: IAttendance) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => handleApprove(record)}
            disabled={record.reviewStatus === "approved"}
          >
            Approve
          </Button>
          <Button
            danger
            onClick={() => handleReject(record)}
            disabled={record.reviewStatus === "rejected"}
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
      dataSource={attendanceRequest.data}
      rowKey="_id"
      // loading={loading}
    />
  );
};

export default EvidenceReview;
