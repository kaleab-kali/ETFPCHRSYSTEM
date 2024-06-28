import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createLeave,
  deleteLeave,
  updateLeave,
  updateLeaveBalances,
} from "../api/leaveApi";
import { LeaveBalance, LeaveInfo } from "../../../../shared/types/leaveTypes";
import { message } from "antd";
import { useLoading } from "../../context/LoadingContext";

export function useCreateLeave() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LeaveInfo) => {
      setLoading(true);
      return createLeave(data);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to create leave");
      setLoading(false);
    },
    onSuccess: () => {
      console.log("success");
      message.success("Leave created successfully");
      setLoading(false);
    },
    onSettled: async (_, error: any) => {
      console.log("settled");
      setLoading(false);
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["leaves"] });
      }
    },
  });
}

export function useUpdateLeave() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LeaveInfo) => {
      setLoading(true);
      console.log("Data before mutation:", data);
      return updateLeave(data);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to update leave");
      setLoading(false);
    },
    onSuccess: (result: any, variables) => {
      console.log("Successfully updated leave");
      message.success("Leave updated successfully");
      queryClient.invalidateQueries({ queryKey: ["leaves"] });
      queryClient.invalidateQueries({
        queryKey: ["leaves", { id: variables.employeeId }],
      });
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
  });
}

export function useUpdateLeaveBalances() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LeaveBalance) => {
      setLoading(true);
      console.log("Data before mutation:", data);
      return updateLeaveBalances(data);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to update leave balance");
      setLoading(false);
    },
    onSuccess: (result: any, variables: { empId: any }, context: any) => {
      console.log("Successfully updated leave balance");
      message.success("Leave balance updated successfully");
      queryClient.invalidateQueries({ queryKey: ["leaves"] });
      queryClient.invalidateQueries({
        queryKey: ["leaves", { id: variables.empId }],
      });
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
  });
}

export function useDeleteLeave() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {
      setLoading(true);
      return deleteLeave(id);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to delete leave");
      setLoading(false);
    },
    onSuccess: () => {
      console.log("Successfully deleted leave");
      message.success("Leave deleted successfully");
      setLoading(false);
    },
    onSettled: async (_, error: any) => {
      setLoading(false);
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["leaves"] });
      }
    },
  });
}
