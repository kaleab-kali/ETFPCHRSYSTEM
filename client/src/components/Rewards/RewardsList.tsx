import React from "react";
import { SalaryRaiseType } from "../../../../shared/types/salaryRaiseTypes";
import {
  useUpdateLeave,
  useDeleteLeave,
} from "../../services/mutations/leaveMutation";
import { message } from "antd";
import { useAllSalaryRaises } from "../../services/queries/salaryRaiseQueries";
import { useUpdateSalaryRaise } from "../../services/mutations/salaryRaiseMutation";
import RewardsTable from "./RewardsTable";

interface SalaryRaise {
  // _id: string;
  employeeId?: string;
  title?: string;
  currentSalary?: number;
  newSalary?: number;
  salaryRaiseTime?: Date;
  status?: string;

}

const RewardsList = () => {
  const allSalaryRaise = useAllSalaryRaises();
  console.log("All leaves " + allSalaryRaise?.data);
  const mappedSalaryRaise: SalaryRaise[] = allSalaryRaise.data
    ? allSalaryRaise.data.map((salaryR: SalaryRaiseType) => ({
        // _id: leave._id,
        title: salaryR.title,
        newSalary: salaryR.newSalary,
        currentSalary: salaryR.currentSalary,
        status: salaryR.status,
        employeeId: salaryR.employeeId,
        salaryRaiseTime: salaryR.salaryRaiseTime,
      }))
    : [];
  console.log("mapped raise:");
  mappedSalaryRaise.forEach((leaf, index) => {
    console.log(`Leaf ${index + 1}:`, leaf);
  });
  const updateSalaryRaiseMutation = useUpdateSalaryRaise();
  const handleApprove = (id: string) => {
    const raiseIdToUpdate = id;
    updateSalaryRaiseMutation.mutate({
      employeeId: raiseIdToUpdate,
      status: "accepted",
    });
    console.log(`Raise request ${id} approved`);
    if(updateSalaryRaiseMutation.status === "success"){
    message.success("Raise request approved successfully!");
    }
    if (updateSalaryRaiseMutation.status === "error") {
      message.error("Raise request not approved, Error!");
    }

  };

  const handleReject = (id: string) => {
    const raiseIdToUpdate = id;
    updateSalaryRaiseMutation.mutate({
      employeeId: raiseIdToUpdate,
      status: "rejected",
    });
    console.log(`Raise request ${id} rejected`);
    message.warning("Raise request rejected successfully!");
    // deleteLeaveMutation.mutate(id);
  };

  return (
    <>
      <h1 style={{ padding: "0 24px" }}>Salary Raise Approval</h1>
      <div style={{ padding: "24px" }}>
        <RewardsTable
          data={mappedSalaryRaise}
          onReject={handleReject}
          onApprove={handleApprove}
        />
      </div>
    </>
  );
};

export default RewardsList;
