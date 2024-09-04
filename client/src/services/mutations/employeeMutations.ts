import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import { EmployeeData } from "../../../../shared/types/employeeTypes";
import {
  createEmployee,
  createUpload,
  // deleteEmployee,
  deactivateEmployee,
  updateEmployee,
} from "../api/employeeApi";
import { message } from "antd";
import { useLoading } from "../../context/LoadingContext";
import { EmployeeProfileInfo } from "../../../../shared/types/employeeProfileModel";

export function useCreateEmployee() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => {
      setLoading(true);
      return createEmployee(data);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to create employee");
      setLoading(false);
    },
    onSuccess: () => {
      console.log("success");
      message.success("Employee created successfully");
      setLoading(false);
    },
    onSettled: async (_, error: any) => {
      console.log("settled");
      setLoading(false);
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["employees"] });
      }
    },
  });
}

export function useCreateUpload() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => {
      setLoading(true);
      return createUpload(data);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to upload file");
      setLoading(false);
    },
    onSuccess: (data: { filePath: any; fileName: any }) => {
      console.log("Success");
      console.log("File uploaded successfully:", data.filePath);
      console.log("File Name:", data.fileName);
      message.success("File uploaded successfully");
      setLoading(false);
    },
    onSettled: async (_, error: any) => {
      console.log("settled");
      setLoading(false);
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["uploads"] });
      }
    },
  });
}

export function useUpdateEmployee(
  options?: UseMutationOptions<void, Error, EmployeeData, unknown>
) {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: EmployeeData) => {
      setLoading(true);
      console.log("Data before mutation:", data);
      return updateEmployee(data);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to update employee");
      setLoading(false);
    },
    onSuccess: (data, variables) => {
      console.log("Successfully updated employee");
      message.success("Employee updated successfully");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({
        queryKey: ["employee", { id: variables._id }],
      });
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
    ...options,
  });
}

export function useDeleteEmployee() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {id: string, status: string, reason: string}) => {
      setLoading(true);
      return deactivateEmployee(data);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to delete employee");
      setLoading(false);
    },
    onSuccess: () => {
      console.log("Successfully deleted employee");
      message.success("Employee deleted successfully");
      setLoading(false);
    },
    onSettled: async (_, error: any) => {
      setLoading(false);
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["employees"] });
      }
    },
  });
}
