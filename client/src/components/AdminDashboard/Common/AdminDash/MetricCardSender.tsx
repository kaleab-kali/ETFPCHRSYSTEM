import React, { useState } from "react";
import {
  Row,
  Col,
  Flex,
  Button,
  Card,
  Modal,
  Typography,
  Skeleton,
} from "antd";
import { MetricCard } from "../MetricCard"; // Ensure you have MetricCard component defined somewhere
import {
  useEmployees,
  useEmployeesIds,
} from "../../../../services/queries/employeeQueries";
import { EmployeeData } from "../../../../../../shared/types/employeeTypes";
import { PlusOutlined } from "@ant-design/icons";
import CalendarImage from "../../../../assets/CalendarImage.jpg";
import AttendanceGraph from "../AttendanceGraph";
import CalendarComponent from "../../../Calendar/Calendar";
import "../../../../styles/Adminside/parentCardWrapper.css";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;

const calculateMetrics = (data: EmployeeData[]) => {
  
  const today = new Date().toISOString().split("T")[0];
  const totalEmployees = data.length;
  const presentEmployees = data.filter((employee) =>
    employee.attendanceRecords?.some(
      (record) =>
        new Date(record.date).toISOString().split("T")[0] === today &&
        (record.status === "on time" || record.status === "late")
    )
  ).length;
  const employeesOnLeave = data.filter(
    (employee) => employee.leaveInfo?.leaveFlag
  ).length;
  const absentEmployees = totalEmployees - presentEmployees - employeesOnLeave;

  const presentPercentageChange = parseFloat(
    ((presentEmployees / totalEmployees) * 100).toFixed(2)
  );
  const leavePercentageChange = parseFloat(
    ((employeesOnLeave / totalEmployees) * 100).toFixed(2)
  );
  const absentPercentageChange = parseFloat(
    ((absentEmployees / totalEmployees) * 100).toFixed(2)
  );

  return {
    totalEmployees,
    presentEmployees,
    employeesOnLeave,
    absentEmployees,
    totalPercentageChange: 100, // Placeholder for actual logic
    presentPercentageChange,
    leavePercentageChange,
    absentPercentageChange,
  };
};

const EmployeeMetrics = () => {
  const {t} = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const employeesIdQuery = useEmployeesIds();
  const employeeQueries = useEmployees(employeesIdQuery.data);
  const employees: EmployeeData[] = employeeQueries
    .map((query) => query.data)
    .filter((data): data is EmployeeData => data !== undefined);

  const metrics = calculateMetrics(employees);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Flex
      style={{ display: "flex", justifyContent: "start" }}
      align="flex-start"
    >
      <Flex vertical style={{ display: "flex", justifyContent: "start", gap:"20px"}}>
        <Flex vertical={false}>
          <div className="parentCardWrapper" style={{ marginRight: "15px" }}>
            <MetricCard
              title={t('totalEmployee')}
              value={metrics.totalEmployees.toString()}
              percentage={metrics.totalPercentageChange}
              color="1"
            />
          </div>
          <div className="parentCardWrapper" style={{ marginRight: "15px" }}>
            <MetricCard
              title={t('present')}
              value={metrics.presentEmployees.toString()}
              percentage={metrics.presentPercentageChange}
              color="2"
            />
          </div>
          <div className="parentCardWrapper" style={{ marginRight: "15px" }}>
            <MetricCard
              title={t('onLeave')}
              value={metrics.employeesOnLeave.toString()}
              percentage={metrics.leavePercentageChange}
              color="3"
            />
          </div>
          <div className="parentCardWrapper" style={{ marginRight: "15px" }}>
            <MetricCard
              title={t('absent')}
              value={metrics.absentEmployees.toString()}
              percentage={metrics.absentPercentageChange}
              color="4"
            />
          </div>
        </Flex>
      
        <Flex vertical={false}>
          <div className="parentCardWrapper" style={{ marginRight: "15px" }}>
            <MetricCard
              title="ቃሊቲ ማረሚያ ማዕከል"
              value="5"
              percentage={metrics.totalPercentageChange}
              color="1"
            />
          </div>
          <div className="parentCardWrapper" style={{ marginRight: "15px" }}>
            <MetricCard
              title="ቀጠሮ ማረፊያ ማዕከል"
              value="4"
              percentage={metrics.presentPercentageChange}
              color="2"
            />
          </div>
          <div className="parentCardWrapper" style={{ marginRight: "15px" }}>
            <MetricCard
              title="ሴቶች ማረሚያ ማዕከል"
              value="7"
              percentage={metrics.leavePercentageChange}
              color="3"
            />
          </div>
          <div className="parentCardWrapper" style={{ marginRight: "15px" }}>
            <MetricCard
              title="ድሬዳዋ ማረሚያ ማዕከል"
              value="10"
              percentage={metrics.absentPercentageChange}
              color="4"
            />
          </div>
        </Flex>
        
        <div
          style={{
            backgroundColor: "white",
            marginTop: "20px",
            marginRight: "10px",
          }}
        >
          <AttendanceGraph />
        </div>
      </Flex>
      

      <div>
        <Flex>
          <Title level={5} style={{ marginTop: 0 }}>
            {t('recentActivity')}
          </Title>
          {/* three dot icon from antd */}
        </Flex>
        <Flex vertical gap={10}>
          <div className="recentCard">
            <Text style={{ fontWeight: 700 }}>5 new </Text>
            <Text style={{ color: "grey" }}>
              employees registered this week.
            </Text>
          </div>
          <div className="recentCard">
            <Text style={{ fontWeight: 700 }}>5 new </Text>
            <Text style={{ color: "grey" }}>
              employees registered this week.
            </Text>
          </div>
          <div className="recentCard">
            <Text style={{ fontWeight: 700 }}>5 new </Text>
            <Text style={{ color: "grey" }}>
              employees registered this week.
            </Text>
          </div>
          <div className="recentCard">
            <Text style={{ fontWeight: 700 }}>8 people </Text>
            <Text style={{ color: "grey" }}>
              are Abesent this week.
            </Text>
          </div>
          <div className="recentCard">
            <Text style={{ fontWeight: 700 }}>8 people </Text>
            <Text style={{ color: "grey" }}>
              are Abesent this week.
            </Text>
          </div>
          <div className="recentCard">
            <Text style={{ fontWeight: 700 }}>8 people </Text>
            <Text style={{ color: "grey" }}>
              are Abesent this week.
            </Text>
          </div>
        </Flex>
      </div>
      {/* <Title>Recnet ACtivity</Title> */}
      {/* <Card
        style={{
          width: 300,
          textAlign: "center",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
        cover={
          <img
            alt="calendar"
            src={CalendarImage}
            style={{ borderRadius: "50%" }}
          />
        }
        actions={[
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={showModal}
          >
            Add a Calendar
          </Button>,
        ]}
      >
        <Card.Meta title="Calendar" description="Keep track of your schedule" />
      </Card>
      <Modal
        title="Calendar"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <CalendarComponent />
      </Modal> */}
    </Flex>
  );
};

export default EmployeeMetrics;
