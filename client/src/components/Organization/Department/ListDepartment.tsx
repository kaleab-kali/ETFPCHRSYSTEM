import React, { useState } from "react";
import DepartmentForm from "./DepartmentForm";
import { Input, Table, Button, Space, Popconfirm } from "antd";
import { DepartmentInfo } from "../../../../../shared/types/departmentTypes";
import { useAllDepartments } from "../../../services/queries/departmentQueries";
import {
  useDeleteDepartment,
} from "../../../services/mutations/DepartmentMutationFixed";

const ListDepartment = () => {
  const [searchValue, setSearchValue] = useState("");
  const [editRecord, setEditRecord] = useState<any>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const allDepartmentsQuery = useAllDepartments();
  const deleteDepartmentMutation = useDeleteDepartment();
  console.log("All Departments Query:", allDepartmentsQuery.data);

  const Source = allDepartmentsQuery.data
    ? allDepartmentsQuery.data.map((queryResult: DepartmentInfo) => {
        return {
          key: queryResult.departmentID,
          departmentID: queryResult.departmentID,
          departmentName: queryResult.departmentName,
          departmentHead: queryResult.departmentHead,
        };
      })
    : [];

  //   console.log("Source:", Source);
  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleDelete = (key: string) => {
    console.log("Delete Key:", key);
    deleteDepartmentMutation.mutate(key);
    // const filteredDataSource = dataSource.filter(item => item.key !== key);
    // setDataSource(filteredDataSource);
  };
  const handleEdit = (record: any) => {
    console.log("Edit Record:", record);
    setEditRecord(record);
    setEditModalVisible(true);
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
    setEditRecord(null);
  };

  const columns = [
    {
      title: "departmentID",
      dataIndex: "departmentID",
      key: "departmentID",
    },
    {
      title: "departmentName",
      dataIndex: "departmentName",
      key: "departmentName",
    },
    {
      title: "departmentHead",
      dataIndex: "departmentHead",
      key: "departmentHead",
      render: (text: string) => (text && text !== "undefined" ? text : "N/A"),
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: DepartmentInfo) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          {/* <Button type="dashed" onClick={() => handleDelete(record.sid || "")}>Delete</Button> */}
          <Popconfirm
            title="Are you sure to delete this row?"
            onConfirm={() => handleDelete(record.departmentID || "")}
            okText="Yes"
            cancelText="No"
          >
            <Button type="dashed">Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Input
        style={{ marginBottom: 10, float: "right", width: 200 }}
        placeholder="Search Name"
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Table columns={columns} dataSource={Source} />
      <DepartmentForm
        initialValues={editRecord}
        visible={editModalVisible}
        onCancel={handleEditCancel}
      />
    </>
  );
};

export default ListDepartment;
