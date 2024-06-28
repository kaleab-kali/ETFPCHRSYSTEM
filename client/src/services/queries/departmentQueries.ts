import { useQueries, useQuery } from "@tanstack/react-query";
import { getAllDepartments} from "../api/departmentApi";

// export function useAppraisalIds() {
//   return useQuery({
//     queryKey: ["aprraisal"],
//     queryFn: getAppraisalIds,
//   });
// }
export function useAllDepartments() {
  return useQuery({
    queryKey: ["department"],
    queryFn: getAllDepartments,
  });
}
// export function usePerformaces(id:string|undefined) {
//   return useQuery({
//     queryKey: ["performance", { id }],
//     queryFn: () => getPerformance(id!),
//   });
// }