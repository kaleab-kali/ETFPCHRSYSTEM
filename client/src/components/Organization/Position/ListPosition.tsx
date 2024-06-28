import React, { useState } from "react";
import PositionForm from "./PositionForm";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import { PositionInfo } from "../../../../../shared/types/positionTypes";
import { useAllPositions } from "../../../services/queries/positionQueries";
import { useDeletePosition, useUpdatePosition, useCreatePosition } from "../../../services/mutations/positionMutation";

const ListPosition = () => {
  const [searchValue, setSearchValue] = useState("");
  const [editRecord, setEditRecord] = useState<any>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
    const allPositionsQuery = useAllPositions();
    const deletePositionMutation = useDeletePosition();
    console.log("All Positions Query:", allPositionsQuery.data);

    const Source = allPositionsQuery.data
    ? allPositionsQuery.data
        .map((queryResult: PositionInfo) => {
          return {
           key: queryResult._id,
           posId: queryResult.posId,
            posName: queryResult.posName,
          };
        })
    : [];

    console.log("Source:", Source);
  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleDelete = (key: string) => {
    console.log("Delete Key:", key);
    deletePositionMutation.mutate(key);
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
      title: "posId",
      dataIndex: "posId",
      key: "posId",
    },
    {
      title: "posName",
      dataIndex: "posName",
      key: "posName",
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: PositionInfo) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          {/* <Button type="dashed" onClick={() => handleDelete(record.sid || "")}>Delete</Button> */}
          <Popconfirm
            title="Are you sure to delete this row?"
            onConfirm={() => handleDelete(record.posId || "")}
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
      <PositionForm
        initialValues={editRecord}
        visible={editModalVisible}
        onCancel={handleEditCancel}
      />
    </>
  );
}

export default ListPosition