import { useQueries, useQuery } from "@tanstack/react-query";
import { getAllLeaveBalances, getAllLeaveBalancesByYear, getAllLeaves, getLeave, getLeaveIds, getSingleLeave, getTransferAllLeaves, getUnderDepartmentHeadLeave, getUnderManagerLeave } from "../api/leaveApi";
import { LeaveBalance } from "../../../../shared/types/leaveTypes";

export function useLeaveIds() {
  return useQuery({
    queryKey: ["leaves"],
    queryFn: getLeaveIds,
  });
}
export function useAllLeaves() {
  return useQuery({
    queryKey: ["leaves"],
    queryFn: getAllLeaves,
  });
}
export function useTransferAllLeaves() {
  return useQuery({
    queryKey: ["leaveTransfer"],
    enabled: false,
    queryFn: getTransferAllLeaves,
  });
}
export function useAllLeaveBalances() {
  return useQuery({
    queryKey: ["leavesBalances"],
    queryFn: getAllLeaveBalances,
  });
}
export function useAllLeaveBalancesByYear(data:LeaveBalance) {
  return useQuery({
    queryKey: ["leavesBalances"],
    queryFn: ()=>getAllLeaveBalancesByYear(data),
  });
}
export function useLeaves(ids: (string | undefined)[] | undefined) {
  return useQueries({
    queries: (ids ?? []).map((id) => {
      return {
        queryKey: ["leave", { id }],
        queryFn: () => getLeave(id!),
      };
    }),
  });
}
export function useLeave(id: string | undefined) {
  return useQuery({
    queryKey: ["leave", { id }],
    queryFn: () => getLeave(id!),
    refetchInterval:500
  });
}

export function useUnderDepartmentHeadLeave(id: string | undefined) {
  return useQuery({
    queryKey: ["leave", { id }],
    queryFn: () => getUnderDepartmentHeadLeave(id!),
    refetchInterval:500
  });
}
export function useUnderManagerLeave(id: string | undefined) {
  return useQuery({
    queryKey: ["leave", { id }],
    queryFn: () => getUnderManagerLeave(id!),
    refetchInterval:500,
  });
}
export function useFindEmployeeLeaveById(id: string | undefined) {
  return useQuery({
    queryKey: ["leave", { id }],
    queryFn: () => getSingleLeave(id!),
  });
}
