import { useQueries, useQuery } from "@tanstack/react-query";
import { getAllTitles } from "../api/titlesApi";

// export function useAppraisalIds() {
//   return useQuery({
//     queryKey: ["aprraisal"],
//     queryFn: getAppraisalIds,
//   });
// }
export function useAllTitles() {
  return useQuery({
    queryKey: ["title"],
    queryFn: getAllTitles,
  });
}
// export function usePerformaces(id:string|undefined) {
//   return useQuery({
//     queryKey: ["performance", { id }],
//     queryFn: () => getPerformance(id!),
//   });
// }