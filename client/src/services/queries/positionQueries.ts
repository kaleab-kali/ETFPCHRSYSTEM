import { useQueries, useQuery } from "@tanstack/react-query";
import { getAllPositions} from "../api/positionApi";

// export function useAppraisalIds() {
//   return useQuery({
//     queryKey: ["aprraisal"],
//     queryFn: getAppraisalIds,
//   });
// }
export function useAllPositions() {
  return useQuery({
    queryKey: ["position"],
    queryFn: getAllPositions,
  });
}
// export function usePerformaces(id:string|undefined) {
//   return useQuery({
//     queryKey: ["performance", { id }],
//     queryFn: () => getPerformance(id!),
//   });
// }