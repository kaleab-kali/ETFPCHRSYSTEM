import React, { useState } from "react";
import { Table, Button, Select, InputNumber, Modal } from "antd";
import {
  useEmployeesIds,
  useEmployees,
} from "../../services/queries/employeeQueries";
import { useUpdateLeaveBalances } from "../../services/mutations/leaveMutation";
import { useAuth } from "../../context/AuthContext";
import { ColumnsType } from "antd/es/table";

type LeaveType =
  | "annual"
  | "family"
  | "paternity"
  | "health"
  | "maternity"
  | "study";

interface LeaveBalance {
  year: string;
  balances: Balance[];
  _id: {
    $oid: string;
  };
}

interface Balance {
  leaveType: LeaveType;
  credit: number;
  used: number;
  available: number;
  _id?: {
    $oid: string;
  };
}

interface Employee {
  empId: string;
  firstName: string;
  lastName: string;
  leaveBalances: LeaveBalance[];
}

interface TableEmployee {
  key: string;
  empId: string;
  name: string;
  year: string;
  leaveBalances: Record<string, Record<LeaveType, Balance>>;
}

const getColumnGroup = (
  title: string,
  dataIndex: string[],
  year: string,
  type: LeaveType,
  handleChange: (
    empId: string,
    year: string,
    type: LeaveType,
    field: keyof Balance,
    value: number
  ) => void,
  currentYear: string
) => ({
  title,
  children: [
    {
      title: "Credit",
      dataIndex: [...dataIndex, year, type, "credit"],
      key: `${dataIndex.join("_")}_${type}_Credit`,
      width: 100,
      render: (text: number, record: TableEmployee) => (
        <InputNumber
          min={0}
          value={text}
          onChange={(value) =>
            value !== null &&
            handleChange(record.empId, year, type, "credit", value)
          }
          disabled={year !== currentYear}
        />
      ),
    },
    {
      title: "Used",
      dataIndex: [...dataIndex, year, type, "used"],
      key: `${dataIndex.join("_")}_${type}_Used`,
      width: 100,
      render: (text: number, record: TableEmployee) => (
        <InputNumber
          min={0}
          value={text}
          disabled
          onChange={(value) =>
            value !== null &&
            handleChange(record.empId, year, type, "used", value)
          }
        />
      ),
    },
    {
      title: "Available",
      dataIndex: [...dataIndex, year, type, "available"],
      key: `${dataIndex.join("_")}_${type}_Available`,
      width: 100,
      render: (text: number, record: TableEmployee) => (
        <InputNumber
          min={0}
          value={text}
          disabled
          onChange={(value) =>
            value !== null &&
            handleChange(record.empId, year, type, "available", value)
          }
        />
      ),
    },
  ],
});

const LeaveBalanceTable: React.FC = () => {
  const employeeId = useEmployeesIds();
  const employees = useEmployees(employeeId.data) || [];
  const updateEmployeeBalance = useUpdateLeaveBalances();
  const [yearDisplayed, setYearDisplayed] = useState<string>("2024");
  const [updatedBalances, setUpdatedBalances] = useState<
    Record<string, Record<string, Record<LeaveType, Partial<Balance>>>>
  >({});
  const {user}=useAuth()

  const handleChange = (
    empId: string,
    year: string,
    type: LeaveType,
    field: keyof Balance,
    value: number
  ) => {
    setUpdatedBalances((prev) => ({
      ...prev,
      [empId]: {
        ...prev[empId],
        [year]: {
          ...prev[empId]?.[year],
          [type]: {
            ...prev[empId]?.[year]?.[type],
            [field]: value,
          },
        },
      },
    }));
  };

  const handleSave = (record: TableEmployee) => {
    Modal.confirm({
      title: "Are you sure you want to update these values?",
      onOk: () => {
        const updated = updatedBalances[record.empId]?.[record.year];
        if (updated) {
          Object.entries(updated).forEach(([leaveType, values]) => {
            const payload = {
              empId: record.empId,
              name: record.name,
              year: record.year,
              leaveType: leaveType as LeaveType,
              updatedValues: {
                credit: values.credit!,
                used: values.used!,
              },
            };
            updateEmployeeBalance.mutate(payload);
          });
        }
      },
    });
  };

  const dataSource = employees
    .map((employee) => {
      if (!employee.data) return null;

      const leaveBalances =
        employee.data.leaveBalances &&
        employee.data.leaveBalances.reduce((acc, leaveBalance) => {
          acc[leaveBalance.year] = leaveBalance.balances.reduce(
            (innerAcc: any, balance) => {
              innerAcc[balance.leaveType as LeaveType] = balance;
              return innerAcc;
            },
            {} as Record<LeaveType, Balance>
          );
          return acc;
        }, {} as Record<string, Record<LeaveType, Balance>>);

      return {
        key: employee.data.empId || "",
        empId: employee.data.empId || "",
        name: `${employee.data.firstName} ${employee.data.lastName}`,
        year: yearDisplayed,
        leaveBalances,
      };
    })
    .filter(Boolean) as TableEmployee[];

  const handleYearFilterChange = (value: string) => {
    setYearDisplayed(value);
  };

  const years = Array.from(
    new Set(
      employees.flatMap(
        (employee) =>
          employee.data?.leaveBalances?.map((balance) => balance.year) || []
      )
    )
  );

  const columns: ColumnsType = [
    {
      title: "ID",
      width: 100,
      dataIndex: "empId",
      key: "id",
      fixed: "left" as "left",
    },
    {
      title: "Name",
      width: 100,
      dataIndex: "name",
      key: "name",
      fixed: "left" as "left",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      width: 100,
      fixed: "left" as "left",
      filters: years.map((year) => ({
        text: year.toString(),
        value: year.toString(),
      })),
      onFilter: (value: any, record: TableEmployee) =>
        record.year === value.toString(),
      filterDropdown: ({ setSelectedKeys, confirm, clearFilters }: any) => (
        <div style={{ padding: 8 }}>
          <Select
            style={{ width: 120 }}
            onChange={(value) => {
              setSelectedKeys([value]);
              handleYearFilterChange(value);
            }}
            onBlur={confirm}
            defaultValue=""
          >
            {years.map((year) => (
              <Select.Option key={year} value={year.toString()}>
                {year}
              </Select.Option>
            ))}
          </Select>
          <Button
            type="primary"
            onClick={() => {
              setSelectedKeys([]);
              handleYearFilterChange("");
              clearFilters();
            }}
            size="small"
            style={{ marginTop: 8, width: 90 }}
          >
            Reset
          </Button>
        </div>
      ),
    },
    getColumnGroup(
      "Annual",
      ["leaveBalances"],
      yearDisplayed,
      "annual",
      handleChange,
      yearDisplayed
    ),
    getColumnGroup(
      "Family",
      ["leaveBalances"],
      yearDisplayed,
      "family",
      handleChange,
      yearDisplayed
    ),
    getColumnGroup(
      "Paternity",
      ["leaveBalances"],
      yearDisplayed,
      "paternity",
      handleChange,
      yearDisplayed
    ),
    getColumnGroup(
      "Health",
      ["leaveBalances"],
      yearDisplayed,
      "health",
      handleChange,
      yearDisplayed
    ),
    getColumnGroup(
      "Maternity",
      ["leaveBalances"],
      yearDisplayed,
      "maternity",
      handleChange,
      yearDisplayed
    ),
    getColumnGroup(
      "Education",
      ["leaveBalances"],
      yearDisplayed,
      "study",
      handleChange,
      yearDisplayed
    ),
    // {
    //   title: "Action",
    //   key: "action",
    //   width: 100,
    //   fixed: "right" as "right",
    //   render: (_: any, record: TableEmployee) => (
    //     <Button onClick={() => handleSave(record)}>Save</Button>
    //   ),
    // },
  ];
  if (user?.role === "manager" || user?.role === "staff") {
    columns.push({
      title: "Action",
      key: "action",
      width: 100,
      fixed: "right" as "right",
      render: (_: any, record: TableEmployee) => (
        <Button onClick={() => handleSave(record)}>Save</Button>
      ),
    });
  }

  return (
    <>
      <Table columns={columns} dataSource={dataSource} scroll={{ x: 1300 }} />
    </>
  );
};

export default LeaveBalanceTable;
