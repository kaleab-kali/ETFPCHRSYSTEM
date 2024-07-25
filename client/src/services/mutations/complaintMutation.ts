import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ComplaintType } from "../../../../shared/types/complaintTypes";
import { createComplaint, updateEvidenceComplaint, updateFinalizeComplaint, updateTransferComplaint, updateValidateComplaint } from "../api/complaintApi";
import { message } from "antd";
import { useLoading } from "../../context/LoadingContext";

export function useCreateComplaint() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ComplaintType) => {
      setLoading(true);
      return createComplaint(data);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to create complaint");
      setLoading(false);
    },
    onSuccess: () => {
      console.log("success");
      message.success("Complaint created successfully");
      setLoading(false);
    },
    onSettled: async (_, error: any) => {
      console.log("settled");
      setLoading(false);
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["complaint"] });
      }
    },
  });
}

export function useUpdateTransferComplaint() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Object) => {
      setLoading(true);
      return updateTransferComplaint(data);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to transfer complaint");
      setLoading(false);
    },
    onSuccess: () => {
      console.log("success");
      message.success("Complaint transferd successfully");
      setLoading(false);
    },
    onSettled: async (_, error: any) => {
      console.log("settled");
      setLoading(false);
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["complaint"] });
      }
    },
  });
}

export function useUpdateValidateComplaint() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Object) => {
      setLoading(true);
      return updateValidateComplaint(data);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to Validate complaint");
      setLoading(false);
    },
    onSuccess: () => {
      console.log("success");
      message.success("Complaint Validated successfully");
      setLoading(false);
    },
    onSettled: async (_, error: any) => {
      console.log("settled");
      setLoading(false);
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["complaint"] });
      }
    },
  });
}

export function useUpdateEvidenceComplaint() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => {
      setLoading(true);
      return updateEvidenceComplaint(data);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to submit complaint evidence ");
      setLoading(false);
    },
    onSuccess: () => {
      console.log("success");
      message.success("Complaint evidence submited successfully");
      setLoading(false);
    },
    onSettled: async (_, error: any) => {
      console.log("settled");
      setLoading(false);
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["complaint"] });
      }
    },
  });
}
export function useUpdateFinalizeComplaint() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Object) => {
      setLoading(true);
      return updateFinalizeComplaint(data);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to finalize complaint");
      setLoading(false);
    },
    onSuccess: () => {
      console.log("success");
      message.success("Complaint finalized successfully");
      setLoading(false);
    },
    onSettled: async (_, error: any) => {
      console.log("settled");
      setLoading(false);
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["complaint"] });
      }
    },
  });
}