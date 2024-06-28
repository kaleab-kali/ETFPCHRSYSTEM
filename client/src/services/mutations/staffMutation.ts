import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { StaffData } from "../../../../shared/types/Staff";
import {
  createStaff,
  passwordResetApproval,
  updateSelfPassword,
  updateStaff,
} from "../api/staffApi";
import { message } from "antd";
import { useLoading } from "../../context/LoadingContext";

export function useCreateStaff() {
    const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => {
            setLoading(true);
      return createStaff(data);
    },
    onError: (error: any) => {
      setLoading(false);
      console.error("Error creating staff:", error);
      message.error(error.message || "Failed to create staff");
    },
    onSuccess: (data: any) => {
      setLoading(false);
      console.log("Successfully created staff");
      message.success("Staff created successfully");
      queryClient.invalidateQueries({ queryKey: ["staff"] });
    },
    onSettled: async (_: any, error: any) => {
      setLoading(false);
      if (error) {
        console.error("Error on settle:", error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["staff"] });
      }
    },
  });
}

export function useUpdateStaff() {
    const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => {
            setLoading(true);
      console.log("Data before mutation:", data);
      return updateStaff(data);
    },
    onError: (error: any) => {
      setLoading(false);
      console.error("Error updating satff:", error);
      message.error(error.message || "Failed to update staff");
    },
    onSuccess: () => {
      setLoading(false);
      console.log("Successfully updated staff");
      message.success("staff updated successfully");
      queryClient.invalidateQueries({ queryKey: ["staff"] });
    },
    onSettled: async (_: any, error: any, variables) => {
      setLoading(false);
      console.log("Settled");
      if (error) {
        console.error("Error on settle:", error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["staff", { id: variables }],
        });
      }
    },
  });
}

export function useUpdateSelfPassword() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => {
      console.log("Data before mutation:", data);
      return updateSelfPassword(data);
    },
    onError: (error: any) => {
      console.error("Error updating password:", error);
      message.error(error.message || "Failed to update password");
    },
    onSuccess: () => {
      console.log("Successfully updated password");
      message.success("password updated successfully");
      // queryClient.invalidateQueries({ queryKey: ["password"] });
    },
    onSettled: async (_: any, error: any, variables: { email: any }) => {
      console.log("Settled");
      if (error) {
        console.error("Error on settle:", error);
      } else {
        await queryClient.invalidateQueries({
          // queryKey: ["password", { id: variables.email }],
        });
      }
    },
  });
}

export function usePasswordResetApproval() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => {
      console.log("Data before mutation:", data);
      return passwordResetApproval(data);
    },
    onError: (error: any) => {
      console.error("Error request approval:", error);
      message.error(error.message || "Failed to send request approval");
    },
    onSuccess: () => {
      console.log("Successfully sent approval request");
      message.success("Successfully sent approval request");
      // queryClient.invalidateQueries({ queryKey: ["password"] });
    },
    onSettled: async (_: any, error: any) => {
      console.log("Settled");
      if (error) {
        console.error("Error on settle:", error);
      } else {
        await queryClient.invalidateQueries({
          // queryKey: ["password", { id: variables.email }],
        });
      }
    },
  });
}

