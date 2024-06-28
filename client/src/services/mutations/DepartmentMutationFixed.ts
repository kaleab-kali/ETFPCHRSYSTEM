import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DepartmentInfo } from "../../../../shared/types/departmentTypes";
import {
  createDepartment,
  updateDepartment,
  deleteDepartment,
  updateHeadRoleChange,
  updateAssigneMananger,
  assignManagerToDepartment,
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
      message.error(error.message || "Failed to create department");
      setLoading(false);
    },
    onSuccess: () => {
      message.success("Department created successfully");
      setLoading(false);
    },
    onSettled: async (_, error) => {
      setLoading(false);
      if (error) {
        console.error(error);
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
      return updateDepartment(data);
    },
    onError: (error: any) => {
      message.error(error.message || "Failed to update department");
      setLoading(false);
    },
    onSuccess: () => {
      message.success("Department updated successfully");
      setLoading(false);
    },
    onSettled: async (_, error, variables) => {
      setLoading(false);
      if (error) {
        console.error(error);
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
      message.error(error.message || "Failed to delete department");
      setLoading(false);
    },
    onSuccess: () => {
      message.success("Department deleted successfully");
      setLoading(false);
    },
    onSettled: async (_, error) => {
      setLoading(false);
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["department"] });
      }
    },
  });
}

export function useUpdateRoleDepartmentHead() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => {
      setLoading(true);
      return updateHeadRoleChange(data);
    },
    onError: (error: any) => {
      message.error(error.message || "Failed to update department head role");
      setLoading(false);
    },
    onSuccess: () => {
      message.success("Department head role updated successfully");
      setLoading(false);
    },
    onSettled: async (_, error, variables) => {
      setLoading(false);
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["department"] });
        await queryClient.invalidateQueries({
          queryKey: ["department", { id: variables.departmentID }],
        });
      }
    },
  });
}

export function useAssignManagerToEmployee() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => {
      setLoading(true);
      return updateAssigneMananger(data);
    },
    onError: (error: any) => {
      message.error(error.message || "Failed to assign manager to employee");
      setLoading(false);
    },
    onSuccess: () => {
      message.success("Manager assigned to employee successfully");
      setLoading(false);
    },
    onSettled: async (_, error, variables) => {
      setLoading(false);
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["department"] });
        await queryClient.invalidateQueries({
          queryKey: ["department", { id: variables.departmentID }],
        });
      }
    },
  });
}

export function useAssignManagerToDepartment() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => {
      setLoading(true);
      return assignManagerToDepartment(data);
    },
    onError: (error: any) => {
      message.error(error.message || "Failed to assign manager to department");
      setLoading(false);
    },
    onSuccess: () => {
      message.success("Manager assigned to department successfully");
      setLoading(false);
    },
    onSettled: async (_, error, variables) => {
      setLoading(false);
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["department"] });
        await queryClient.invalidateQueries({
          queryKey: ["department", { id: variables.departmentID }],
        });
      }
    },
  });
}
