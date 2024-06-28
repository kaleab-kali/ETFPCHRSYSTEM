import React, { useState, useRef } from "react";
import {
  Button,
  message,
  Skeleton,
  Space,
  Table,
  Tag,
  Input,
  DatePicker,
  Modal,
  Form,
  Upload,
} from "antd";
import { FilePdfOutlined, UploadOutlined } from "@ant-design/icons";
import { useReactToPrint } from "react-to-print";
import { CSVLink } from "react-csv";
import {
  useAttendance,
  useDepartmentHeadAttendance,
  useManagerAttendance,
} from "../../services/queries/attendanceQueries";
import moment from "moment";
import dayjs from "dayjs";
import { useCreateSubmitEvidence } from "../../services/mutations/attendanceMutation";
import { useAuth } from "../../context/AuthContext";
import type { ColumnsType } from "antd/es/table";

const { RangePicker } = DatePicker;

interface AttendanceItem {
  employeeId: string;
  name: string;
  department: string;
  position: string;
  totalHoursWorked: number;
  status: string;
  date: string;
  permissionStatus?: string;
}

const AttendanceHistory: React.FC = () => {
  const { user } = useAuth();
  const allAttendance = useAttendance();
  const depHead = useDepartmentHeadAttendance(user?.employeeId || "");
  const manager = useManagerAttendance(user?.employeeId || "");
  const attendanceRequest =
    user?.role === "department head"
      ? depHead
      : user?.role === "manager"
      ? manager
      : allAttendance;
  const submitEvidence = useCreateSubmitEvidence();
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState<
    [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
  >(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<AttendanceItem | null>(
    null
  );
  const [form] = Form.useForm();

  if (!attendanceRequest?.data) {
    return (
      <div style={{ marginTop: "50px" }}>
        <Skeleton active paragraph={{ rows: 6 }} />
      </div>
    );
  }

  const handleStatusClick = (record: AttendanceItem) => {
    if (record.status === "absent") {
      setCurrentRecord(record);
      setIsModalVisible(true);
    }
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
      formData.append("employeeId", currentRecord?.employeeId || "");
      formData.append("date", currentRecord?.date || "");
      submitEvidence.mutate(formData);

      message.success(
        "File uploaded and permission status updated successfully"
      );
      setIsModalVisible(false);
      form.resetFields();
    } catch (info) {
      console.log("Validate Failed:", info);
    }
  };

  const filteredData = attendanceRequest.data.filter((item: AttendanceItem) => {
    const nameMatch = item.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const dateMatch =
      (!dateRange ||
        !dateRange[0] ||
        (dateRange[0] &&
          dayjs(item.date).isAfter(dateRange[0].startOf("day")))) &&
      (!dateRange ||
        !dateRange[1] ||
        (dateRange[1] && dayjs(item.date).isBefore(dateRange[1].endOf("day"))));
    const excludeCurrentUser = item.employeeId !== user?.employeeId;
    return nameMatch && dateMatch && excludeCurrentUser;
  });

  const columns: ColumnsType<AttendanceItem> = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) => moment(date).format("YYYY/MM/DD"),
      sorter: (a: AttendanceItem, b: AttendanceItem) =>
        moment(a.date).unix() - moment(b.date).unix(),
    },
    {
      title: "ID",
      dataIndex: "employeeId",
      key: "employeeId",
      sorter: (a: AttendanceItem, b: AttendanceItem) =>
        a.employeeId.localeCompare(b.employeeId),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Hours Worked",
      dataIndex: "totalHoursWorked",
      key: "totalHoursWorked",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "On Time", value: "on time" },
        { text: "Late", value: "late" },
        { text: "Absent", value: "absent" },
        { text: "Permission", value: "permission" },
      ],
      onFilter: (value, record: AttendanceItem) => record.status === value,
      render: (text: string, record: AttendanceItem) => {
        let color =
          text === "on time"
            ? "green"
            : text === "late"
            ? "yellow"
            : text === "absent"
            ? "red"
            : "orange";
        return (
          <Tag color={color} onClick={() => handleStatusClick(record)}>
            {text.toUpperCase()}
          </Tag>
        );
      },
    },
  ];

  return (
    <div style={{ margin: "20px" }}>
      <Space style={{ marginBottom: "16px" }}>
        <Input
          placeholder="Search by name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 200 }}
        />
        <RangePicker
          value={dateRange as any}
          onChange={(dates) =>
            setDateRange(
              dates as [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
            )
          }
          style={{ width: 300 }}
        />
      </Space>
      <Space style={{ float: "right" }}>
        <Button type="primary">
          <CSVLink
            filename={"Attendance_Table.csv"}
            data={attendanceRequest.data.map((item: AttendanceItem) => ({
              Name: item.name,
              Department: item.department,
              Position: item.position,
              "Hours Worked": item.totalHoursWorked,
              Status: item.status,
              Date: item.date,
              "Permission Status": item.permissionStatus,
            }))}
            onClick={() => {
              message.success("CSV file is downloading");
            }}
          >
            Export to CSV
          </CSVLink>
        </Button>
        <Button onClick={handlePrint} type="primary" danger>
          <FilePdfOutlined /> Export to PDF
        </Button>
      </Space>
      <div ref={componentRef}>
        <Table columns={columns} dataSource={filteredData} />
      </div>
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
    </div>
  );
};

export default AttendanceHistory;
