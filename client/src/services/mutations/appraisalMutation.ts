import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAppraisal, createNewAppraisal } from "../api/appraisalApi";
import { Appraisal, Appraisal2 } from "../../../../shared/types/appraisalTypes";
import { message } from "antd";
import { useLoading } from "../../context/LoadingContext";

export function useCreateAppraisal() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Appraisal) => {
      // setLoading(true);
      return createAppraisal(data);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to create appraisal");
      setLoading(false);
    },
    onSuccess: () => {
      console.log("success");
      message.success("Appraisal created successfully");
      setLoading(false);
    },
    onSettled: async (_, error: any) => {
      console.log("settled");
      setLoading(false);
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["appraisals"] });
      }
    },
  });
}

export function useCreateNewAppraisal() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Appraisal2) => {
      setLoading(true);
      return createNewAppraisal(data);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to create new appraisal");
      setLoading(false);
    },
    onSuccess: () => {
      console.log("success");
      message.success("New appraisal created successfully");
      setLoading(false);
    },
    onSettled: async (_, error: any) => {
      console.log("settled");
      setLoading(false);
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["appraisals"] });
      }
    },
  });
}
