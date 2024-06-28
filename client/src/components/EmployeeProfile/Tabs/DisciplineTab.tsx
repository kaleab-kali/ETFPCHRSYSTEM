import React from "react";
import LeaveCard from "./LeaveCard";
import { EmployeeData } from "../../../../../shared/types/employeeTypes";
import { LeaveInfo } from "../../../../../shared/types/leaveTypes";
import { useFindEmployeeLeaveById } from "../../../services/queries/leaveQueries";
import DisciplineCard from "./DisciplineCard";
import { useEmployeeCompliantByID } from "../../../services/queries/complaintQueries";
import { ComplaintType } from "../../../../../shared/types/complaintTypes";
interface DisciplineTabProps {
  selectedEmployee?: EmployeeData;
}
interface Complaint {
  employeeId?: string;
  category?: string;
  complaint?: string;
  description?: string;
  complaintId?: string;
  status?: string;
}
const DisciplineTab = ({ selectedEmployee }: DisciplineTabProps) => {
  //  const leaveIdQuery = useLeaveIds();
  // const dummyComplaints: Complaint[] = [
  //   {
  //     complaintDate: "2024-05-09",
  //     complaintCategory: "Conduct and Behavior",
  //     complaint: "Harassment",
  //     description:
  //       "The military police officer harassed me during a routine check.",
  //     status: "High",
  //   },
  //   {
  //     complaintDate: "2024-05-08",
  //     complaintCategory: "Performance and Duty-related",
  //     complaint: "Inefficiency",
  //     description:
  //       "The military police officers were inefficient in handling a security breach.",
  //     status: "Medium",
  //   },
  //   {
  //     complaintDate: "2024-05-07",
  //     complaintCategory: "Rights Violations",
  //     complaint: "Illegal Search and Seizure",
  //     description:
  //       "The military police conducted an illegal search and seizure without a warrant.",
  //     status: "High",
  //   },
  //   {
  //     complaintDate: "2024-05-06",
  //     complaintCategory: "Policy and Procedure",
  //     complaint: "Violation of SOPs",
  //     description:
  //       "The military police violated standard operating procedures during an arrest.",
  //     status: "Low",
  //   },
  //   {
  //     complaintDate: "2024-05-05",
  //     complaintCategory: "Communication and Interaction",
  //     complaint: "Lack of Professionalism",
  //     description:
  //       "The military police officer displayed a lack of professionalism during a confrontation.",
  //     status: "Medium",
  //   },
  // ];
  const employeeComplaint = useEmployeeCompliantByID(selectedEmployee?.empId)
  // const singleLeave = useFindEmployeeLeaveById(selectedEmployee?.empId);
  // const mapedData = singleLeave.data;
  // console.log("employee: " + mapedData);
  //   const leaveQueries = useLeaves(leaveIdQuery.data);
  // const leaveInfosToDisplay: LeaveInfo[] = leaveQueries
  //   .filter(
  //     (queryResult) => queryResult.isSuccess && queryResult.data !== undefined
  //   )
  //   .flatMap((queryResult) =>
  //     Array.isArray(queryResult.data)
  //       ? queryResult.data
  //           .filter((leave) => leave.employeeId === selectedEmployee?._id) // Filter by selected employee's ID
  //           .map((leave) => ({
  //             _id: leave._id,
  //             reason: leave.reason,
  //             from: leave?.from,
  //             to: leave?.to,
  //             employee: leave.employee
  //               ? {
  //                   firstName: leave.employee.firstName,
  //                   email: leave.employee.email,
  //                   gender: leave.employee.gender,
  //                   department: leave.employee.department,
  //                 }
  //               : undefined,
  //             status: selectedEmployee?.leaveInfo?.status || undefined,
  //             leaveType: selectedEmployee?.leaveInfo?.leaveType || undefined,
  //           }))
  //       : []
  //   );
  // Filter leave info with the selected employee's ID
  // const leaveInfosToDisplay: LeaveInfo[] = leaveQueries.filter(
  //   (leave) => leave.employeeId === selectedEmployee?._id
  // );

  return (
    <div>
      {employeeComplaint.data?.map(
        (complaint: ComplaintType, index: React.Key | null | undefined) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <DisciplineCard key={index} complaint={complaint} />
          </div>
        )
      )}
    </div>
  );
};

export default DisciplineTab;
