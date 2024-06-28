import React from "react";
import LeaveRequestsTable from "./leaveTableprop";
import {
  useAllLeaves,
  useLeaveIds,
  useLeaves,
  useUnderDepartmentHeadLeave,
  useUnderManagerLeave,
} from "../../services/queries/leaveQueries";
import { LeaveInfo } from "../../../../shared/types/leaveTypes";
import {
  useUpdateLeave,
  useDeleteLeave,
} from "../../services/mutations/leaveMutation";
import { message } from "antd";
import { useAuth } from "../../context/AuthContext";

interface LeaveRequest {
  // _id: string;
  reason: string | undefined; // Allow 'undefined' as a possible value
  from: Date | undefined;
  to: Date | undefined;
  status: string | undefined;
  employeeId: string | undefined;
  leaveType: string | undefined;
  employee:
    | {
        firstName: string | undefined;
        email: string | undefined;
        gender: string | undefined;
        department: string | undefined;
      }
    | undefined;
}


const LeaveApproval = () => {
  const {user}=useAuth()
  const leaveIdQuery = useLeaveIds();
  const allLeaves = useAllLeaves();
  const departmentHead=useUnderDepartmentHeadLeave(user?.employeeId||"")
  const manager = useUnderManagerLeave(user?.employeeId || "");
  const leaves = user?.role==="manager" ?manager : user?.role==="department head" ? departmentHead : allLeaves; 
  console.log("All leaves "+ JSON.stringify(leaves?.data))
  const mappedLeaves: LeaveRequest[] = leaves.data
    ? leaves.data.map((leave: any) => ({
        // _id: leave._id,
        leaveId:leave.leaveId,
        reason: leave.reason,
        from: leave.from,
        to: leave.to,
        status: leave.status,
        employeeId: leave.employeeId,
        leaveType: leave.leaveType,
        employee: leave.employee
          ? {
              firstName: leave.employee.fullName,
              email: leave.employee.email,
              gender: leave.employee.gender,
              department: leave.employee.department,
            }
          : undefined,
      }))
    : [];
      console.log("mapped leaves:", mappedLeaves);
      mappedLeaves.forEach((leaf, index) => {
        console.log(`Leaf ${index + 1}:`, leaf);
      });
  const deleteLeaveMutation = useDeleteLeave();
  const updateLeaveMutation = useUpdateLeave();

  const handleApprove = (empId: string, leaveId:string, delegatedTo:string) => {
    // const leaveIdToUpdate = id;
    updateLeaveMutation.mutate({
      employeeId: empId,
      leaveId: leaveId,
      status: "approved",
      delegatedTo: delegatedTo,
      // leaveFlag: true,
    });
    console.log(`Leave request ${empId} approved`);
    // message.success("Leave request approved successfully!");
    // deleteLeaveMutation.mutate(id);
  };

  const handleReject = (empId: string, leaveId:string, reason:string) => {
    // const leaveIdToUpdate = empId;
    updateLeaveMutation.mutate({
      employeeId: empId,
      leaveId: leaveId,
      status: "rejected",
      reason: reason,
      // leaveFlag: false,
    });
    console.log(`Leave request ${leaveId} rejected`);
    // message.warning("Leave request rejected successfully!");
    // deleteLeaveMutation.mutate(id);
  };

  return (
    <>
      <h1 style={{ padding: "0 24px" }}>Leave Approval</h1>
      <div style={{ padding: "24px" }}>
        <LeaveRequestsTable
          data={mappedLeaves}
          onReject={handleReject}
          onApprove={handleApprove}
        />
      </div>
    </>
  );
};

export default LeaveApproval;
