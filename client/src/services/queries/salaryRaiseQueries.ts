import { useQueries, useQuery } from "@tanstack/react-query";
import { getAllAppraisals, getAppraisalIds } from "../api/appraisalApi";
import { getAllPerformances, getPerformance } from "../api/performanceApi";
import { getAllSalaryRaises } from "../api/salaryRaiseApi";

// export function useAppraisalIds() {
//   return useQuery({
//     queryKey: ["aprraisal"],
//     queryFn: getAppraisalIds,
//   });
// }
export function useAllSalaryRaises() {
  return useQuery({
    queryKey: ["salaryRaise"],
    queryFn: getAllSalaryRaises,
  });
}
// export function useSalaryRaise(id: string | undefined) {
//   return useQuery({
//     queryKey: ["performance", { id }],
//     queryFn: () => getPerformance(id!),
//   });
// }
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
