import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LeaveTypeInfo } from "../../../../shared/types/leaveTypes";
import { createLeaveType, updateLeaveType, deleteLeaveType } from "../api/leaveTypeApi";
import { message } from "antd";
import { useLoading } from "../../context/LoadingContext";

export function useCreateLeaveType() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LeaveTypeInfo) => {
      setLoading(true);
      return createLeaveType(data);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to create leave type");
      setLoading(false);
    },
    onSuccess: () => {
      console.log("success");
      message.success("Leave type created successfully");
      setLoading(false);
    },
    onSettled: async (_, error: any) => {
      console.log("settled");
      setLoading(false);
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["leaveType"] });
      }
    },
  });
}

export function useUpdateLeaveType() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LeaveTypeInfo) => {
      setLoading(true);
      console.log("Data before mutation:", data);
      return updateLeaveType(data);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to update leave type");
      setLoading(false);
    },
    onSuccess: (result: any, variables) => {
      console.log("Successfully updated leave type");
      message.success("Leave type updated successfully");
      queryClient.invalidateQueries({ queryKey: ["leaveType"] });
      queryClient.invalidateQueries({
        queryKey: ["leaveType", { id: variables._id }],
      });
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
  });
}

export function useDeleteLeaveType() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {
      setLoading(true);
      return deleteLeaveType(id);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to delete leaveType");
      setLoading(false);
    },
    onSuccess: () => {
      console.log("Successfully deleted leaveType");
      message.success("LeaveType deleted successfully");
      setLoading(false);
    },
    onSettled: async (_, error: any) => {
      setLoading(false);
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["leaveType"] });
      }
    },
  });
}