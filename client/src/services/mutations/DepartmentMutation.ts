import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DepartmentInfo } from "../../../../shared/types/departmentTypes";
import {
  createDepartment,
  updateDepartment,
  deleteDepartment,
  updateHeadRoleChange,
} from "../api/departmentApi";
import { message } from "antd";
import { useLoading } from "../../context/LoadingContext";

export function useCreateDepartment() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DepartmentInfo) => {
      setLoading(true);
      return createDepartment(data);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to create department");
      setLoading(false);
    },
    onSuccess: () => {
      console.log("success");
      message.success("Department created successfully");
      setLoading(false);
    },
    onSettled: async (_, error: any) => {
      console.log("settled");
      setLoading(false);
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["department"] });
      }
    },
  });
}

export function useUpdateDepartment() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DepartmentInfo) => {
      setLoading(true);
      console.log("Data before mutation:", data);
      return updateDepartment(data);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to update department");
      setLoading(false);
    },
    onSuccess: (
      result,
      variables
    ) => {
      console.log("Successfully updated Department");
      message.success("Department updated successfully");
      queryClient.invalidateQueries({ queryKey: ["department"] });
      queryClient.invalidateQueries({
        queryKey: ["department", { id: variables.departmentID }],
      });
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
  });
}



export function useUpdateRoleDepartmentHead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => {
      console.log("Data before mutation:", data);
      return updateHeadRoleChange(data);
    },
    onSuccess() {
      console.log("Successfully updated Department Head");
    },
    onSettled: async (_, error, variables) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["department"] });
        await queryClient.invalidateQueries({
          queryKey: ["department", { id: variables.departmentID }],
        });
      }
    },
  });
}
export function useDeleteDepartment() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {
      setLoading(true);
      return deleteDepartment(id);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to delete department");
      setLoading(false);
    },
    onSuccess: () => {
      console.log("Successfully deleted Department");
      message.success("Department deleted successfully");
      setLoading(false);
    },
    onSettled: async (_, error: any) => {
      setLoading(false);
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["department"] });
      }
    },
  });
}