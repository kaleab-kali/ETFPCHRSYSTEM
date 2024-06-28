import { useQueries, useQuery } from "@tanstack/react-query";
import {
  getAllAppraisals,
  getAllCandidateAppraisals,
  getAppraisalById,
  getAppraisalIds,
} from "../api/appraisalApi";

export function useAppraisalIds() {
  return useQuery({
    queryKey: ["aprraisal"],
    queryFn: getAppraisalIds,
  });
}
export function useAllAppraisal() {
  return useQuery({
    queryKey: ["aprraisal"],
    queryFn: getAllAppraisals,
  });
}
export function useAllCandidateAppraisal() {
  return useQuery({
    queryKey: ["aprraisal"],
    queryFn: getAllCandidateAppraisals,
    refetchInterval: 500,
  });
}
export function useAppraisalById(id: string | undefined) {
  return useQuery({
    queryKey: ["appraisal", { id }],
    queryFn: () => getAppraisalById(id!),
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
