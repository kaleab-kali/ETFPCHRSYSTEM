import React, { useState } from "react";
import EducationInstitutionForm from "./EducationInstitutionForm";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import { InstituteInfo } from "../../../../../shared/types/InstitutionTypes";
import { useAllInsitutions } from "../../../services/queries/institutionQueries";
import { useDeleteInstitution } from "../../../services/mutations/InstitutionMutation";

const ListOfInstitution: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [editRecord, setEditRecord] = useState<any>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
    const allInstitutionsQuery = useAllInsitutions();
    const deleteInstitutionMutation = useDeleteInstitution();
    console.log("All Institutions Query:", allInstitutionsQuery.data);

    const Source = allInstitutionsQuery.data
    ? allInstitutionsQuery.data
        .map((queryResult: InstituteInfo) => {
          return {
            key: queryResult.instituteId,
            instituteId: queryResult.instituteId,
            instituteName: queryResult.instituteName,
            location: queryResult.location,
            
          };
        })
    : [];

    console.log("Source:", Source);
  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleDelete = (key: string) => {
    console.log("Delete Key:", key);
    deleteInstitutionMutation.mutate(key);
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
      title: "instituteId",
      dataIndex: "instituteId",
      key: "instituteId",
    },
    {
      title: "instituteName",
      dataIndex: "instituteName",
      key: "instituteName",
    },
    {
      title: "location",
      dataIndex: "location",
      key: "location",
    },

    {
      title: "Action",
      key: "action",
      render: (text: string, record: InstituteInfo) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          {/* <Button type="dashed" onClick={() => handleDelete(record.sid || "")}>Delete</Button> */}
          <Popconfirm
            title="Are you sure to delete this row?"
            onConfirm={() => handleDelete(record.instituteId || "")}
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
      <EducationInstitutionForm
        initialValues={editRecord}
        visible={editModalVisible}
        onCancel={handleEditCancel}
      />
    </>
  );
};

export default ListOfInstitution;
