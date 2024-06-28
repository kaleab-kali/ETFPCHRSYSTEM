import { useQueries, useQuery } from "@tanstack/react-query";
import {
  getNotification
} from "../api/notificationApi";

export function useNotification(id: string | undefined) {
  console.log("useNotification");
  return useQuery({
    queryKey: ["notification", { id }],
    queryFn: () => getNotification(id!),
    refetchInterval:500,
  });
}
