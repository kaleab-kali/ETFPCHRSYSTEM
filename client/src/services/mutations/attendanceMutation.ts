import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCheckInAttendance,
  createCheckOutAttendance,
  createSubmitEvidence,
  updateReviewEvidence,
} from "../api/attendanceApi";
import { IAttendance } from "../../../../shared/types/employeeTypes";
import { message } from "antd";
import { useLoading } from "../../context/LoadingContext";

export function useCreateCheckInAttendance() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string|undefined) => {
      setLoading(true);
      return createCheckInAttendance(id);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to check in attendance");
      setLoading(false);
    },
    onSuccess: () => {
      console.log("success");
      message.success("Checked in attendance successfully");
      setLoading(false);
    },
    onSettled: async (_, error: any) => {
      console.log("settled");
      setLoading(false);
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["attendance"] });
      }
    },
  });
}

export function useCreateCheckOutAttendance() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string|undefined) => {
      setLoading(true);
      return createCheckOutAttendance(id);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to check out attendance");
      setLoading(false);
    },
    onSuccess: () => {
      console.log("success");
      message.success("Checked out attendance successfully");
      setLoading(false);
    },
    onSettled: async (_, error: any) => {
      console.log("settled");
      setLoading(false);
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["attendance"] });
      }
    },
  });
}

export function useCreateSubmitEvidence() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => {
      setLoading(true);
      return createSubmitEvidence(data);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to submit evidence");
      setLoading(false);
    },
    onSuccess: () => {
      console.log("success");
      message.success("Evidence submitted successfully");
      setLoading(false);
    },
    onSettled: async (_, error: any, variables: any) => {
      console.log("settled");
      setLoading(false);
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["attendance"] });
        await queryClient.invalidateQueries({
          queryKey: ["attendance", { employeeId: variables.employeeId }],
        });
      }
    },
  });
}

export function useUpdateReviewEvidence() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IAttendance) => {
      setLoading(true);
      return updateReviewEvidence(data);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to update review evidence");
      setLoading(false);
    },
    onSuccess: () => {
      console.log("success");
      message.success("Review evidence updated successfully");
      setLoading(false);
    },
    onSettled: async (_, error: any) => {
      console.log("settled");
      setLoading(false);
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["attendance"] });
      }
    },
  });
}
