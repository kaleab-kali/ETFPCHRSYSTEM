import { useQueries, useQuery } from "@tanstack/react-query";
import { getAllInstitutes} from "../api/institutionApi";

// export function useAppraisalIds() {
//   return useQuery({
//     queryKey: ["aprraisal"],
//     queryFn: getAppraisalIds,
//   });
// }
export function useAllInsitutions() {
  return useQuery({
    queryKey: ["institution"],
    queryFn: getAllInstitutes,
  });
}
// export function usePerformaces(id:string|undefined) {
//   return useQuery({
//     queryKey: ["performance", { id }],
//     queryFn: () => getPerformance(id!),
//   });
// }