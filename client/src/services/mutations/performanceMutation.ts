import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPerformance } from "../api/performanceApi";
import { EvaluationData } from "../../../../shared/types/performaceTypes";
import { message } from "antd";
import { useLoading } from "../../context/LoadingContext";

export function useCreatePerformance() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: EvaluationData) => {
      setLoading(true);
      return createPerformance(data);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to create performance");
      setLoading(false);
    },
    onSuccess: () => {
      console.log("success");
      message.success("Performance created successfully");
      setLoading(false);
    },
    onSettled: async (_: any, error: any) => {
      console.log("settled");
      setLoading(false);
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["performance"] });
      }
    },
  });
}
