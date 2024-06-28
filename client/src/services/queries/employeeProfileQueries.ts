import { useQuery } from "@tanstack/react-query";
import { getEmployeeProfile } from "../api/employeeProfileApi";

export function useEmployeeProfile() {
  return useQuery({
    queryKey: ["employee"],
    queryFn: ()=>getEmployeeProfile(),
  });
}
