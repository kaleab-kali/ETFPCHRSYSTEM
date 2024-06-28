import React from "react";
import { Card, Col, Flex, Row } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  UserDeleteOutlined,
  ClockCircleOutlined,
  CaretDownOutlined,
  CaretUpOutlined
} from "@ant-design/icons";
import {
  useEmployees,
  useEmployeesIds,
} from "../../../services/queries/employeeQueries";

// Dummy data (replace with actual data)
const dummyData = {
  totalWorkForce: 1000,
  presentWorkForce: 800,
  absentWorkForce: 200,
  lateArrivals: 50,
  lastUpdated: new Date(),
  workforceChange: 5,
  workforceChange2: -5,
  // Example: 5% decrease
};

const CardComp: React.FC = () => {
  const employeesIds = useEmployeesIds();
  const employees = useEmployees(employeesIds.data);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1); // Get yesterday's date

  const todayDateString = today.toISOString().split("T")[0];
  const yesterdayDateString = yesterday.toISOString().split("T")[0];

  let presentToday = 0;
  let absentToday = 0;
  let lateToday = 0;

  let presentYesterday = 0;
  let absentYesterday = 0;
  let lateYesterday = 0;
  // Loop through each employee to count attendance
  employees.forEach((employee) => {
    const attendanceRecords = employee.data && employee.data.attendanceRecords || [];
    attendanceRecords.forEach((record) => {
      const recordDate = new Date(record.date);
      const recordDateString = recordDate.toISOString().split("T")[0];
      if (recordDateString === todayDateString) {
        if (record.status === "on time") {
          presentToday++;
        } else if (record.status === "absent") {
          absentToday++;
        } else if (record.status === "late") {
          lateToday++;
        }
      } else if (recordDateString === yesterdayDateString) {
        if (record.status === "on time") {
          presentYesterday++;
        } else if (record.status === "absent") {
          absentYesterday++;
        } else if (record.status === "late") {
          lateYesterday++;
        }
      }
    });
  });
const presentDifference = presentToday - presentYesterday;
const absentDifference = absentToday - absentYesterday;
const lateDifference = lateToday - lateYesterday;
  // Calculate total employees
  const totalWorkForce = employees.length;

  const {
    // totalWorkForce,
    // presentWorkForce,
    // absentWorkForce,
    // lateArrivals,
    lastUpdated,
    workforceChange,
    workforceChange2,
  } = dummyData;

  const renderPercentageChange = (change: number): string => {
    const sign = change > 0 ? "+" : "";
    return `${sign}${change}%`;
  };

  const cardStyle = {
    background: "lightblue",
    color: "blue",
    padding: "7px",
    borderRadius: "30%",
  };

  return (
    <div >
      <Row gutter={16}>
        <Col span={6}>
          <Card
            title={
              <>
                <TeamOutlined style={cardStyle} /> Total WorkForce
              </>
            }
            bordered={false}
            headStyle={{ border: "none" }}
          >
            <Flex
              align="center"
              justify="space-between"
              style={{ marginTop: "-20px" }}
            >
              <div
                style={{
                  fontSize: "30px",
                  marginBottom: "10px",
                  fontWeight: "bold",
                }}
              >
                {totalWorkForce}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "red",
                  backgroundColor: "#FFC6C8",
                  borderRadius: "20%",
                  paddingRight: "10px",
                  paddingLeft: "10px",
                }}
              >
                <CaretDownOutlined />
                {renderPercentageChange(workforceChange2)}
              </div>
            </Flex>

            <div style={{ fontSize: "12px", color: "lightgray" }}>
              Update: {lastUpdated.toLocaleString()}
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title={
              <>
                <UserOutlined style={cardStyle} /> Present WorkForce
              </>
            }
            bordered={false}
            headStyle={{ border: "none" }}
          >
            <Flex
              align="center"
              justify="space-between"
              style={{ marginTop: "-20px" }}
            >
              <div
                style={{
                  fontSize: "30px",
                  marginBottom: "10px",
                  fontWeight: "bold",
                }}
              >
                {presentToday}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "green",
                  backgroundColor: "lightgreen",
                  borderRadius: "20%",
                  paddingRight: "10px",
                  paddingLeft: "10px",
                }}
              >
                <CaretUpOutlined />
                {renderPercentageChange(presentDifference)}
              </div>
            </Flex>

            <div style={{ fontSize: "12px", color: "lightgray" }}>
              Update: {lastUpdated.toLocaleString()}
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title={
              <>
                <UserDeleteOutlined style={cardStyle} /> Absent WorkForce
              </>
            }
            bordered={false}
            headStyle={{ border: "none" }}
          >
            <Flex
              align="center"
              justify="space-between"
              style={{ marginTop: "-20px" }}
            >
              <div
                style={{
                  fontSize: "30px",
                  marginBottom: "10px",
                  fontWeight: "bold",
                }}
              >
                {absentToday}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "green",
                  backgroundColor: "lightgreen",
                  borderRadius: "20%",
                  paddingRight: "10px",
                  paddingLeft: "10px",
                }}
              >
                <CaretUpOutlined />
                {renderPercentageChange(absentDifference)}
              </div>
            </Flex>

            <div style={{ fontSize: "12px", color: "lightgray" }}>
              Update: {lastUpdated.toLocaleString()}
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title={
              <>
                <ClockCircleOutlined style={cardStyle} /> Late Arrivals
              </>
            }
            bordered={false}
            headStyle={{ border: "none" }}
          >
            <Flex
              align="center"
              justify="space-between"
              style={{ marginTop: "-20px" }}
            >
              <div
                style={{
                  fontSize: "30px",
                  marginBottom: "10px",
                  fontWeight: "bold",
                }}
              >
                {lateToday}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "red",
                  backgroundColor: "#FFC6C8",
                  borderRadius: "20%",
                  paddingRight: "10px",
                  paddingLeft: "10px",
                }}
              >
                <CaretDownOutlined />
                {renderPercentageChange(lateDifference)}
              </div>
            </Flex>
            <div style={{ fontSize: "12px", color: "lightgray" }}>
              Update: {lastUpdated.toLocaleString()}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CardComp;
