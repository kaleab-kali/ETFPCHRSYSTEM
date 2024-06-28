import React, { useState } from "react";
import LeaveTypeForm from "./LeaveTypeForm";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import { LeaveTypeInfo } from "../../../../../shared/types/leaveTypes";
import { useAllleaveTypes } from "../../../services/queries/leaveTypeQueries";
import { useDeleteLeaveType } from "../../../services/mutations/LeaveTypeMutation";

const ListLeaveType = () => {
  const [searchValue, setSearchValue] = useState("");
  const [editRecord, setEditRecord] = useState<any>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const allLeaveTypeQuery = useAllleaveTypes();
  const deleteLeaveTypeMutation = useDeleteLeaveType();
  console.log("All LeaveType Query:", allLeaveTypeQuery.data);

  const Source = allLeaveTypeQuery.data
    ? allLeaveTypeQuery.data.map((queryResult: LeaveTypeInfo) => {
        return {
          key: queryResult._id,
          leaveType: queryResult.leaveType,
          credit: queryResult.credit,
          _id: queryResult._id,
        };
      })
    : [];

  //   console.log("Source:", Source);
  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleDelete = (key: string) => {
    console.log("Delete Key:", key);
    deleteLeaveTypeMutation.mutate(key);
    // const filteredDataSource = dataSource.filter(item => item.key !== key);
    // setDataSource(filteredDataSource);
  };
  const handleEdit = (record: LeaveTypeInfo) => {
    console.log("Edit Record:", record);
    setEditRecord(record);
    setEditModalVisible(true);
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
    setEditRecord(null);
  };
  const data = [
    {
      leaveType: "D001",
      credit: "Human Resources",
    },
    {
      leaveType: "D002",
      credit: "Finance",
    },
    {
      leaveType: "D003",
      credit: "Engineering",
    },
    {
      leaveType: "D004",
      credit: "Marketing",
    },
    {
      leaveType: "D005",
      credit: "Sales",
    },
  ];

  const columns = [
    {
      title: "leaveType",
      dataIndex: "leaveType",
      key: "leaveType",
    },
    {
      title: "credit",
      dataIndex: "credit",
      key: "credit",
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: LeaveTypeInfo) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          {/* <Button type="dashed" onClick={() => handleDelete(record.sid || "")}>Delete</Button> */}
          <Popconfirm
            title="Are you sure to delete this row?"
            onConfirm={() => handleDelete(record.leaveType || "")}
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
      <LeaveTypeForm
        initialValues={editRecord}
        visible={editModalVisible}
        onCancel={handleEditCancel}
      />
    </>
  );
};

export default ListLeaveType;
