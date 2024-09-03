import Title from "antd/es/typography/Title";
import React from "react";
import { NavLink, Route, Routes, useParams } from "react-router-dom";
import { Card, Menu } from "antd";
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
import DocumentTrackingPage from "./Tabs/DocumentTrackingPage";
import EthiopianDatePicker from "./Tabs/Dateddf";

interface EmployeeLeave {
  leave: LeaveInfo
}
interface ProfileParams {
  id: string;
}

const EmployeeDetailedProfilePage = () => {
  const { id } = useParams() as unknown as ProfileParams;
  const { data: selectedEmployee, error, isLoading } = useFindEmployeeById(id);
  // const employee = selectedEmployee.find((employee) => employee.key === id);
 const employeeLeave = selectedEmployee;
  if (!selectedEmployee) {
    return <div>Employee not found</div>;
  }
  if (isLoading) {
    return <div>...Loading</div>;
  }
  console.log(selectedEmployee);

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
        <Title level={4} style={{ padding: "10px 50px" }}>
          Employee Profile
        </Title>
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
            {/* <Item key="cal">
              <NavLink
                className="link"
                to={`/employee/view/${id}/cal`}
                style={{ color: "grey", padding: "0 10px" }}
              >
                Calendar
              </NavLink>
            </Item> */}
            <Item key="documentTracking">
              <NavLink
                className="link"
                to={`/employee/view/${id}/documentTracking`}
                style={{ color: "grey", padding: "0 10px" }}
              >
                Document
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
            {/* <Route
              path="/leave"
              element={<LeaveHistory selectedEmployee={employeeLeave} />}
            /> */}
            <Route
              path="/leave"
              element={<LeaveHistory selectedEmployee={employeeLeave} />}
            />
            {/* <Route path="/leave" element={<LeaveHistory />} /> */}
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
              path="/documentTracking"
              element={
                <DocumentTrackingPage selectedEmpId={selectedEmployee.empId} />
              }
            />
            {/* <Route path="/cal" element={<EthiopianDatePicker />} /> */}
          </Routes>
        </Content>
      </div>

      {/* <Inside /> */}
      {/* <div>EmployeeDetailedProfilePage</div>
      <div>
        <h1>{employee.name}</h1>
        <p>ID: {employee.key}</p>
        
      </div> */}
    </div>
  );
};

export default EmployeeDetailedProfilePage;