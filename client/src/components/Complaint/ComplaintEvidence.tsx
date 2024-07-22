import React, { useEffect, useState } from "react";
import { Table, Button, message, Tag, Space, Modal, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { useUpdateReviewEvidence } from "../../services/mutations/attendanceMutation";
import { useAuth } from "../../context/AuthContext";
import { useAllComplaints } from "../../services/queries/complaintQueries";
import { useUpdateFinalizeComplaint, useUpdateValidateComplaint } from "../../services/mutations/complaintMutation";

interface Complaint {
  employeeId?: string;
  category?: string;
  complaint?: string;
  evidence?:string;
  description?: string;
  complaintId?: string;
  status?: string;
}
const ComplaintEvidence: React.FC = () => {
  const [evidenceRequests, setEvidenceRequests] = useState<Complaint[]>([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] = useState<Complaint | null>(null);
  const [reason, setReason] = useState<string>("");
  const allComplaints = useAllComplaints();

  const vaidateReview = useUpdateFinalizeComplaint();

  const handleAction = (record: Complaint, status: string) => {
    setCurrentRecord({ ...record, status: status });
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    if (currentRecord) {
      try {
        vaidateReview.mutate({ ...currentRecord, reason });
        // message.success(
        //   `Evidence marked as ${currentRecord.status} with reason`
        // );
        console.log("validated "+ JSON.stringify(currentRecord))
        setIsModalVisible(false);
        setReason("");
      } catch (error) {
        console.error(`Error updating evidence:`, error);
        message.error(`Error updating evidence`);
      }
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setReason("");
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
      title: "Complaint ID",
      dataIndex: "complaintId",
      key: "complaintId",
    },
    {
      title: "Employee ID",
      dataIndex: "employeeId",
      key: "employeeId",
    },
    {
      title: "Evidence",
      dataIndex: "evidence",
      key: "evidence",
      render: (text: string, record: any) => (
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
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag
          color={
            status === "inprogress"
              ? "blue"
              : status === "guilty"
              ? "red"
              : "green"
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: Complaint) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => handleAction(record, "guilt")}
            disabled={record.status !== "inprogress"}
          >
            Guilty
          </Button>
          <Button
            danger
            onClick={() => handleAction(record, "not guilt")}
            disabled={record.status !== "inprogress"}
          >
            Not Guilty
          </Button>
        </Space>
      ),
    },
  ];

  const filteredRequests = allComplaints.data?.filter(
    (request: Complaint) => request.status?.toLowerCase() === "inprogress"
  );

  return (
    <>
      <Table
        columns={columns}
        dataSource={filteredRequests}
        rowKey="_id"
        // loading={loading}
      />
      <Modal
        title="Reason for Action"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Input.TextArea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter reason here"
          rows={4}
        />
      </Modal>
    </>
  );
};

export default ComplaintEvidence;
