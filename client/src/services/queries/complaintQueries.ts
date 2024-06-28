import { useQueries, useQuery } from "@tanstack/react-query";
import { getAllAppraisals, getAppraisalIds } from "../api/appraisalApi";
import { getAllPerformances, getPerformance } from "../api/performanceApi";
import { getAllComplaints, getEmployeeComplaintById } from "../api/complaintApi";

export function useAppraisalIds() {
  return useQuery({
    queryKey: ["aprraisal"],
    queryFn: getAppraisalIds,
  });
}
export function useAllComplaints() {
  return useQuery({
    queryKey: ["complaint"],
    queryFn: getAllComplaints,
  });
}
export function useEmployeeCompliantByID(id: string | undefined) {
  return useQuery({
    queryKey: ["complaint", { id }],
    queryFn: () => getEmployeeComplaintById(id!),
  });
}
// export function useLeaves(ids: (string | undefined)[] | undefined) {
//   return useQueries({
//     queries: (ids ?? []).map((id) => {
//       return {
//         queryKey: ["leave", { id }],
//         queryFn: () => getLeave(id!),
//       };
//     }),
//   });
// }
// export function useLeave(id: string | undefined) {
//   return useQuery({
//     queryKey: ["leave", { id }],
//     queryFn: () => getSingleLeave(id!),
//   });
// }
// export function useFindEmployeeById(id: string | undefined) {
//   return useQuery({
//     queryKey: ["leave", { id }],
//     queryFn: () => getLeave(id!),
//   });
// }
