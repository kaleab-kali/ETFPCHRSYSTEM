import React, { useState } from "react";
import LeaveCard from "./LeaveCard";
import { EmployeeData } from "../../../../../shared/types/employeeTypes";
import { LeaveInfo } from "../../../../../shared/types/leaveTypes";
import { useFindEmployeeLeaveById } from "../../../services/queries/leaveQueries";
import { Button, Modal, Table } from "antd";

interface LeaveType {
  credit: number;
  used: number;
  available: number | null;
}

interface Balance {
  leaveType: string;
  credit: number;
  used: number;
  available: number;
}

interface LeaveBalance {
  year: number;
  balances: Balance[];
  _id: {
    $oid: string;
  };
}

interface LeaveHistoryTabProps {
  selectedEmployee?: EmployeeData;
}

const LeaveHistoryTab = ({ selectedEmployee }: LeaveHistoryTabProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const singleLeave = useFindEmployeeLeaveById(selectedEmployee?.empId);
  const mapedData = singleLeave.data;

  // Get the latest year leave balance
  const leaveBalances = selectedEmployee?.leaveBalances || [];
  const latestLeaveBalance = leaveBalances.sort((a, b) => b.year - a.year)[0];

  console.log("latestLeaveBalance: ", latestLeaveBalance);
  console.log("leave: ", mapedData);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Leave Type",
      dataIndex: "leaveType",
      key: "leaveType",
    },
    {
      title: "Credit",
      dataIndex: "credit",
      key: "credit",
    },
    {
      title: "Used",
      dataIndex: "used",
      key: "used",
    },
    {
      title: "Available",
      dataIndex: "available",
      key: "available",
    },
  ];

  const dataSource = latestLeaveBalance
    ? latestLeaveBalance.balances.map((balance) => ({
        key: balance.leaveType,
        leaveType: balance.leaveType,
        credit: balance.credit,
        used: balance.used,
        available: balance.available,
      }))
    : [];

  return (
    <div>
      <Button
        type="primary"
        onClick={showModal}
        style={{ position: "fixed", bottom: 20, right: 20, zIndex:10 }}
      >
        Show Leave Credits
      </Button>
      <Modal
        title="Leave Credits"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Table dataSource={dataSource} columns={columns} />
      </Modal>
      {mapedData?.employeeLeaveInfos?.map(
        (leaveInfo: LeaveInfo, index: number) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <LeaveCard key={index} leaveInfo={leaveInfo} />
          </div>
        )
      )}
    </div>
  );
};

export default LeaveHistoryTab;
