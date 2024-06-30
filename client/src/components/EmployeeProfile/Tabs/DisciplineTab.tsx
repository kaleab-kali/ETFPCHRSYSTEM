import React from "react";
import { EmployeeData } from "../../../../../shared/types/employeeTypes";
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
  const employeeComplaint = useEmployeeCompliantByID(selectedEmployee?.empId)
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
