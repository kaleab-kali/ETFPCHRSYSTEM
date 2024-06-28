// import React from 'react';
// import { Table, Button } from 'antd';

// interface DataType {
//   key: React.Key;
//   id: number;
//   regionName: string;
//   regionAbbr: string;
// }

// const ListAddressTable = () => {
//   const data: DataType[] = [
//     {
//       key: '1',
//       id: 1,
//       regionName: 'Region 1',
//       regionAbbr: 'R1',
//     },
//     {
//       key: '2',
//       id: 2,
//       regionName: 'Region 2',
//       regionAbbr: 'R2',
//     },
//     // more data...
//   ];

//   const columns = [
//     {
//       title: 'ID',
//       dataIndex: 'id',
//       key: 'id',
//     },
//     {
//       title: 'Region Name',
//       dataIndex: 'regionName',
//       key: 'regionName',
//     },
//     {
//       title: 'Region Abbreviation',
//       dataIndex: 'regionAbbr',
//       key: 'regionAbbr',
//     },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (_: any, record: DataType) => (
//         <span>
//           <Button type="link">Edit</Button>
//           <Button type="link" danger>
//             Delete
//           </Button>
//         </span>
//       ),
//     },
//   ];

//   return <Table columns={columns} dataSource={data} />;
// };

// export default ListAddressTable;
//==============================================================test
// import React, { useState } from "react";
// import { Table, Button, Space, Popconfirm, Modal } from "antd";
// import { RegionInfo, SubcityInfo, WoredaInfo } from "../../../../../shared/types/addressTypes";
// import AddressForm from "./AddressForm";

// interface ListAddressTableProps {
//   data: RegionInfo[] | SubcityInfo[] | WoredaInfo[]; // Data type based on address type
//   onEdit: (record: RegionInfo | SubcityInfo | WoredaInfo) => void; // Callback for edit action
//   addressType: string; // Address type (Region, Subcity, Woreda)
// }

// const ListAddressTable: React.FC<ListAddressTableProps> = ({ data, onEdit,  addressType }) => {
//   const [editRecord, setEditRecord] = useState<any>(null);
//   const [editModalVisible, setEditModalVisible] = useState(false);

//   const handleEdit = (record: RegionInfo | SubcityInfo | WoredaInfo) => {
//     setEditRecord(record);
//     setEditModalVisible(true);
//   };

//   const handleEditCancel = () => {
//     setEditModalVisible(false);
//     setEditRecord(null); // Clear edit record after modal is closed
//   };

//   const columns = [
//     {
//       title: "ID",
//       dataIndex: "id",
//       key: "id",
//     },
//     {
//       title: `${addressType} Name`,
//       dataIndex: `${addressType.toLowerCase()}Name`,
//       key: `${addressType.toLowerCase()}Name`,
//     },
//     {
//       title: `${addressType} Abbreviation`,
//       dataIndex: `${addressType.toLowerCase()}Abbr`,
//       key: `${addressType.toLowerCase()}Abbr`,
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (_: any, record: RegionInfo | SubcityInfo | WoredaInfo) => (
//         <Space size="middle">
//           <Button type="primary" onClick={() => handleEdit(record)}>
//             Edit
//           </Button>
//           <Popconfirm
//             title="Are you sure to delete this row?"
//             onConfirm={() => onDelete(record.key.toString())}
//             okText="Yes"
//             cancelText="No"
//           >
//             <Button type="dashed">Delete</Button>
//           </Popconfirm>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <>
//       <Table columns={columns} dataSource={data} />
//       <Modal
//         title={editRecord ? `Edit ${addressType}` : `Add ${addressType}`}
//         visible={editModalVisible}
//         onCancel={handleEditCancel}
//         footer={null}
//       >
//         <AddressForm
//           initialValues={editRecord}
//           visible={editModalVisible}
//           onCancel={handleEditCancel}
//           addressType={addressType}
//         />
//       </Modal>
//     </>
//   );
// };

// export default ListAddressTable;


import React, { useState } from "react";
import { Table, Button, Modal } from "antd";
import { RegionInfo, SubcityInfo, WoredaInfo } from "../../../../../shared/types/addressTypes";
import AddressForm from "./AddressForm";

interface ListAddressTableProps {
  addressType: string; // Address type (Region, Subcity, Woreda)
}

const ListAddressTable: React.FC<ListAddressTableProps> = ({ addressType }) => {
  const [editRecord, setEditRecord] = useState<any>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);

  // Mock data, replace with actual API call
  const data: (RegionInfo | SubcityInfo | WoredaInfo)[] = [
    {
      id: '1',
      ...(addressType === 'Region' ? { regionID: 'R1', regionName: 'Region 1', regionShort: 'R1' } : {}),
      ...(addressType === 'Subcity' ? { subcityName: 'Subcity 1', subcityShort: 'S1' } : {}),
      ...(addressType === 'Woreda' ? { woredaName: 'Woreda 1', woredaShort: 'W1' } : {}),
    } as RegionInfo | SubcityInfo | WoredaInfo,
    {
      id: '2',
      ...(addressType === 'Region' ? { regionName: 'Region 2', regionShort: 'R2' } : {}),
      ...(addressType === 'Subcity' ? { subcityName: 'Subcity 2', subcityShort: 'S2' } : {}),
      ...(addressType === 'Woreda' ? { woredaName: 'Woreda 2', woredaShort: 'W2' } : {}),
    } as RegionInfo | SubcityInfo | WoredaInfo,
    // Add more mock data for different address types if needed
  ];
  
  
  
  

  const handleEdit = (record: RegionInfo | SubcityInfo | WoredaInfo) => {
    setEditRecord(record);
    setEditModalVisible(true);
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
    setEditRecord(null); // Clear edit record after modal is closed
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: `${addressType} Name`,
      dataIndex: `${addressType.toLowerCase()}Name`,
      key: `${addressType.toLowerCase()}Name`,
    },
    {
      title: `${addressType} Abbreviation`,
      dataIndex: `${addressType.toLowerCase()}Short`,
      key: `${addressType.toLowerCase()}Short`,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: RegionInfo | SubcityInfo | WoredaInfo) => (
        <Button type="primary" onClick={() => handleEdit(record)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} />
      
        <AddressForm
          initialValues={editRecord}
          visible={editModalVisible}
          onCancel={handleEditCancel}
          addressType={addressType}
        />
     
    </>
  );
};

export default ListAddressTable;
