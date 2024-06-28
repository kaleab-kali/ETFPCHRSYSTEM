import React from "react";
import { Flex } from "antd";
import AttendanceCard from "../AdminDashboard/AttendanceManagement/AttendanceCard";
import AttendanceGraph from "../AdminDashboard/AttendanceManagement/AttendanceGraph";
import GenderDiversityChart from "../AdminDashboard/AttendanceManagement/PieChart";
import DepartmentChart from "../AdminDashboard/AttendanceManagement/DepartmentPieChart";
import RecentActivityCard from "../AdminDashboard/AttendanceManagement/RecentActivity";
import AttendanceCalendar from "../AdminDashboard/AttendanceManagement/AttendanceCalendar";
import Radial from "../AdminDashboard/AttendanceManagement/Radial";
import Area from "../AdminDashboard/AttendanceManagement/Area";
import AttendanceDashTable from "../AdminDashboard/AttendanceManagement/AttendanceDashTable";

const AttendanceDashboard: React.FC = () => {
  return (
    <div style={{ marginTop: "30px", width: "95%", marginLeft: "25px" }}>
      <Flex vertical={false} justify="space-between">
        <Flex vertical style={{width:"71%"}}>
          <AttendanceCard />
          <h1 style={{ marginLeft: "20px" }}>Employee Structure</h1>
          <Flex vertical={false} align="center" justify="space-around">
            <div
              style={{
                backgroundColor: "white",
                marginRight: "5px",
                borderRadius: "30px",
              }}
            >
              {/* <GenderDiversityChart /> */}
            </div>
            <div
              style={{
                backgroundColor: "white",
                marginRight: "5px",
                borderRadius: "30px",
              }}
            >
              <Radial />
            </div>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "30px",
              }}
            >
              <DepartmentChart />
            </div>
          </Flex>
          <h1 style={{ marginLeft: "20px" }}>Attendance</h1>
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "30px",
              marginTop: "10px",
            }}
          >
            <AttendanceGraph />
          </div>
          <AttendanceDashTable/>
        </Flex>
        <div style={{ marginLeft: "10px" }}>
          <AttendanceCalendar />
          <div 
              style={{
                backgroundColor: "white",
                borderRadius: "10px",
                marginTop:"5px",
                marginBottom:"5px",
              }}
            >

          <Area/>
            </div>
          <RecentActivityCard />
        </div>
      </Flex>
    </div>
  );
};

export default AttendanceDashboard;
