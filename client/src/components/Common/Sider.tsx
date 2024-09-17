import React, { useState } from "react";
import {
  IoPersonAddOutline,
  IoListOutline,
  IoCalendarOutline,
  IoNewspaperOutline,
  IoCheckmarkDone,
} from "react-icons/io5";
import {
  LuLayoutDashboard,
  LuShoppingBag,
  LuGitPullRequest,
  LuHistory,
  LuUserCheck2,
  LuTrendingUp,
  LuGift,
  LuSheet,
  LuPaperclip,
} from "react-icons/lu";
import { GrCheckbox, GrDashboard } from "react-icons/gr";
import { MdOutlineManageHistory } from "react-icons/md";
import { CommentOutlined, TeamOutlined } from "@ant-design/icons";
import { HiOutlineUserGroup } from "react-icons/hi";
import { Layout, Menu } from "antd";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import { R } from "@tanstack/react-query-devtools/build/legacy/devtools-9h89nHJX";

const { Sider: AntdSider } = Layout;

interface SiderProps {
  collapsed: boolean;
}

const Sider: React.FC<SiderProps> = ({
  collapsed,
}) => {
  const [activeKey, setActiveKey] = useState("");
  const {t}=useTranslation();
  const { user } = useAuth();
  const handleMenuClick = (key: string) => {
    setActiveKey(key);
  };

  return (
    <AntdSider
      collapsible
      collapsed={collapsed}
      trigger={null}
      style={{
        backgroundColor: "white",
        height: "95vh",
        paddingTop: "40px",
        position: "fixed",
        top: "30px",
        zIndex: "9",
        overflowY: "auto",
        transition: "width 0.3s, all 0.3s ease-in-out",
      }}
      width={240}
      collapsedWidth={80}
    >
      <Menu
        mode="inline"
        selectedKeys={[activeKey]}
        inlineCollapsed={collapsed}
      >
        {(user?.role === "admin" ||
          user?.role === "hrmanager" ||
          user?.role === "staff") && (
          <Menu.Item
            key="dashboard"
            icon={<LuLayoutDashboard size={20} />}
            onClick={() => handleMenuClick("dashboard")}
          >
            <NavLink to="/">{t('dashboard')}</NavLink>
          </Menu.Item>
        )}
        {user?.role !== "employee" && user?.role !== "committee" && (
          <>
            {(user?.role === "admin" || user?.role === "hrmanager") && (
              <>
                <Menu.SubMenu
                  icon={<TeamOutlined size={20} />}
                  key="organizationSubMenu"
                  title={t('organization')}
                >
                  <Menu.Item
                    key="staffInfo"
                    onClick={() => handleMenuClick("staffInfo")}
                  >
                    <NavLink to="/organization/staffinfo">All Staff</NavLink>
                  </Menu.Item>
                  <Menu.Item
                    key="organizationDepartment"
                    onClick={() => handleMenuClick("organizationDepartment")}
                  >
                    <NavLink to="/organization/department">{t('department')}</NavLink>
                  </Menu.Item>

                  <Menu.Item
                    key="organizationPosition"
                    onClick={() => handleMenuClick("organizationPosition")}
                  >
                    <NavLink to="/organization/position">Position</NavLink>
                  </Menu.Item>

                  <Menu.Item
                    key="organizationHoliday"
                    onClick={() => handleMenuClick("organizationHoliday")}
                  >
                    <NavLink to="/organization/holiday">Holiday</NavLink>
                  </Menu.Item>

                  <Menu.Item
                    key="organizationEducation"
                    onClick={() => handleMenuClick("organizationEducation")}
                  >
                    <NavLink to="/organization/education">Education</NavLink>
                  </Menu.Item>

                  {/* <Menu.Item
                    key="organizationEthnicity"
                    onClick={() => handleMenuClick("organizationEthnicity")}
                  >
                    <NavLink to="/organization/ethnicity">Ethnicity</NavLink>
                  </Menu.Item> */}

                  <Menu.Item
                    key="organizationAddressInfo"
                    onClick={() => handleMenuClick("organizationAddressInfo")}
                  >
                    <NavLink to="/organization/addressInfo">
                      Address Info
                    </NavLink>
                  </Menu.Item>

                  <Menu.Item
                    key="organizationTitles"
                    onClick={() => handleMenuClick("organizationTitles")}
                  >
                    <NavLink to="/organization/titles">Titles</NavLink>
                  </Menu.Item>

                  <Menu.Item
                    key="organizationLeaveType"
                    onClick={() => handleMenuClick("organizationLeaveType")}
                  >
                    <NavLink to="/organization/leaveType">Leave Type</NavLink>
                  </Menu.Item>

                  {/* <Menu.Item
                    key="organizationLeaveBalance"
                    onClick={() => handleMenuClick("organizationLeaveBalance")}
                  >
                    <NavLink to="/organization/leaveBalance">
                      Leave Balance
                    </NavLink>
                  </Menu.Item> */}
                  <Menu.Item
                    key="organizationDepartmentRoleChange"
                    onClick={() =>
                      handleMenuClick("organizationDepartmentRolechange")
                    }
                  >
                    <NavLink to="/organization/departmentRoleChange">
                      Assign Head
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item
                    key="organizationManagerRoleChange"
                    onClick={() =>
                      handleMenuClick("organizationManagerRolechange")
                    }
                  >
                    <NavLink to="/organization/managerRoleChange">
                      Assign Manager
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item
                    key="organizationManagerAddition"
                    onClick={() =>
                      handleMenuClick("organizationManagerAddition")
                    }
                  >
                    <NavLink to="/organization/managerAddition">
                      Add New Manager
                    </NavLink>
                  </Menu.Item>
                </Menu.SubMenu>
              </>
            )}

            <Menu.SubMenu
              icon={
                <HiOutlineUserGroup
                  size={20}
                  // style={{ marginRight: "-50px", marginLeft: "-50px" }}
                />
              }
              key="employeeSubMenu"
              title={t('employee')}
            >
              {(user?.role === "staff" || user?.role === "hrmanager") && (
                <Menu.Item
                  key="employeeRegistration"
                  icon={<IoPersonAddOutline size={20} />}
                  onClick={() => handleMenuClick("employeeRegistration")}
                >
                  <NavLink to="/employee/registration">{t('Registration')}</NavLink>
                </Menu.Item>
              )}
              {user?.role !== "committee" && (
                <Menu.Item
                  key="employeeView"
                  icon={<IoListOutline size={20} />}
                  onClick={() => handleMenuClick("employeeView")}
                >
                  <NavLink to="/employee/view">{t('list')}</NavLink>
                </Menu.Item>
              )}
              {user?.role !== "committee" && (
                <Menu.Item
                  key="employeedeactiveView"
                  icon={<IoListOutline size={20} />}
                  onClick={() => handleMenuClick("employeeDeactiveView")}
                >
                  <NavLink to="/employee/deactiveEmployee">{t('inactive')}</NavLink>
                </Menu.Item>
              )}
              {/* )} */}
              {/* <Menu.Item
                key="employeeEdit"
                icon={<EditOutlined />}
                onClick={() => handleMenuClick("employeeEdit")}
              >
                <NavLink to="/employee/edit">Admin Edit</NavLink>
              </Menu.Item> */}
            </Menu.SubMenu>
          </>
        )}
        {user?.role !== "committee" && (
          <>
            <Menu.SubMenu
              icon={<LuShoppingBag size={20} />}
              key="leaveSubMenu"
              title={t('leave')}
            >
              {(user?.role === "admin" ||
                user?.role === "manager" ||
                user?.role === "staff") && (
                <Menu.Item
                  icon={<GrDashboard size={20} />}
                  key="leaveDashboard"
                  onClick={() => handleMenuClick("leaveDashboard")}
                >
                  <NavLink to="/leave/leaveDashboard">{t('dashboard')}</NavLink>
                </Menu.Item>
              )}
              {(user?.role === "employee" || user?.role === "manager") && (
                <Menu.Item
                  icon={<LuGitPullRequest size={20} />}
                  key="request"
                  onClick={() => handleMenuClick("request")}
                >
                  <NavLink to="/leave/request">{t('request')}</NavLink>
                </Menu.Item>
              )}
              {user?.role !== "employee" && (
                <>
                  <Menu.Item
                    icon={<GrCheckbox size={20} />}
                    key="currentLeave"
                    onClick={() => handleMenuClick("currentLeave")}
                  >
                    <NavLink to="/leave/currentLeave">{t('currentLeave')}</NavLink>
                  </Menu.Item>
                  {(user?.role === "hrmanager" ||
                    user?.role === "staff" ||
                    user?.role === "admin") && (
                    <Menu.Item
                      icon={<LuHistory size={20} />}
                      key="leaveHistory"
                      onClick={() => handleMenuClick("leaveHistory")}
                    >
                      <NavLink to="/leave/history">History</NavLink>
                    </Menu.Item>
                  )}
                </>
              )}
            </Menu.SubMenu>
          </>
        )}

        {user?.role !== "admin" && user?.role !== "committee" && (
          <>
            <Menu.SubMenu
              icon={<LuUserCheck2 size={20} />}
              key="attendanceSubMenu"
              title={t("attendance")}
            >
              {(user?.role === "hrmanager" || user?.role === "staff") && (
                <Menu.Item
                  icon={<GrDashboard size={20} />}
                  key="attendanceDashboard"
                  onClick={() => handleMenuClick("attendanceDashboard")}
                >
                  <NavLink to="/attendance/attendanceDashboard">
                    Dashboard
                  </NavLink>
                </Menu.Item>
              )}
              {(user?.role === "employee" ||
                user?.role === "department head" ||
                user?.role === "manager") && (
                <Menu.Item
                  icon={<GrCheckbox size={20} />}
                  key="currentAttendance"
                  onClick={() => handleMenuClick("currentAttendance")}
                >
                  <NavLink to="/attendance/currentAttendance">
                    Current Attendance
                  </NavLink>
                </Menu.Item>
              )}
              {(user?.role === "hrmanager" || user?.role === "staff") && (
                <>
                  <Menu.Item
                    icon={<LuSheet size={20} />}
                    key="attendanceSheet"
                    onClick={() => handleMenuClick("attendanceSheet")}
                  >
                    <NavLink to="/attendance/attendanceSheet">
                      Attendance Sheet
                    </NavLink>
                  </Menu.Item>
                </>
              )}
              {(user?.role === "department head" ||
                user?.role === "manager") && (
                <>
                  <Menu.Item
                    icon={<LuHistory size={20} />}
                    key="attendanceHistory"
                    onClick={() => handleMenuClick("attendanceHistory")}
                  >
                    <NavLink to="/attendance/history">History</NavLink>
                  </Menu.Item>
                  <Menu.Item
                    icon={<LuPaperclip size={20} />}
                    key="permissionEvidence"
                    onClick={() => handleMenuClick("permissionEvidence")}
                  >
                    <NavLink to="/attendance/permissionEvidence">
                      Attendance Permission
                    </NavLink>
                  </Menu.Item>
                </>
              )}
            </Menu.SubMenu>
          </>
        )}
        {/* <Menu.Item icon={<IoCalendarOutline size={20} />} key="calendar">
          <NavLink to="/calendar">Calendar</NavLink>
        </Menu.Item> */}
        {/* {(user?.role === "hrmanager" || user?.role === "department head") && (
          <Menu.SubMenu
            icon={<IoBarChartOutline size={20} />}
            key="performanceSubMenu"
            title="Performance"
          >
            <Menu.Item
              icon={<GrCheckbox size={20} />}
              key="currentperformance"
              onClick={() => handleMenuClick("currentperformance")}
            >
              <NavLink to="/performance/evaluation">Evaluation</NavLink>
            </Menu.Item>
            <Menu.Item
              icon={<LuHistory size={20} />}
              key="performanceHistory"
              onClick={() => handleMenuClick("performanceHistory")}
            >
              <NavLink to="/performance/history">History</NavLink>
            </Menu.Item>
          </Menu.SubMenu>
        )} */}
        {(user?.role === "hrmanager" || user?.role === "staff") && (
          <>
            <Menu.SubMenu
              icon={<LuTrendingUp size={20} />}
              key="apprasialSubMenu"
              title={t('appraisal')}
            >
              {user?.role === "hrmanager" && (
                <>
                  <Menu.Item
                    icon={<IoListOutline size={20} />}
                    key="generatelistcandidate"
                    onClick={() => handleMenuClick("generatelistcandidate")}
                  >
                    <NavLink to="/apprasial/generateListCandidates">
                      List of candidates
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item
                    icon={<IoNewspaperOutline size={20} />}
                    key="apprasialPerformanceForm"
                    onClick={() => handleMenuClick("apprasialPerformanceForm")}
                  >
                    <NavLink to="/apprasial/apprasialPerformanceForm">
                      Evaluation Form
                    </NavLink>
                  </Menu.Item>
                </>
              )}
              {(user?.role === "hrmanager" || user?.role === "staff") && (
                <Menu.Item
                  icon={<IoCheckmarkDone size={20} />}
                  key="apprasialApprovedCandidates"
                  onClick={() => handleMenuClick("apprasialApprovedCandidates")}
                >
                  <NavLink to="/apprasial/apprasialApprovedCandidates">
                    Approved candidates
                  </NavLink>
                </Menu.Item>
              )}
            </Menu.SubMenu>
          </>
        )}
        {user?.role === "hrmanager" && (
          <Menu.SubMenu
            icon={<LuGift size={20} />}
            key="rewardSubMenu"
            title={t("reward")}
          >
            <Menu.Item
              icon={<IoNewspaperOutline size={20} />}
              key="salaryRaiseTable"
              onClick={() => handleMenuClick("salaryRaiseTable")}
            >
              <NavLink to="/reward/salaryRaiseTable">
                Salary Raise Table
              </NavLink>
            </Menu.Item>
            <Menu.Item
              icon={<MdOutlineManageHistory size={20} />}
              key="serviceRewardTable"
              onClick={() => handleMenuClick("serviceRewardTable")}
            >
              <NavLink to="/reward/serviceRewardTable">
                Service Reward Table
              </NavLink>
            </Menu.Item>
          </Menu.SubMenu>
        )}
        <Menu.SubMenu
          icon={<CommentOutlined size={20} />}
          key="complaintSubMenu"
          title={t('complaint')}
        >
          <Menu.Item
            icon={<IoNewspaperOutline size={20} />}
            key="complaintForm"
            onClick={() => handleMenuClick("complaintForm")}
          >
            <NavLink to="/complaint/complaintForm">Complaint Form</NavLink>
          </Menu.Item>
          {(user?.role === "hrmanager" ||
            user?.role === "staff" ||
            user?.role === "committee" ||
            user?.role === "admin") && (
            <>
              <Menu.Item
                icon={<IoListOutline size={20} />}
                key="complaintList"
                onClick={() => handleMenuClick("complaintList")}
              >
                <NavLink to="/complaint/complaintList">Complaint List</NavLink>
              </Menu.Item>
              <Menu.Item
                icon={<IoListOutline size={20} />}
                key="complaintEvidence"
                onClick={() => handleMenuClick("complaintEvidence")}
              >
                <NavLink to="/complaint/complaintEvidence">
                  Complaint Evidence
                </NavLink>
              </Menu.Item>
              <Menu.Item
                icon={<IoListOutline size={20} />}
                key="complaintHistory"
                onClick={() => handleMenuClick("complaintHistory")}
              >
                <NavLink to="/complaint/complaintHistory">
                  Complaint History
                </NavLink>
              </Menu.Item>
            </>
          )}
          {(user?.role ===  "department head" || user?.role ===  "manager") && (
            <Menu.Item
              icon={<IoListOutline size={20} />}
              key="complaintTranfer"
              onClick={() => handleMenuClick("complaintTransfer")}
            >
              <NavLink to="/complaint/complaintTransfer">
                Complaint List
              </NavLink>
            </Menu.Item>
          )}
        </Menu.SubMenu>
        {/* <Menu.SubMenu>
          <Menu.Item>

          </Menu.Item>
        </Menu.SubMenu> */}
      </Menu>
    </AntdSider>
  );

};

export default Sider;
