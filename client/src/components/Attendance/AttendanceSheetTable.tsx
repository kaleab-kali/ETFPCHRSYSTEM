import React, { useState, useEffect } from "react";
import { Table, Avatar, Select, Tag, Spin, Alert, Skeleton } from "antd";
import { ColumnsType } from "antd/es/table";
import { useMonthAttendance } from "../../services/queries/attendanceQueries";
import { UserOutlined } from "@ant-design/icons";

interface AttendanceData {
  name: string;
  avatar: string;
  attendance: ("On Time" | "Absent" | "Permission" | "Late")[];
}

const monthDays = {
  January: 31,
  February: 28,
  March: 31,
  April: 30,
  May: 31,
  June: 30,
  July: 31,
  August: 31,
  September: 30,
  October: 31,
  November: 30,
  December: 31,
};

const getMonthName = (monthIndex: number): keyof typeof monthDays => {
  return Object.keys(monthDays)[monthIndex] as keyof typeof monthDays;
};

const columnsGenerator = (daysInMonth: number): ColumnsType<AttendanceData> => [
  {
    title: "Employee Name",
    dataIndex: "name",
    key: "name",
    width: 180,
    fixed: "left",
    render: (text, record) => (
      <div>
        <Avatar src={record.avatar} icon={!record.avatar && <UserOutlined />} />
        {text}
      </div>
    ),
  },
  ...Array.from({ length: daysInMonth }, (_, i) => ({
    title: `${i + 1}`,
    dataIndex: "attendance",
    key: `day-${i + 1}`,
    width: 50,
    render: (attendance: any) => {
      const status = attendance[i];
      let color = "";
      let text = "";
      switch (status) {
        case "On Time":
          color = "green";
          text = "✓";
          break;
        case "Late":
          color = "yellow";
          text = "✓";
          break;
        case "Absent":
          color = "red";
          text = "✗";
          break;
        case "Permission":
          color = "orange";
          text = "P";
          break;
        default:
          text = "";
      }
      return <Tag color={color}>{text}</Tag>;
    },
  })),
];

const AttendanceSheetTable: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const currentMonthIndex = new Date().getMonth();
  const currentMonth = getMonthName(currentMonthIndex);

  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [selectedMonth, setSelectedMonth] =
    useState<keyof typeof monthDays>(currentMonth);
  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const {
    data,
    isLoading,
    isError,
    error: fetchError,
    refetch,
  } = useMonthAttendance(selectedYear, selectedMonth);

  const handleYearChange = (value: number) => {
    setSelectedYear(value);
  };

  const handleMonthChange = (value: string) => {
    setSelectedMonth(value as keyof typeof monthDays);
  };

  useEffect(() => {
    refetch();
  }, [selectedYear, selectedMonth, refetch]);

  useEffect(() => {
    if (data) {
      const transformedData = transformAttendanceData(data, selectedMonth);
      setAttendanceData(transformedData);
      setLoading(false);
    }
    if (isError) {
      setError(fetchError?.message);
      setLoading(false);
    }
  }, [data, isError, fetchError]);

  const transformAttendanceData = (
    data: any[],
    month: keyof typeof monthDays
  ) => {
    const daysInMonth = monthDays[month];
    const attendanceMap: { [key: string]: AttendanceData } = {};

    data.forEach((record) => {
      const date = new Date(record.date);
      const day = date.getDate() - 1; // Get the day of the month (0-indexed)

      if (!attendanceMap[record.name]) {
        attendanceMap[record.name] = {
          name: record.name,
          avatar: record.avatar,
          attendance: Array(daysInMonth).fill(""), // Initialize with empty strings
        };
      }

      attendanceMap[record.name].attendance[day] =
        record.attendance.charAt(0).toUpperCase() + record.attendance.slice(1);
    });

    return Object.values(attendanceMap);
  };

  const daysInMonth = monthDays[selectedMonth];
  const columns = columnsGenerator(daysInMonth);

  return (
    <div>
      <Select
        defaultValue={currentYear}
        style={{ width: 200, marginBottom: 20, marginRight: 20 }}
        onChange={handleYearChange}
      >
        {Array.from({ length: 10 }, (_, i) => currentYear - i).map((year) => (
          <Select.Option key={year} value={year}>
            {year}
          </Select.Option>
        ))}
      </Select>
      <Select
        defaultValue={currentMonth}
        style={{ width: 200, marginBottom: 20 }}
        onChange={handleMonthChange}
      >
        {Object.keys(monthDays).map((month) => (
          <Select.Option key={month} value={month}>
            {month}
          </Select.Option>
        ))}
      </Select>
      {loading ? (
        <Skeleton active />
      ) : error ? (
        <Alert message={error} type="error" />
      ) : (
        <Table
          columns={columns}
          dataSource={attendanceData}
          pagination={{ pageSize: 7 }} // Pagination with 7 rows per page
          scroll={{ x: daysInMonth * 55 }} // Adjust the scroll width based on the number of days
        />
      )}
    </div>
  );
};

export default AttendanceSheetTable;
