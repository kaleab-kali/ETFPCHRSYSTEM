import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InstituteInfo } from "../../../../shared/types/InstitutionTypes";
import {
  createInstitute,
  updateInstitute,
  deleteInstitute,
} from "../api/institutionApi";
import { message } from "antd";
import { useLoading } from "../../context/LoadingContext";

export function useCreateInstitution() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: InstituteInfo) => {
      setLoading(true);
      return createInstitute(data);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to create institution");
      setLoading(false);
    },
    onSuccess: () => {
      console.log("success");
      message.success("Institution created successfully");
      setLoading(false);
    },
    onSettled: async (_, error: any) => {
      console.log("settled");
      setLoading(false);
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["institution"] });
      }
    },
  });
}

export function useUpdateInstitution() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: InstituteInfo) => {
      setLoading(true);
      console.log("Data before mutation:", data);
      return updateInstitute(data);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to update institution");
      setLoading(false);
    },
    onSuccess: (data, variables) => {
      console.log("Successfully updated Institution");
      message.success("Institution updated successfully");
      queryClient.invalidateQueries({ queryKey: ["institution"] });
      if (variables.instituteId) {
        queryClient.invalidateQueries({
          queryKey: ["institution", { id: variables.instituteId }],
        });
      }
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
  });
}

export function useDeleteInstitution() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {
      setLoading(true);
      return deleteInstitute(id);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to delete institution");
      setLoading(false);
    },
    onSuccess: () => {
      console.log("Successfully deleted Institution");
      message.success("Institution deleted successfully");
      setLoading(false);
    },
    onSettled: async (_, error: any) => {
      setLoading(false);
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["institution"] });
      }
    },
  });
}
