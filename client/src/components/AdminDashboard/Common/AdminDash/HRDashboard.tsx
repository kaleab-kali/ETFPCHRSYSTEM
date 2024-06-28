import React from "react";
import { Card, Col, Row, Skeleton } from "antd";
import {
  useEmployees,
  useEmployeesIds,
} from "../../../../services/queries/employeeQueries";
import GenderDistributionChart from "./GenderDistributionChart";
import LeaveBalanceDistributionChart from "./LeaveBalanceDistributionChart";
import DepartmentSalaryDistributionChart from "./DepartmentSalaryDistributionChart";
import EducationQualificationChart from "./EducationQualificationChart";
import EmployeeTable from "./EmployeeTable";
import {
  EmployeeData,
  IAttendance,
} from "../../../../../../shared/types/employeeTypes";
import AbsenteeismPunctualityAnalysis from "./AbsenteeismPunctualityAnalysis";
import EmployeeMetrics from "./MetricCardSender";
import AttendanceDashTable from "../../AttendanceManagement/AttendanceDashTable";

const HRDashboard: React.FC = () => {
  const employeesIdQuery = useEmployeesIds();
  const employeeQueries = useEmployees(employeesIdQuery.data);

  if (employeeQueries.some((query) => query.isLoading)) {
    return (
      <div style={{ padding: 24 }}>
        <Skeleton active />
      </div>
    );
  }
  if (employeeQueries.some((query) => query.error)) {
    return <div>Error loading data</div>;
  }

  const employees: EmployeeData[] = employeeQueries
    .map((query) => query.data)
    .filter((data): data is EmployeeData => data !== undefined);

  // Gender Distribution Data
  const genderData = employees.reduce<Record<string, number>>(
    (acc, employee) => {
      acc[employee.gender] = (acc[employee.gender] || 0) + 1;
      return acc;
    },
    {}
  );

  // Leave Balance Distribution Data
  const leaveTypes = ["paternity", "annual", "health"];
  const leaveTypeMap = {
    paternity: "Paternity Leave",
    annual: "Annual Leave",
    health: "Health Leave",
  };

  const aggregatedBalances = leaveTypes.map((type) => {
    return employees.reduce((total, employee) => {
      return (
        total +
        (employee.leaveBalances?.reduce((yearTotal, yearBalance) => {
          const leave = yearBalance.balances.find(
            (balance) => balance.leaveType === type
          );
          return yearTotal + (leave ? leave.available : 0);
        }, 0) || 0)
      );
    }, 0);
  });

  const leaveTotal = aggregatedBalances.reduce(
    (sum, balance) => sum + balance,
    0
  );
  const leavePercentages = aggregatedBalances.map((balance) =>
    leaveTotal ? (balance / leaveTotal) * 100 : 0
  );

  // Department-wise Salary Distribution Data
  const departmentData = employees.reduce<Record<string, number>>(
    (acc, employee) => {
      acc[employee.department] =
        (acc[employee.department] || 0) + Number(employee.salary);
      return acc;
    },
    {}
  );

  // Educational Qualifications Data
  const educationLevels = ["Bachelor's Degree", "Master's Degree", "PhD"];
  const educationData = employees.reduce<Record<string, number>>(
    (acc, employee) => {
      acc[employee.educationLevel] = (acc[employee.educationLevel] || 0) + 1;
      return acc;
    },
    {}
  );

  // Absenteeism Data
  const absenteeismData = employees.map((employee) => ({
    employee: `${employee.firstName} ${employee.lastName}`,
    daysAbsent: employee.attendanceRecords.filter(
      (record) => record.status !== "on time"
    ).length,
  }));

  // Function to calculate late percentage
  const calculateLatePercentage = (attendanceRecords: IAttendance[]) => {
    const totalRecords = attendanceRecords.length;
    const lateRecords = attendanceRecords.filter(
      (record) => record.status === "late"
    ).length;
    return (lateRecords / totalRecords) * 100;
  };

  // Now you can use calculateLatePercentage in your code
  const punctualityData = employees.map((employee) => ({
    employee: `${employee.firstName} ${employee.lastName}`,
    latePercentage: calculateLatePercentage(employee.attendanceRecords),
  }));

  return (
    <div style={{ padding: 24 }}>
      <EmployeeMetrics />
      <Row
        gutter={[16, 16]}
        style={{ marginTop: "20px", marginBottom: "10px" }}
      >
        <Col span={8}>
          <GenderDistributionChart genderData={genderData} />
        </Col>
        <Col span={16}>
          <AttendanceDashTable />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <DepartmentSalaryDistributionChart departmentData={departmentData} />
        </Col>
        <Col span={8}>
          <LeaveBalanceDistributionChart
            leavePercentages={leavePercentages}
            leaveTypes={leaveTypes}
            leaveTypeMap={leaveTypeMap}
          />
        </Col>
        <Col span={8}>
          <EducationQualificationChart
            educationData={educationData}
            educationLevels={educationLevels}
          />
        </Col>
      </Row>
      <Row
        gutter={[16, 16]}
        style={{ marginTop: "10px", marginBottom: "10px" }}
      >
        <Col span={24}>
          <EmployeeTable employees={employees} />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="Absenteeism and Punctuality Analysis">
            <AbsenteeismPunctualityAnalysis
              absenteeismData={absenteeismData}
              punctualityData={punctualityData}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HRDashboard;
