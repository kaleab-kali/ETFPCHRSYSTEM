import React from "react";
import { EmployeeData } from "../../../../../shared/types/employeeTypes";
import DisciplineCard from "./DisciplineCard";
import { useEmployeeCompliantByID } from "../../../services/queries/complaintQueries";
import { ComplaintType } from "../../../../../shared/types/complaintTypes";

interface DisciplineTabProps {
  selectedEmployee?: EmployeeData;
}

const DisciplineTab = ({ selectedEmployee }: DisciplineTabProps) => {
  const employeeComplaint = useEmployeeCompliantByID(selectedEmployee?.empId);

  const filteredComplaints = employeeComplaint.data?.filter(
    (complaint: ComplaintType) =>
      ["inprogress", "guilt", "not guilt"].includes(
        complaint.status?.toLowerCase() || ""
      )
  );

  return (
    <div>
      {filteredComplaints?.map(
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
