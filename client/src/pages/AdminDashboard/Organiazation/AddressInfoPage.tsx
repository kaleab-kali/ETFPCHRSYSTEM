// import React from "react";
// import {
//   Card,
//   Layout,
//   theme,
//   Typography,
//   Breadcrumb,
//   Divider,
//   Flex,
//   Row,
// } from "antd";
// import "../../../styles/Adminside/addressinfo.css";
// import AddAddress from "../../../components/Organization/Address/AddRegion";
// import ListAddressTable from "../../../components/Organization/Address/ListAddressTable";

// const { Content } = Layout;
// const { Title } = Typography;

// const AddressInfoPage = () => {
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();
//   return (
//     <>
//       <Card
//         className="myCard"
//         style={{ padding: "0px 10px", margin: "15px 24px" }}
//       >
//         <Title level={4} style={{ padding: "5px 0px", margin: 0 }}>
//           Address Informations
//         </Title>
//         <Breadcrumb
//           separator=">"
//           items={[
//             {
//               title: "Oraganzation",
//               href: "",
//             },
//             {
//               title: "Department",
//             },
//           ]}
//         />
//       </Card>

//       <Layout>
//         <Content
//           style={{
//             padding: 24,
//             margin: "5px 24px",
//             minHeight: 480,
//             background: colorBgContainer,
//             borderRadius: borderRadiusLG,
//           }}
//         >
//           <Row
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <Title level={5}>Region Information</Title>
//             <AddAddress addressType="Region" />
//           </Row>

//           <Divider />
//           <ListAddressTable />
//           <Row
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <Title level={5}>Subcity Information</Title>
//             <AddAddress addressType="Subcity"/>
//           </Row>
//           <Divider />
//           <ListAddressTable />
//           <Row
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <Title level={5}>woreda Information</Title>
//             <AddAddress addressType="Woreda"/>
//           </Row>
//           <Divider />
//           <ListAddressTable />
//         </Content>
//       </Layout>
//     </>
//   );
// };

// export default AddressInfoPage;


// import React, { useState } from "react";
// import {
//   Card,
//   Layout,
//   Typography,
//   Breadcrumb,
//   Divider,
//   Row,
// } from "antd";
// import "../../../styles/Adminside/addressinfo.css";
// import AddAddress from "../../../components/Organization/Address/AddRegion";
// import ListAddressTable from "../../../components/Organization/Address/ListAddressTable";
// import { RegionInfo, SubcityInfo, WoredaInfo } from "../../../../../shared/types/addressTypes";

// const { Content } = Layout;
// const { Title } = Typography;

// const AddressInfoPage = () => {
//   const [editData, setEditData] = useState<RegionInfo | SubcityInfo | WoredaInfo | null>(null);
//   const [addressType, setAddressType] = useState<string>('');

//   const handleEdit = (type: string, data: RegionInfo | SubcityInfo | WoredaInfo) => {
//     setAddressType(type);
//     setEditData(data);
//   };

//   return (
//     <>
//       <Card
//         className="myCard"
//         style={{ padding: "0px 10px", margin: "15px 24px" }}
//       >
//         <Title level={4} style={{ padding: "5px 0px", margin: 0 }}>
//           Address Informations
//         </Title>
//         <Breadcrumb
//           separator=">"
//           items={[
//             {
//               title: "Organization",
//               href: "",
//             },
//             {
//               title: "Department",
//             },
//           ]}
//         />
//       </Card>

//       <Layout>
//         <Content
//           style={{
//             padding: 24,
//             margin: "5px 24px",
//             minHeight: 480,
//           }}
//         >
//           <Row
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <Title level={5}>Region Information</Title>
//             <AddAddress addressType="Region" initialValues={addressType === "Region" ? editData : undefined} />
//           </Row>
//           <Divider />
//           <ListAddressTable onEdit={(data: RegionInfo) => handleEdit('Region', data)} />
          
//           <Row
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <Title level={5}>Subcity Information</Title>
//             <AddAddress addressType="Subcity" initialValues={addressType === "Subcity" ? editData : undefined} />
//           </Row>
//           <Divider />
//           <ListAddressTable onEdit={(data: SubcityInfo) => handleEdit('Subcity', data)} />
          
//           <Row
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <Title level={5}>Woreda Information</Title>
//             <AddAddress addressType="Woreda" initialValues={addressType === "Woreda" ? editData : undefined} />
//           </Row>
//           <Divider />
//           <ListAddressTable onEdit={(data: WoredaInfo) => handleEdit('Woreda', data)} />
//         </Content>
//       </Layout>
//     </>
//   );
// };

// export default AddressInfoPage;

import React from "react";
import { Card, Layout, Typography, Breadcrumb, Divider, Row } from "antd";
import "../../../styles/Adminside/addressinfo.css";
import AddAddress from "../../../components/Organization/Address/AddRegion";
import ListAddressTable from "../../../components/Organization/Address/ListAddressTable";

const { Content } = Layout;
const { Title } = Typography;

const AddressInfoPage = () => {
  return (
    <>
      <Card
        className="myCard"
        style={{ padding: "0px 10px", margin: "15px 24px" }}
      >
        <Title level={4} style={{ padding: "5px 0px", margin: 0 }}>
          Address Information
        </Title>
        <Breadcrumb separator=">" items={[{ title: "Organization" }, { title: "Department" }]} />
      </Card>

      <Layout>
        <Content style={{ padding: 24, margin: "5px 24px", minHeight: 480 }}>
          <Row justify="space-between" align="middle">
            <Title level={5}>Region Information</Title>
            <AddAddress addressType="Region" />
          </Row>
          <Divider />
          <ListAddressTable addressType="Region" />
          
          <Row justify="space-between" align="middle">
            <Title level={5}>Subcity Information</Title>
            <AddAddress addressType="Subcity" />
          </Row>
          <Divider />
          <ListAddressTable addressType="Subcity" />

          <Row justify="space-between" align="middle">
            <Title level={5}>Woreda Information</Title>
            <AddAddress addressType="Woreda" />
          </Row>
          <Divider />
          <ListAddressTable addressType="Woreda" />
        </Content>
      </Layout>
    </>
  );
};

export default AddressInfoPage;
