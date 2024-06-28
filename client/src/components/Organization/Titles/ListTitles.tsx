import React, { useState } from "react";
import TitleForm from "./TitlesForm";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import { TitleInfo } from "../../../../../shared/types/titlesTypes";
import { useAllTitles } from "../../../services/queries/titleQueries";
import { useDeleteTitle } from "../../../services/mutations/titleMutation";

const ListTitles = () => {
  const [searchValue, setSearchValue] = useState("");
  const [editRecord, setEditRecord] = useState<any>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const allTitlesQuery = useAllTitles();
  const deleteTitleMutation = useDeleteTitle();
  console.log("All Titles Query:", allTitlesQuery.data);

  const Source = allTitlesQuery.data
    ? allTitlesQuery.data.map((queryResult: TitleInfo) => {
        return {
          key: queryResult.titleId,
          titleId: queryResult.titleId,
          titleName: queryResult.titleName,
        };
      })
    : [];

  //   console.log("Source:", Source);
  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleDelete = (key: string) => {
    console.log("Delete Key:", key);
    deleteTitleMutation.mutate(key);
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
      titleId: "D001",
      titleName: "Human Resources",
    },
    {
      titleId: "D002",
      titleName: "Finance",
    },
    {
      titleId: "D003",
      titleName: "Engineering",
    },
    {
      titleId: "D004",
      titleName: "Marketing",
    },
    {
      titleId: "D005",
      titleName: "Sales",
    },
  ];

  const columns = [
    {
      title: "titleId",
      dataIndex: "titleId",
      key: "titleId",
    },
    {
      title: "titleName",
      dataIndex: "titleName",
      key: "titleName",
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: TitleInfo) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          {/* <Button type="dashed" onClick={() => handleDelete(record.sid || "")}>Delete</Button> */}
          <Popconfirm
            title="Are you sure to delete this row?"
            onConfirm={() => handleDelete(record.titleId || "")}
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
      <TitleForm
        initialValues={editRecord}
        visible={editModalVisible}
        onCancel={handleEditCancel}
      />
    </>
  );
};

export default ListTitles;
