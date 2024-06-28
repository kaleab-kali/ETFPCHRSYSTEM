import React, { useState } from "react";
import {
  Table,
  Input,
  Select,
  Space,
  Button,
  Modal,
  Form,
  message,
  Upload,
} from "antd";
import { ColumnsType } from "antd/es/table";
import {
  useAllStaff,
  useStaff,
} from "../../services/queries/staffQueries";
import { useAuth } from "../../context/AuthContext";
import { UploadOutlined } from "@ant-design/icons";
import { useUpdateStaff } from "../../services/mutations/staffMutation";

const { Search } = Input;
const { Option } = Select;

interface StaffData {
  _id: string;
  firstName: string;
  lastName: string;
  role: string;
  employmentDate: string;
  phoneNumber: string;
  photo: string;
}

const StaffTable: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredRole, setFilteredRole] = useState("");
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<StaffData | null>(null);
  const { user } = useAuth();
  const [form] = Form.useForm();
  const updateStaff = useUpdateStaff();

  const allStaffData = useAllStaff();
  const staffData = useStaff();

  const data =
    user?.role === "admin"
      ? allStaffData.data
      : user?.role === "hrmanager"
      ? staffData.data
      : '';
  const safeData = Array.isArray(data) ? data : []; // Ensure safeData is an array

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleRoleFilterChange = (value: string) => {
    setFilteredRole(value);
  };

  const filteredData = safeData.filter(
    (item: { firstName: string; lastName: string; role: string }) => {
      const matchesSearchText =
        item.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
        item.lastName.toLowerCase().includes(searchText.toLowerCase());

      const matchesRole = filteredRole ? item.role === filteredRole : true;

      return matchesSearchText && matchesRole;
    }
  );

  const handleEdit = (record: StaffData) => {
    setEditingRecord(record);
    form.setFieldsValue({
      ...record,
      photo: record.photo
        ? [
            {
              uid: "-1",
              name: record.photo,
              status: "done",
              url: `http://localhost:7000/${record.photo}`,
            },
          ]
        : [],
    });
    setIsEditModalVisible(true);
  };

  const handleDelete = (record: StaffData) => {
    setEditingRecord(record);
    setIsDeleteConfirmVisible(true);
  };

  const handleEditOk = async () => {
    try {
      const values = await form.validateFields();

      console.log("Form values:", values); // Log form values

      const formData = new FormData();
      if (editingRecord) {
        formData.append("id", editingRecord._id); // Append the object ID
      }
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("role", values.role);
      formData.append("employmentDate", values.employmentDate);
      formData.append("phoneNumber", values.phoneNumber);

      if (values.photo && values.photo[0]) {
        formData.append("photo", values.photo[0].originFileObj);
      }

      // Log the FormData contents
      // for (let [key, value] of formData.entries()) {
      //   console.log(`${key}: ${value}`);
      // }
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      Modal.confirm({
        title: "Are you sure you want to save the changes?",
        onOk: () => {
          updateStaff.mutate(formData);
          // message.success("Changes saved");
          setIsEditModalVisible(false);
        },
      });
    } catch (error) {
      console.log("Validate Failed:", error);
    }
  };


  const handleDeleteConfirm = () => {
    Modal.confirm({
      title: "This action is not reversible. Are you sure you want to delete?",
      onOk: () => {
        // message.success("Record deleted");
        setIsDeleteConfirmVisible(false);
        // Implement delete logic here
      },
      onCancel: () => {
        setIsDeleteConfirmVisible(false);
      },
    });
  };

  const columns: ColumnsType<StaffData> = [
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (text) => (
        <img
          src={`http://localhost:8000/${text}`}
          alt="staff"
          style={{ width: 50, height: 50 }}
        />
      ),
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Employment Date",
      dataIndex: "employmentDate",
      key: "employmentDate",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
  ];

  if (user?.role === "admin") {
    columns.push({
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
        </Space>
      ),
    });
  }

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Search by name"
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 200 }}
        />
        <Select
          placeholder="Filter by role"
          onChange={handleRoleFilterChange}
          allowClear
          style={{ width: 200 }}
        >
          <Option value="hrmanager">HR Manager</Option>
          <Option value="staff">Staff</Option>
        </Select>
      </Space>
      <Table columns={columns} dataSource={filteredData} />

      {/* Edit Modal */}
      <Modal
        title="Edit Staff"
        visible={isEditModalVisible}
        onOk={handleEditOk}
        onCancel={() => setIsEditModalVisible(false)}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: "Please enter first name" }]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: "Please enter last name" }]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select role" }]}
          >
            <Select placeholder="Select Role">
              <Option value="hrmanager">HR Manager</Option>
              <Option value="staff">Staff</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="employmentDate"
            label="Employment Date"
            rules={[
              { required: true, message: "Please select the employment date" },
            ]}
          >
            <Input placeholder="Employment Date" />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[{ required: true, message: "Please enter phone number" }]}
          >
            <Input placeholder="Phone Number" />
          </Form.Item>
          <Form.Item
            name="photo"
            label="Photo"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
            rules={[{ required: true, message: "Please upload a photo" }]}
          >
            <Upload name="photo" listType="picture" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal
        title="Confirm Delete"
        visible={isDeleteConfirmVisible}
        onOk={handleDeleteConfirm}
        onCancel={() => setIsDeleteConfirmVisible(false)}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>
          Are you sure you want to delete this record? This action is not
          reversible.
        </p>
      </Modal>
    </div>
  );
};

export default StaffTable;
