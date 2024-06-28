import React, { useState } from "react";
import EthnicityForm from "./EthnicityForm";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import { EthnicityInfo } from "../../../../../shared/types/ethnicity";

const ListEthincity = () => {
  const [searchValue, setSearchValue] = useState("");
  const [editRecord, setEditRecord] = useState<any>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  //   const allDepartmentsQuery = useAllDepartments();
  //   const deleteDepartmentMutation = useDeleteDepartment();
  //   console.log("All Departments Query:", allDepartmentsQuery.data);

  //   const Source = allDepartmentsQuery.data
  //   ? allDepartmentsQuery.data
  //       .map((queryResult: DepartmentInfo) => {
  //         return {
  //           key: queryResult.departmentID,
  //             departmentID: queryResult.departmentID,
  //             instituteName: queryResult.instituteName,
  //             departmentHead: queryResult.departmentHead,
  //             staffNumber: queryResult.staffNumber,
  //             managers: queryResult.managers,
  //         };
  //       })
  //   : [];

  //   console.log("Source:", Source);
  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleDelete = (key: string) => {
    console.log("Delete Key:", key);
    // deleteDepartmentMutation.mutate(key);
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
  const data = [
    {
      ethnicityId: "D001",
      ethnicityName: "Human Resources",
    },
    {
      ethnicityId: "D002",
      ethnicityName: "Finance",
    },
    {
      ethnicityId: "D003",
      ethnicityName: "Engineering",
    },
    {
      ethnicityId: "D004",
      ethnicityName: "Marketing",
    },
    {
      ethnicityId: "D005",
      ethnicityName: "Sales",
    },
  ];

  const columns = [
    {
      title: "ethnicityId",
      dataIndex: "ethnicityId",
      key: "ethnicityId",
    },
    {
      title: "ethnicityName",
      dataIndex: "ethnicityName",
      key: "ethnicityName",
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: EthnicityInfo) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          {/* <Button type="dashed" onClick={() => handleDelete(record.sid || "")}>Delete</Button> */}
          <Popconfirm
            title="Are you sure to delete this row?"
            onConfirm={() => handleDelete(record.ethnicityId || "")}
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
      <Table columns={columns} dataSource={data} />
      <EthnicityForm
        initialValues={editRecord}
        visible={editModalVisible}
        onCancel={handleEditCancel}
      />
    </>
  );
};

export default ListEthincity;
