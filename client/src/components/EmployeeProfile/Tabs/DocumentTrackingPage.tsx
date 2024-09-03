import React, { useState } from "react";
import {
  Card,
  Table,
  Collapse,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Upload,
  message,
} from "antd";
import { PlusOutlined, UploadOutlined, DownloadOutlined } from "@ant-design/icons";
import moment from "moment";
import { EthDateTime } from "ethiopian-calendar-date-converter";
import { useCreateDocument } from "../../../services/mutations/documentMutation";
import { useDocument, useDocumentById } from "../../../services/queries/documentQueries";
import { useAuth } from "../../../context/AuthContext";

const { Panel } = Collapse;
const { Option } = Select;
interface Props {
  selectedEmpId?: string;
}
const DocumentTrackingPage: React.FC<Props> = ({selectedEmpId}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentDirection, setCurrentDirection] = useState<"out" | "in">("out");
  const [form] = Form.useForm();
  const createDoc= useCreateDocument()
  const letterDocs= useDocumentById(selectedEmpId || "")
  const docData=letterDocs.data;
  console.log("doc" + JSON.stringify(docData) )
  const {user} = useAuth()
  const dummyData = [
    {
      documentNumber: "D001",
      topic: "Project Initiation",
      center: "Mekele",
      date: "2024-08-01",
      direction: "out", // out means sent out, in means received
      file: "project-initiation.pdf",
    },
    {
      documentNumber: "D002",
      topic: "Budget Report",
      center: "Addis",
      date: "2024-08-03",
      direction: "in",
      file: "budget-report.pdf",
    },
    {
      documentNumber: "D003",
      topic: "Annual Review",
      center: "Shewa",
      date: "2024-08-05",
      direction: "out",
      file: "annual-review.pdf",
    },
  ];

  // const [data, setData] = useState(docData);

  const handleAddNewClick = (direction: "out" | "in") => {
    setCurrentDirection(direction);
    setIsModalVisible(true);
  };

    const handleModalOk = () => {
  form.validateFields().then((values) => {
    const formData = new FormData();

    // Append each form field to the FormData object
    formData.append("documentNumber", values.documentNumber);
    formData.append("topic", values.topic);
    formData.append("fromWhom", user?.ObjId || "");
    formData.append("toWhom", selectedEmpId || "");
    formData.append("center", values.center);
    formData.append("date", new Date().toISOString().split("T")[0]);
    formData.append("direction", currentDirection);

    // Append file only if it exists
    if (values.file && values.file.length > 0) {
      formData.append("file", values.file[0].originFileObj);
    }

    // Log the form data for debugging purposes
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    // Assuming you want to send formData to an API endpoint
    createDoc.mutate(formData);

    setIsModalVisible(false);
    form.resetFields();
  });
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

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const columns = [
    {
      title: "Document Number",
      dataIndex: "documentNumber",
      key: "documentNumber",
    },
    { title: "Topic", dataIndex: "topic", key: "topic" },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) => {
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
          return <span>Invalid Date</span>;
        }

        const ethDateTime = EthDateTime.fromEuropeanDate(parsedDate);
        const day = ethDateTime.date;
        const month = ethDateTime.month;
        const year = ethDateTime.year;

        const amharicMonths = [
          "መስከረም",
          "ጥቅምት",
          "ኅዳር",
          "ታኅሳስ",
          "ጥር",
          "የካቲት",
          "መጋቢት",
          "ሚያዝያ",
          "ግንቦት",
          "ሰኔ",
          "ሐምሌ",
          "ነሐሴ",
          "ጳጉሜ",
        ];

        const amharicMonthName = amharicMonths[month - 1];
        const ethiopianDate = `${day} ${amharicMonthName} ${year}`;
        const gregorianDate = moment(date).format("YYYY-MM-DD");

        return (
          <span>
            <div>GC: {gregorianDate}</div>
            <div>EC: {ethiopianDate}</div>
          </span>
        );
      },
    },
    {
      title: currentDirection.toLocaleLowerCase() === "out" ? "To Center/From Center":"",
      dataIndex: "center",
      key: "center",
    },
    {
      title: "File Attachment",
      dataIndex: "file",
      key: "file",
      render: (text: string) => (
        <Button
          icon={<DownloadOutlined />}
          onClick={() =>
            downloadFile(`http://localhost:8000/${text}`, text || "evidence")
          }
        >
          Download
        </Button>
      ),
    },
  ];

  const renderTable = (direction: "out" | "in") => {
    return (
      <Table
        dataSource={docData?.filter(
          (item: { direction: string }) => item.direction === direction
        )}
        columns={columns}
        rowKey="documentNumber"
        pagination={false}
      />
    );
  };

  return (
    <Card title="Document Tracking">
      <Collapse accordion>
        <Panel
          header="Out Documents"
          key="1"
          extra={
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => handleAddNewClick("out")}
            >
              Add New
            </Button>
          }
        >
          {renderTable("out")}
        </Panel>
        <Panel
          header="In Documents"
          key="2"
          extra={
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => handleAddNewClick("in")}
            >
              Add New
            </Button>
          }
        >
          {renderTable("in")}
        </Panel>
      </Collapse>

      <Modal
        title={`Add New Document (${currentDirection.toUpperCase()})`}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="documentNumber"
            label="Document Number"
            rules={[
              { required: true, message: "Please input the document number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="topic"
            label="Topic of the Letter"
            rules={[{ required: true, message: "Please input the topic!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="center"
            label={currentDirection === "out" ? "To Center" : "From Center"}
            rules={[{ required: true, message: `Please select a center!` }]}
          >
            <Select>
              <Option value="Mekele">Mekele</Option>
              <Option value="Addis">Addis</Option>
              <Option value="Shewa">Shewa</Option>
              <Option value="Dire">Dire</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="file"
            label="File Attachment"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            }}
            rules={[{ required: true, message: "Please upload a file!" }]}
          >
            <Upload name="file" beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default DocumentTrackingPage;
