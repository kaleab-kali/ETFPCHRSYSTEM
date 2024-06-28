import { useQueries, useQuery } from "@tanstack/react-query";
import { getAllEmployees, getDepartmentHeadEmployee, getEmployee, getEmployeeEmpID, getEmployeeIds, getManagerEmployee } from "../api/employeeApi";

export function useEmployeesIds() {
  return useQuery({
    queryKey: ["employees"],
    queryFn: getEmployeeIds,
    refetchInterval: 500,
  });
}
export function useAllEmployees() {
  return useQuery({
    queryKey: ["employees"],
    queryFn: getAllEmployees,
    refetchInterval: 500,
  });
}
export function useEmployees(ids: (string | undefined)[] | undefined) {
  return useQueries({
    queries: (ids ?? []).map((id) => {
      return {
        queryKey: ["employee", { id }],
        queryFn: () => getEmployee(id!),
        enabled: !!id,
        refetchInterval: 500,
      };
    }),
  });
}
export function useFindEmployeeById(id: string | undefined) {
  return useQuery({
    queryKey: ["employee", {id}],
    queryFn: () => getEmployee(id!),
  });
}

export function useDepartmentHeadEmployee(id: string | undefined) {
  return useQuery({
    queryKey: ["employee", { id }],
    queryFn: () => getDepartmentHeadEmployee(id!),
  });
}
export function useManagerEmployee(id: string | undefined) {
  return useQuery({
    queryKey: ["employee", { id }],
    queryFn: () => getManagerEmployee(id!),
  });
}

export function useFindEmployeeByEmpId(id: string | undefined) {
  return useQuery({
    queryKey: ["employee", { id }],
    queryFn: () => getEmployeeEmpID(id!),
  });
}
