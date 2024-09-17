import React, { useState } from "react";
import { Button, Layout } from "antd";
import Header from "../components/Common/Header";
import Sider from "../components/Common/Sider";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Navigate, Route, Routes } from "react-router-dom";
import EmployeeProfilePage from "./EmployeeProfile/EmployeeProfilePage";
import EmployeeRegistrationPage from "./EmployeeRegistration/EmployeeRegistrationPage";
import ComplaintForm from "../components/Complaint/ComplaintForm";
import LeaveApplicationForm from "../components/Leave/LeaveApplicationForm";
import LeaveHistory from "../components/Leave/LeaveHistory";
import EmployeeDetailedProfilePage from "../components/EmployeeProfile/EmployeeDetailedProfilePage";
import LeaveApproval from "../components/Leave/leaveApproval";
import CalendarComponent from "../components/Calendar/Calendar";
import MultiStepForm from "./testregistration";
import AppraisalPage from "./Appraisal/AppraisalPage";
import ApprasialForm from "../components/Appraisal/AppraisalForm";
import DashboardStat from "./DashboardStat";
import EmployeeForm from "./testregistration";
import LeaveCreditsForm from "../components/AdminDashboard/LeaveManagement/LeaveBalanceForm";
import AppraisalList from "../components/AdminDashboard/AppraisalManagement/AppraisalList";
import AppraisalTable from "../components/Appraisal/AppraisalListCandidateTable";
import AttendanceForm from "../components/Attendance/Attendance";
import AttendanceCalendar from "../components/Attendance/AttendanceCalendar";
import AttendanceHistory from "../components/Attendance/AttendanceHistory";
import CalendarHolder from "../components/Calendar/CalendarHolder";
import ComplaintHistory from "../components/Complaint/ComplaintHistory";
import RewardsList from "../components/Rewards/RewardsList";
import EmployeeInfoEditPage from "./AdminDashboard/EmployeeInfoEditPage";
import EducationInfoPage from "./AdminDashboard/Organiazation/EducationInfoPage";
import DepartmentInfoPage from "./AdminDashboard/Organiazation/DepartmentInfoPage";
import PositionsInfoPage from "./AdminDashboard/Organiazation/PositionsInfoPage";
import LeaveFormInfoPage from "./AdminDashboard/Organiazation/LeaveTypeInfoPage";
import HolidayInfoPage from "./AdminDashboard/Organiazation/HolidayInfoPage";
import EthnicityInfoPage from "./AdminDashboard/Organiazation/EthnicityInfoPage";
import AddressInfoPage from "./AdminDashboard/Organiazation/AddressInfoPage";
import AttendanceDashboard from "../components/Attendance/AttendanceDashboard";
import ProfilePage from "./AdminDashboard/Profile";
import LeaveDashboard from "../components/AdminDashboard/LeaveManagement/LeaveDashboard";
import LoginPage from "./Auth/LoginPage";
import AttendanceSheetTable from "../components/Attendance/AttendanceSheetTable";
import HRDashboard from "../components/AdminDashboard/Common/AdminDash/HRDashboard";
import EvidenceReview from "../components/Attendance/AbsentPermission";
import TitlesInfoPage from "./AdminDashboard/Organiazation/TitlesInfoPage";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import { useAuth } from "../context/AuthContext";
import Profile from "../components/Profile/Profile";
import DepartmentRoleChange from "./AdminDashboard/Organiazation/DepartmentRoleChange";
import LoginEmployee from "./LoginEmployee/LoginEmployee";
import ManagerRoleChangeForm from "../components/Organization/RoleChangeManager/ManagerRoleChangeForm";
import ManagerRoleChange from "./AdminDashboard/Organiazation/ManagerRoleChange";
import AddManagerToDepartmentForm from "../components/Organization/AddManagerToDepartment/AddManagerToDepartment";
import DepartmentManagerAssign from "./AdminDashboard/Organiazation/DepartmentManagerAssign";
import AllStaff from "./Staff/AllStaff";
import RewardsPage from "./Rewards/RewardsPage";
import ServiceRewardPage from "./Rewards/ServiceRewardPage";
import ComplaintList from "../components/Complaint/ComplaintList";
import ComplaintEvidence from "../components/Complaint/ComplaintEvidence";
import ComplaintTransfer from "../components/Complaint/ComlaintTransfer";
import EmployeeDeactivatePage from "./EmployeeProfile/EmployeeDeactivatePage";

const { Content } = Layout;

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();
  const handleSiderCollapse = (isCollapsed: boolean) => {
    setCollapsed(isCollapsed);
  };

  return (
    <Layout>
      <div style={{ position: "fixed", zIndex: 12, top: 0, width: "100%" }}>
        <Header />
      </div>
      <Layout style={{ marginTop: "70px" }}>
        <div style={{ display: "flex" }}>
          <Sider collapsed={collapsed} />
          <Button
            style={{
              position: "absolute",
              top: "70px",
              left: collapsed ? "80px" : "240px",
            }}
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>

        <Layout
          style={{
            marginLeft: collapsed ? "80px" : "240px",
            transition: "margin-left 0.4s, all 0.4s ease-in-out",
            minHeight: "100vh",
            padding: "20px",
            // transition: "width 0.3s, all 0.3s ease-in-out",
          }}
        >
          <Content>
            <Routes>
              {/* <Route path="/createPassword"> */}
              {/* </Route> */}
              <Route
                path="/"
                element={
                  user?.role === "employee" ||
                  user?.role === "department head" ||
                  user?.role === "manager" ? (
                    <Navigate to={`/employee/view/${user.ObjId}`} replace />
                  ) : (
                    <ProtectedRoute
                      roles={["admin", "hrmanager", "staff", "committee"]}
                    >
                      <HRDashboard />
                    </ProtectedRoute>
                  )
                }
              />
              <Route
                path="/messages"
                element={
                  <ProtectedRoute
                    roles={["department head", "manager", "employee"]}
                  >
                    {/* <ProfilePage /> */}
                    <Profile />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    roles={["hrmanager", "admin", "staff", "committee"]}
                  >
                    {/* <ProfilePage /> */}
                    <Profile />
                  </ProtectedRoute>
                }
              ></Route>

              <Route path="/organization">
                <Route
                  path="staffinfo"
                  element={
                    <ProtectedRoute roles={["hrmanager", "admin"]}>
                      <AllStaff />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="addressinfo"
                  element={
                    <ProtectedRoute roles={["hrmanager", "admin"]}>
                      <AddressInfoPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="department"
                  element={
                    <ProtectedRoute roles={["hrmanager", "admin"]}>
                      <DepartmentInfoPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="managerAddition"
                  element={
                    <ProtectedRoute roles={["hrmanager", "admin"]}>
                      <DepartmentManagerAssign />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="departmentRoleChange"
                  element={
                    <ProtectedRoute roles={["hrmanager", "admin"]}>
                      <DepartmentRoleChange />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="managerRoleChange"
                  element={
                    <ProtectedRoute roles={["hrmanager", "admin"]}>
                      <ManagerRoleChange />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="position"
                  element={
                    <ProtectedRoute roles={["hrmanager", "admin"]}>
                      <PositionsInfoPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="leaveType"
                  element={
                    <ProtectedRoute roles={["hrmanager", "admin"]}>
                      <LeaveFormInfoPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="holiday"
                  element={
                    <ProtectedRoute roles={["hrmanager", "admin"]}>
                      <HolidayInfoPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="ethnicity"
                  element={
                    <ProtectedRoute roles={["hrmanager", "admin"]}>
                      <EthnicityInfoPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="education"
                  element={
                    <ProtectedRoute roles={["hrmanager", "admin"]}>
                      <EducationInfoPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="titles"
                  element={
                    <ProtectedRoute roles={["hrmanager", "admin"]}>
                      <TitlesInfoPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="leaveBalance"
                  element={
                    <ProtectedRoute
                      roles={["hrmanager", "admin"]} //staff and hrmanager update credit
                    >
                      <LeaveCreditsForm />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route path="/employee">
                <Route
                  path="registration"
                  element={
                    <ProtectedRoute roles={["hrmanager", "staff"]}>
                      <EmployeeRegistrationPage />
                      {/* <EmployeeForm /> */}
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="view"
                  element={
                    <ProtectedRoute
                      roles={[
                        "department head",
                        "manager",
                        "staff",
                        "hrmanager",
                        "admin",
                      ]}
                    >
                      <EmployeeProfilePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="view/:id/*" // here only staff and hrmanager has full premission
                  element={
                    <ProtectedRoute
                      roles={[
                        "department head",
                        "manager",
                        "staff",
                        "admin",
                        "hrmanager",
                        "employee",
                      ]}
                    >
                      <EmployeeDetailedProfilePage />
                    </ProtectedRoute>
                  }
                />
                <Route path="deactiveEmployee" element={<EmployeeDeactivatePage />} />
              </Route>
              <Route path="/leave">
                <Route
                  path="request"
                  element={
                    <ProtectedRoute roles={["employee", "manager"]}>
                      <LeaveApplicationForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="currentLeave" //only
                  element={
                    <ProtectedRoute
                      roles={[
                        "department head",
                        "manager",
                        "staff",
                        "admin",
                        "hrmanager",
                      ]}
                    >
                      <LeaveApproval />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="history"
                  element={
                    <ProtectedRoute
                      roles={["hrmanager", "staff", "admin"]} //staff and hrmanager update credit
                    >
                      <LeaveHistory />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="leaveDashboard"
                  element={
                    <ProtectedRoute roles={["manager", "staff", "admin"]}>
                      <LeaveDashboard />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route path="/attendance">
                <Route
                  path="attendanceDashboard"
                  element={
                    <ProtectedRoute roles={["manager", "staff", "hrmanager"]}>
                      <AttendanceDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="currentAttendance"
                  element={
                    <ProtectedRoute
                      roles={["employee", "department head", "manager"]}
                    >
                      <AttendanceForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="history"
                  element={
                    <ProtectedRoute
                      roles={[
                        "hrmanager",
                        "staff",
                        "department head",
                        "manager",
                      ]}
                    >
                      <AttendanceHistory />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="attendanceSheet"
                  element={
                    <ProtectedRoute
                      roles={[
                        "hrmanager",
                        "staff",
                        // "department head",
                        // "manager",
                      ]}
                    >
                      <AttendanceSheetTable />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="permissionEvidence"
                  element={
                    <ProtectedRoute roles={["department head", "manager"]}>
                      <EvidenceReview />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route
                path="/calendar"
                element={
                  <ProtectedRoute
                    roles={[
                      "hrmanager",
                      "employee",
                      "staff",
                      "department head",
                      "manager",
                      "admin",
                    ]} //staff and hrmanager update credit
                  >
                    <CalendarHolder />
                  </ProtectedRoute>
                }
              ></Route>
              <Route path="/apprasial">
                <Route
                  path="generateListCandidates"
                  element={
                    <ProtectedRoute roles={["hrmanager"]}>
                      <AppraisalPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="apprasialPerformanceForm"
                  element={
                    <ProtectedRoute roles={["hrmanager"]}>
                      <ApprasialForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="apprasialApprovedCandidates"
                  element={
                    <ProtectedRoute roles={["hrmanager", "staff"]}>
                      <AppraisalTable />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route path="/reward">
                <Route
                  path="salaryRaiseTable"
                  element={
                    <ProtectedRoute roles={["hrmanager"]}>
                      <RewardsList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="serviceRewardTable"
                  element={
                    <ProtectedRoute roles={["hrmanager"]}>
                      <ServiceRewardPage />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route path="/complaint">
                <Route
                  path="complaintForm"
                  element={
                    <ProtectedRoute
                      roles={[
                        "hrmanager",
                        "staff",
                        "department head",
                        "employee",
                        "manager",
                        "admin",
                        "committee",
                      ]}
                    >
                      <ComplaintForm />{" "}
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="complaintList"
                  element={
                    <ProtectedRoute
                      roles={["hrmanager", "committee", "admin", "staff"]}
                    >
                      <ComplaintList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="complaintEvidence"
                  element={
                    <ProtectedRoute
                      roles={["hrmanager", "committee", "admin", "staff"]}
                    >
                      <ComplaintEvidence />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="complaintHistory"
                  element={
                    <ProtectedRoute
                      roles={["hrmanager", "committee", "admin", "staff"]}
                    >
                      <ComplaintHistory />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="complaintTransfer"
                  element={
                    <ProtectedRoute
                      roles={["hrmanager", "department head", "admin", "staff", "manager"]}
                    >
                      <ComplaintTransfer />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
