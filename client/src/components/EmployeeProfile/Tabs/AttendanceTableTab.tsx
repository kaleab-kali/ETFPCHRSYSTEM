import React, { useState } from "react";
import { Table, Tag, Modal, Form, Upload, Button, Select, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import { EmployeeData } from "../../../../../shared/types/employeeTypes";
import { IAttendance } from "../../../../../shared/types/employeeTypes";
import { useCreateSubmitEvidence } from "../../../services/mutations/attendanceMutation";

interface AttendanceRecord extends IAttendance {
  key: string;
  totalHours: string;
}

const columns = (showUploadModal: (record: AttendanceRecord) => void) => [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (date: string) => moment(date).format("YYYY/MM/DD"), // Format date
  },
  {
    title: "Check-in Time",
    dataIndex: "recordedTime",
    key: "recordedTime",
    render: (time: string) => moment(time).format("hh:mm A"), // Format time
  },
  {
    title: "Check-out Time",
    dataIndex: "checkOutTime",
    key: "checkOutTime",
    render: (time: string) =>
      time ? moment(time).format("hh:mm A") : "Not Checked Out", // Format time or display "Not Checked Out"
  },
  {
    title: "Total Hours",
    dataIndex: "totalHours",
    key: "totalHours",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text: string, record: AttendanceRecord) => {
      let color = "";
      if (text === "on time") {
        color = "green";
      } else if (text === "late") {
        color = "yellow";
      } else if (text === "absent") {
        color = "red";
      } else if (text === "permission") {
        color = "orange";
      }

      return (
        <Tag
          color={color}
          onClick={() => {
            if (text === "absent") {
              showUploadModal(record);
            }
          }}
        >
          {text.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: "Permission Status",
    dataIndex: "permissionStatus",
    key: "permissionStatus",
    render: (text: string) => (text ? text : "N/A"),
  },
];

interface Props {
  selectedEmployee?: EmployeeData;
}

const AttendanceTableTab: React.FC<Props> = ({ selectedEmployee }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const submitEvidence = useCreateSubmitEvidence()
  const [currentRecord, setCurrentRecord] = useState<AttendanceRecord | null>(
    null
  );
  const [form] = Form.useForm();

  const showUploadModal = (record: AttendanceRecord) => {
    setCurrentRecord(record);
    console.log(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };


  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("file", values.file[0].originFileObj);
      formData.append("employeeId", selectedEmployee?.empId || "");
      const date = new Date(currentRecord?.date||"");
      formData.append("date", date.toISOString());
      submitEvidence.mutate(formData);
      // await axios.post("/api/upload", formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });

      message.success(
        "File uploaded and permission status updated successfully"
      );
      setIsModalVisible(false);
      form.resetFields();
    } catch (info) {
      console.log("Validate Failed:", info);
    }
  };

  const calculateTotalHours = (record: AttendanceRecord) => {
    // Calculate total hours
    if (record.checkOutTime) {
      const checkInTime = new Date(record.recordedTime).getTime();
      const checkOutTime = new Date(record.checkOutTime).getTime();
      const timeDiff = checkOutTime - checkInTime;
      const totalHours = Math.round(timeDiff / (1000 * 60 * 60)); // Convert milliseconds to hours
      return `${totalHours} hours`;
    } else {
      const checkInTime = new Date(record.recordedTime).getTime();
      const currentTime = new Date().getTime();
      const timeDiff = currentTime - checkInTime;
      const totalHours = Math.round(timeDiff / (1000 * 60 * 60)); // Convert milliseconds to hours
      return `${totalHours} hours`;
    }
  };

  // Transform selectedEmployee?.attendanceRecords to calculate total hours dynamically
  const transformedData: AttendanceRecord[] | undefined =
    selectedEmployee?.attendanceRecords?.map((record) => ({
      ...record,
      key: record.date.toString(),
      totalHours: calculateTotalHours(record as AttendanceRecord),
    }));

  return (
    <>
      <Table columns={columns(showUploadModal)} dataSource={transformedData} />

      <Modal
        title="Upload File and Update Permission Status"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="file"
            label="Upload File"
            valuePropName="fileList"
            getValueFromEvent={(e: any) =>
              Array.isArray(e) ? e : e && e.fileList
            }
            rules={[{ required: true, message: "Please upload a file!" }]}
          >
            <Upload name="file" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AttendanceTableTab;
