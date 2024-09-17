import Title from "antd/es/typography/Title";
import React, { useState } from "react";
import { NavLink, Route, Routes, useParams } from "react-router-dom";
import { Card, Menu, Button, Dropdown } from "antd";
import Item from "antd/es/descriptions/Item";
import "../../styles/EmployeeDetailedProfilePage.css";
import PersonCard from "./PersonCard";
import { Content } from "antd/es/layout/layout";
import { useFindEmployeeById } from "../../services/queries/employeeQueries";

import InformationGeneral from "./Tabs/InformationGeneral";
import EducationTab from "./Tabs/EducationTab";
import LeaveHistory from "./Tabs/LeaveHistory";
import { LeaveInfo } from "../../../../shared/types/leaveTypes";
import AttendanceTable from "./Tabs/AttendanceTableTab";
import PerformanceTable from "./Tabs/PerformnaceTab";
import LeaveHistoryTab from "./Tabs/LeaveHistoryTab";
import AppraisalTab from "./Tabs/AppraisalTab";
import DiscplineTab from "./Tabs/DisciplineTab";
import DisciplineTab from "./Tabs/DisciplineTab";
import HealthTab from "./Tabs/HealthTab";
import DocumentTrackingPage from "./Tabs/DocumentTrackingPage";
import EthiopianDatePicker from "./Tabs/Dateddf";
import { DownloadOutlined } from "@ant-design/icons";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import ReactPDF from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);
interface EmployeeLeave {
  leave: LeaveInfo;
}
interface ProfileParams {
  id: string;
}

const EmployeeDetailedProfilePage = () => {
  const { id } = useParams() as unknown as ProfileParams;
  const { data: selectedEmployee, error, isLoading } = useFindEmployeeById(id);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  // const employee = selectedEmployee.find((employee) => employee.key === id);
  const employeeLeave = selectedEmployee;
  if (!selectedEmployee) {
    return <div>Employee not found</div>;
  }
  if (isLoading) {
    return <div>...Loading</div>;
  }
  console.log(selectedEmployee);

  const menu = (
    <Menu>
      <Menu.Item key="downloadFull">
      <PDFDownloadLink
          document={<MyDocument />}
          fileName={`${selectedEmployee.firstName}.pdf`}
        >
          {({ blob, url, loading, error }) =>
            loading ? (
              "Loading document..."
            ) : (
              <Button type="text" icon={<DownloadOutlined />}>
                Download Full profile
              </Button>
            )
          }
        </PDFDownloadLink>
      </Menu.Item>
      <Menu.Item key="downloadRegistration">
        <PDFDownloadLink
          document={<MyDocument />}
          fileName={`${selectedEmployee.firstName}.pdf`}
        >
          {({ blob, url, loading, error }) =>
            loading ? (
              "Loading document..."
            ) : (
              <Button type="text" icon={<DownloadOutlined />}>
                Download Registration profile
              </Button>
            )
          }
        </PDFDownloadLink>
      </Menu.Item>
    </Menu>
  );

  return (
    <div style={{}}>
      <div
        style={{
          position: "sticky",
          top: "70px",
          zIndex: 2,
          backgroundColor: "#f5f5f5",
          boxShadow: "0 -10px 3px -3px #f5f5f5",
          paddingBottom: "2px",
        }}
      >
        <div className="flex justify-between items-center">
          <Title level={4} style={{ padding: "10px 50px" }}>
            Employee Profile
          </Title>
          <Dropdown
            overlay={menu}
            trigger={["click"]}
            visible={dropdownVisible}
            onVisibleChange={setDropdownVisible}
          >
            <Button
              type="text"
              className="text-gray-500"
              icon={<BsThreeDotsVertical size={20} />}
            />
          </Dropdown>
        </div>

        <div className="horizontalMenu">
          <Menu
            mode="horizontal"
            style={{ background: "transparent", borderBottom: "none" }}
          >
            <Item key="general">
              <NavLink
                to={`/employee/view/${id}/general`}
                className="link"
                style={{ color: "grey", paddingRight: "30px" }}
              >
                General
              </NavLink>
            </Item>
            <Item key="education">
              <NavLink
                className="link"
                to={`/employee/view/${id}/education`}
                style={{ color: "grey", paddingRight: "30px" }}
              >
                Education
              </NavLink>
            </Item>
            {/* <Item key="document">
            <NavLink
              to={`/employee/view/${id}/document`}
              style={{ color: "grey", paddingRight: "30px" }}
            >
              Document
            </NavLink>
          </Item> */}
            <Item key="leave">
              <NavLink
                className="link"
                to={`/employee/view/${id}/leave`}
                style={{ color: "grey", paddingRight: "30px" }}
              >
                Leave
              </NavLink>
            </Item>
            <Item key="attendance">
              <NavLink
                className="link"
                to={`/employee/view/${id}/attendance`}
                style={{ color: "grey", paddingRight: "30px" }}
              >
                Attendance
              </NavLink>
            </Item>
            <Item key="performance">
              <NavLink
                className="link"
                to={`/employee/view/${id}/performance`}
                style={{ color: "grey", padding: "0 10px" }}
              >
                Performance
              </NavLink>
            </Item>
            <Item key="apprasial">
              <NavLink
                className="link"
                to={`/employee/view/${id}/apprasial`}
                style={{ color: "grey", padding: "0 10px" }}
              >
                Apprasial
              </NavLink>
            </Item>
            <Item key="discipline">
              <NavLink
                className="link"
                to={`/employee/view/${id}/discipline`}
                style={{ color: "grey", padding: "0 10px" }}
              >
                Discipline
              </NavLink>
            </Item>
            <Item key="documentTracking">
              <NavLink
                className="link"
                to={`/employee/view/${id}/documentTracking`}
                style={{ color: "grey", padding: "0 10px" }}
              >
                Document
              </NavLink>
            </Item>

            <Item key="health">
              <NavLink
                className="link"
                to={`/employee/view/${id}/health`}
                style={{ color: "grey", padding: "0 10px" }}
              >
                Health
              </NavLink>
            </Item>
            <Item key="warranty">
              <NavLink
                className="link"
                to={`/employee/view/${id}/warrenty`}
                style={{ color: "grey", padding: "0 10px" }}
              >
                Warranty
              </NavLink>
            </Item>
          </Menu>
        </div>
      </div>

      <div className="personCard">
        <PersonCard
          empId={selectedEmployee?.empId}
          firstName={selectedEmployee.firstName}
          lastName={selectedEmployee.lastName}
          status="Active"
          position={selectedEmployee.position}
          email={selectedEmployee.email}
          address={selectedEmployee}
          number={selectedEmployee.phoneNumber.number}
          photo={selectedEmployee?.photo}
          avatar="sda"
          role={selectedEmployee?.role}
          manager={selectedEmployee?.manager}
          title={selectedEmployee?.title}
        />
        <Content
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <Routes>
            <Route
              path="/"
              element={
                <InformationGeneral selectedEmployee={selectedEmployee} />
              }
            />
            <Route
              path="/general"
              element={
                <InformationGeneral selectedEmployee={selectedEmployee} />
              }
            />
            <Route
              path="/education"
              element={<EducationTab selectedEmployee={selectedEmployee} />}
            />
            <Route path="/document" element={<InformationGeneral />} />
            <Route
              path="/leave"
              element={<LeaveHistory selectedEmployee={employeeLeave} />}
            />
            <Route
              path="/attendance"
              element={<AttendanceTable selectedEmployee={selectedEmployee} />}
            />
            <Route
              path="/performance"
              element={<PerformanceTable selectedEmployee={selectedEmployee} />}
            />
            <Route
              path="/apprasial"
              element={<AppraisalTab selectedEmployee={selectedEmployee} />}
            />
            <Route
              path="/discipline"
              element={<DisciplineTab selectedEmployee={selectedEmployee} />}
            />
            <Route
              path="/health"
              element={<HealthTab selectedEmployee={selectedEmployee} />}
            />
            <Route
              path="/documentTracking"
              element={
                <DocumentTrackingPage selectedEmpId={selectedEmployee.empId} />
              }
            />
            {/* <Route path="/cal" element={<EthiopianDatePicker />} /> */}
          </Routes>
        </Content>
      </div>
    </div>
  );
};

export default EmployeeDetailedProfilePage;

// =====================================================================
// import Title from "antd/es/typography/Title";
// import React, { useState } from "react";
// import { NavLink, Route, Routes, useParams } from "react-router-dom";
// import { Card, Menu, Dropdown, Button, Spin } from "antd";
// import Item from "antd/es/descriptions/Item";
// import "../../styles/EmployeeDetailedProfilePage.css";
// import PersonCard from "./PersonCard";
// import { Content } from "antd/es/layout/layout";
// import { useFindEmployeeById } from "../../services/queries/employeeQueries";
// import InformationGeneral from "./Tabs/InformationGeneral";
// import EducationTab from "./Tabs/EducationTab";
// import LeaveHistory from "./Tabs/LeaveHistory";
// import AttendanceTable from "./Tabs/AttendanceTableTab";
// import PerformanceTable from "./Tabs/PerformnaceTab";
// import LeaveHistoryTab from "./Tabs/LeaveHistoryTab";
// import AppraisalTab from "./Tabs/AppraisalTab";
// import DisciplineTab from "./Tabs/DisciplineTab";
// import HealthTab from "./Tabs/HealthTab";
// import DocumentTrackingPage from "./Tabs/DocumentTrackingPage";
// import { LeaveInfo } from "../../../../shared/types/leaveTypes";
// import { BsThreeDotsVertical } from "react-icons/bs"; // Triple dot icon
// import { DownloadOutlined } from "@ant-design/icons"; // Download icon

// interface EmployeeLeave {
//   leave: LeaveInfo;
// }

// interface ProfileParams {
//   id: string;
// }

// const EmployeeDetailedProfilePage: React.FC = () => {
//   const { id } = useParams() as unknown as ProfileParams;
//   const { data: selectedEmployee, error, isLoading } = useFindEmployeeById(id);
//   const [dropdownVisible, setDropdownVisible] = useState(false);

//   if (!selectedEmployee) {
//     return <div className="text-center text-gray-500">Employee not found</div>;
//   }
//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Spin size="large" />
//       </div>
//     );
//   }

//   // Dropdown content
//   const menu = (
//     <Menu>
//       <Menu.Item key="downloadFull">
//         <Button type="text" icon={<DownloadOutlined />}>
//           Download Full Profile
//         </Button>
//       </Menu.Item>
//       <Menu.Item key="downloadRegistration">
//         <Button type="text" icon={<DownloadOutlined />}>
//           Download Registration Profile
//         </Button>
//       </Menu.Item>
//     </Menu>
//   );

//   return (
//     <div className=" bg-gray-100">
//       {/* Header */}
//       <div className=" sticky top-[100px] z-20 bg-white shadow-md py-2 px-8 flex justify-between items-center rounded-tl-3xl rounded-tr-3xl">
//         <Title level={4} className="m-0">
//           Employee Profile
//         </Title>
//         {/* Triple dot button */}
//         <Dropdown
//           overlay={menu}
//           trigger={["click"]}
//           visible={dropdownVisible}
//           onVisibleChange={setDropdownVisible}
//         >
//           <Button
//             type="text"
//             className="text-gray-500"
//             icon={<BsThreeDotsVertical size={20} />}
//           />
//         </Dropdown>
//       </div>

//       {/* Navigation Tabs */}
//       <div className="sticky top-[155px] z-19 bg-white shadow-sm">
//         <Menu mode="horizontal" className="flex justify-start px-8">
//           <Item key="general">
//             <NavLink
//               to={`/employee/view/${id}/general`}
//               className="text-gray-600 px-4"
//             >
//               General
//             </NavLink>
//           </Item>
//           <Item key="education">
//             <NavLink
//               to={`/employee/view/${id}/education`}
//               className="text-gray-600 px-4"
//             >
//               Education
//             </NavLink>
//           </Item>
//           <Item key="leave">
//             <NavLink to={`/employee/view/${id}/leave`} className="text-gray-600 px-4">
//               Leave
//             </NavLink>
//           </Item>
//           <Item key="attendance">
//             <NavLink to={`/employee/view/${id}/attendance`} className="text-gray-600 px-4">
//               Attendance
//             </NavLink>
//           </Item>
//           <Item key="performance">
//             <NavLink to={`/employee/view/${id}/performance`} className="text-gray-600 px-4">
//               Performance
//             </NavLink>
//           </Item>
//           <Item key="appraisal">
//             <NavLink to={`/employee/view/${id}/appraisal`} className="text-gray-600 px-4">
//               Appraisal
//             </NavLink>
//           </Item>
//           <Item key="discipline">
//             <NavLink to={`/employee/view/${id}/discipline`} className="text-gray-600 px-4">
//               Discipline
//             </NavLink>
//           </Item>
//           <Item key="documentTracking">
//             <NavLink to={`/employee/view/${id}/documentTracking`} className="text-gray-600 px-4">
//               Document
//             </NavLink>
//           </Item>
//           <Item key="health">
//             <NavLink to={`/employee/view/${id}/health`} className="text-gray-600 px-4">
//               Health
//             </NavLink>
//           </Item>
//         </Menu>
//       </div>

//       {/* Employee Details Section */}
//       {/* Main content layout with flex */}
//       {/* <div className="flex flex-col lg:flex-row h-[calc(100vh-300px)]  "> */}
//       <div className="sticky top-[175px] flex flex-col lg:flex-row py-10">
//         {/* Left: PersonCard */}
//         {/* <div className="lg:w-1/4 lg:sticky top-[300px] "> */}
//         <div className="lg:w-1/4 ">
//           <PersonCard
//             empId={selectedEmployee?.empId}
//             firstName={selectedEmployee.firstName}
//             lastName={selectedEmployee.lastName}
//             status="Active"
//             position={selectedEmployee.position}
//             email={selectedEmployee.email}
//             address={selectedEmployee}
//             number={selectedEmployee.phoneNumber.number}
//             photo={selectedEmployee?.photo}
//             avatar="sda"
//             role={selectedEmployee?.role}
//             manager={selectedEmployee?.manager}
//             title={selectedEmployee?.title}
//           />
//         </div>

//         {/* Right: Dynamic content (Tabs) */}
//         {/* <div className="lg:w-3/4 h-full overflow-y-auto"> */}
//         <div className="lg:w-3/4 lg:overflow-auto lg:max-h-[calc(100vh-175px)]">
//           <Routes>
//             <Route
//               path="/"
//               element={<InformationGeneral selectedEmployee={selectedEmployee} />}
//             />
//             <Route
//               path="/general"
//               element={<InformationGeneral selectedEmployee={selectedEmployee} />}
//             />
//             <Route
//               path="/education"
//               element={<EducationTab selectedEmployee={selectedEmployee} />}
//             />
//             <Route
//               path="/leave"
//               element={<LeaveHistory selectedEmployee={selectedEmployee} />}
//             />
//             <Route
//               path="/attendance"
//               element={<AttendanceTable selectedEmployee={selectedEmployee} />}
//             />
//             <Route
//               path="/performance"
//               element={<PerformanceTable selectedEmployee={selectedEmployee} />}
//             />
//             <Route
//               path="/appraisal"
//               element={<AppraisalTab selectedEmployee={selectedEmployee} />}
//             />
//             <Route
//               path="/discipline"
//               element={<DisciplineTab selectedEmployee={selectedEmployee} />}
//             />
//             <Route
//               path="/health"
//               element={<HealthTab selectedEmployee={selectedEmployee} />}
//             />
//             <Route
//               path="/documentTracking"
//               element={<DocumentTrackingPage selectedEmpId={selectedEmployee.empId} />}
//             />
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeDetailedProfilePage;
// ========================================================

// import React, { useState } from "react";
// import { NavLink, Route, Routes, useParams } from "react-router-dom";
// import { Menu, Dropdown, Button, Spin } from "antd";
// import Title from "antd/es/typography/Title";
// import { DownloadOutlined } from "@ant-design/icons";
// import { BsThreeDotsVertical } from "react-icons/bs"; // Triple dot icon

// import PersonCard from "./PersonCard";
// import { useFindEmployeeById } from "../../services/queries/employeeQueries";

// import InformationGeneral from "./Tabs/InformationGeneral";
// import EducationTab from "./Tabs/EducationTab";
// import LeaveHistory from "./Tabs/LeaveHistory";
// import AttendanceTable from "./Tabs/AttendanceTableTab";
// import PerformanceTable from "./Tabs/PerformnaceTab";
// import AppraisalTab from "./Tabs/AppraisalTab";
// import DisciplineTab from "./Tabs/DisciplineTab";
// import HealthTab from "./Tabs/HealthTab";
// import DocumentTrackingPage from "./Tabs/DocumentTrackingPage";
// import "../../styles/EmployeeDetailedProfilePage.css";

// interface ProfileParams {
//   id: string;
// }

// const EmployeeDetailedProfilePage: React.FC = () => {
//   const { id } = useParams() as unknown as ProfileParams;
//   const { data: selectedEmployee, error, isLoading } = useFindEmployeeById(id);
//   const [dropdownVisible, setDropdownVisible] = useState(false);

//   if (!selectedEmployee) {
//     return <div className="text-center text-gray-500">Employee not found</div>;
//   }
//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Spin size="large" />
//       </div>
//     );
//   }

//   // Dropdown content
//   const menu = (
//     <Menu>
//       <Menu.Item key="downloadFull">
//         <Button type="text" icon={<DownloadOutlined />}>
//           Download Full Profile
//         </Button>
//       </Menu.Item>
//       <Menu.Item key="downloadRegistration">
//         <Button type="text" icon={<DownloadOutlined />}>
//           Download Registration Profile
//         </Button>
//       </Menu.Item>
//     </Menu>
//   );

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col gap-3">
//       {/* Sticky Header */}
//       <div className="sticky top-[100px] z-20 bg-white shadow-md py-2 px-8 flex justify-between items-center">
//         <Title level={4} className="m-0">
//           Employee Profile
//         </Title>
//         {/* Triple dot button */}
//         <Dropdown
//           overlay={menu}
//           trigger={["click"]}
//           visible={dropdownVisible}
//           onVisibleChange={setDropdownVisible}
//         >
//           <Button
//             type="text"
//             className="text-gray-500"
//             icon={<BsThreeDotsVertical size={20} />}
//           />
//         </Dropdown>
//       </div>

//       {/* Navigation Tabs */}
//       <div className="sticky top-[155px] z-10 bg-white shadow-sm">
//         <Menu mode="horizontal" className="flex justify-start px-8">
//           <Menu.Item key="general">
//             <NavLink
//               to={`/employee/view/${id}/general`}
//               className="text-gray-600 px-4"
//             >
//               General
//             </NavLink>
//           </Menu.Item>
//           <Menu.Item key="education">
//             <NavLink
//               to={`/employee/view/${id}/education`}
//               className="text-gray-600 px-4"
//             >
//               Education
//             </NavLink>
//           </Menu.Item>
//           <Menu.Item key="leave">
//             <NavLink
//               to={`/employee/view/${id}/leave`}
//               className="text-gray-600 px-4"
//             >
//               Leave
//             </NavLink>
//           </Menu.Item>
//           <Menu.Item key="attendance">
//             <NavLink
//               to={`/employee/view/${id}/attendance`}
//               className="text-gray-600 px-4"
//             >
//               Attendance
//             </NavLink>
//           </Menu.Item>
//           <Menu.Item key="performance">
//             <NavLink
//               to={`/employee/view/${id}/performance`}
//               className="text-gray-600 px-4"
//             >
//               Performance
//             </NavLink>
//           </Menu.Item>
//           <Menu.Item key="appraisal">
//             <NavLink
//               to={`/employee/view/${id}/appraisal`}
//               className="text-gray-600 px-4"
//             >
//               Appraisal
//             </NavLink>
//           </Menu.Item>
//           <Menu.Item key="discipline">
//             <NavLink
//               to={`/employee/view/${id}/discipline`}
//               className="text-gray-600 px-4"
//             >
//               Discipline
//             </NavLink>
//           </Menu.Item>
//           <Menu.Item key="documentTracking">
//             <NavLink
//               to={`/employee/view/${id}/documentTracking`}
//               className="text-gray-600 px-4"
//             >
//               Document Tracking
//             </NavLink>
//           </Menu.Item>
//           <Menu.Item key="health">
//             <NavLink
//               to={`/employee/view/${id}/health`}
//               className="text-gray-600 px-4"
//             >
//               Health
//             </NavLink>
//           </Menu.Item>
//         </Menu>
//       </div>

//       {/* Main Content Section */}
//       <div className="flex flex-grow overflow-hidden">
//         {/* Left Section: PersonCard */}
//         <div className="lg:w-1/4 h-[calc(100vh-100px)] sticky top-[200px] bg-white shadow-lg overflow-hidden">
//           <PersonCard
//             empId={selectedEmployee?.empId}
//             firstName={selectedEmployee.firstName}
//             lastName={selectedEmployee.lastName}
//             status="Active"
//             position={selectedEmployee.position}
//             email={selectedEmployee.email}
//             address={selectedEmployee}
//             number={selectedEmployee.phoneNumber.number}
//             photo={selectedEmployee?.photo}
//             avatar="sda"
//             role={selectedEmployee?.role}
//             manager={selectedEmployee?.manager}
//             title={selectedEmployee?.title}
//           />
//         </div>

//         {/* Right Section: Dynamic Content */}
//         <div className="lg:w-3/4 h-[calc(100vh-200px)] overflow-y-auto px-8">
//           <Routes>
//             <Route
//               path="/"
//               element={<InformationGeneral selectedEmployee={selectedEmployee} />}
//             />
//             <Route
//               path="/general"
//               element={<InformationGeneral selectedEmployee={selectedEmployee} />}
//             />
//             <Route
//               path="/education"
//               element={<EducationTab selectedEmployee={selectedEmployee} />}
//             />
//             <Route
//               path="/leave"
//               element={<LeaveHistory selectedEmployee={selectedEmployee} />}
//             />
//             <Route
//               path="/attendance"
//               element={<AttendanceTable selectedEmployee={selectedEmployee} />}
//             />
//             <Route
//               path="/performance"
//               element={<PerformanceTable selectedEmployee={selectedEmployee} />}
//             />
//             <Route
//               path="/appraisal"
//               element={<AppraisalTab selectedEmployee={selectedEmployee} />}
//             />
//             <Route
//               path="/discipline"
//               element={<DisciplineTab selectedEmployee={selectedEmployee} />}
//             />
//             <Route
//               path="/health"
//               element={<HealthTab selectedEmployee={selectedEmployee} />}
//             />
//             <Route
//               path="/documentTracking"
//               element={<DocumentTrackingPage selectedEmpId={selectedEmployee.empId} />}
//             />
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeDetailedProfilePage;
