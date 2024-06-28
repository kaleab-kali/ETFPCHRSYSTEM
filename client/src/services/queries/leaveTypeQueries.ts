import { useQueries, useQuery } from "@tanstack/react-query";
import { getAllLeaveTypes } from "../api/leaveTypeApi";

// export function useAppraisalIds() {
//   return useQuery({
//     queryKey: ["aprraisal"],
//     queryFn: getAppraisalIds,
//   });
// }
export function useAllleaveTypes() {
  return useQuery({
    queryKey: ["leaveType"],
    queryFn: getAllLeaveTypes,
  });
}
// export function usePerformaces(id:string|undefined) {
//   return useQuery({
//     queryKey: ["performance", { id }],
//     queryFn: () => getPerformance(id!),
//   });
// }