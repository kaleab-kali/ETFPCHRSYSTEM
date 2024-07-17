import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SalaryRaiseType } from "../../../../shared/types/salaryRaiseTypes";
import { createSalaryRaise, updateSalaryRaise } from "../api/salaryRaiseApi";
import { message } from "antd";
import { useLoading } from "../../context/LoadingContext";

export function useCreateSalaryRaise() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      setLoading(true);
      return createSalaryRaise();
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to create salary raise");
      setLoading(false);
    },
    onSuccess: () => {
      console.log("success");
      message.success("Salary raise created successfully");
      setLoading(false);
    },
    onSettled: async (_: any, error: any) => {
      console.log("settled");
      setLoading(false);
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["salaryRaise"] });
      }
    },
  });
}

export function useUpdateSalaryRaise() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SalaryRaiseType) => {
      setLoading(true);
      console.log("Data before mutation:", data);
      return updateSalaryRaise(data);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to update salary raise");
      setLoading(false);
    },
    onSuccess: (result: any, variables) => {
      console.log("Successfully updated Salary Raise");
      message.success("Salary raise updated successfully");
      queryClient.invalidateQueries({ queryKey: ["salaryRaise"] });
      queryClient.invalidateQueries({
        queryKey: ["salaryRaise", { id: variables.employeeId }],
      });
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
  });
}
