import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TitleInfo } from "../../../../shared/types/titlesTypes";
import { createTitle, updateTitle, deleteTitle } from "../api/titlesApi";
import { message } from "antd";
import { useLoading } from "../../context/LoadingContext";

export function useCreateTitle() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TitleInfo) => {
      setLoading(true);
      return createTitle(data);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to create title");
      setLoading(false);
    },
    onSuccess: () => {
      console.log("success");
      message.success("Title created successfully");
      setLoading(false);
    },
    onSettled: async (_: any, error: any) => {
      console.log("settled");
      setLoading(false);
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["title"] });
      }
    },
  });
}

export function useUpdateTitle() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TitleInfo) => {
      setLoading(true);
      console.log("Data before mutation:", data);
      return updateTitle(data);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to update title");
      setLoading(false);
    },
    onSuccess: (result: any, variables) => {
      console.log("Successfully updated Title");
      message.success("Title updated successfully");
      queryClient.invalidateQueries({ queryKey: ["title"] });
      queryClient.invalidateQueries({
        queryKey: ["title", { id: variables.titleId }],
      });
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
  });
}

export function useDeleteTitle() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {
      setLoading(true);
      return deleteTitle(id);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to delete title");
      setLoading(false);
    },
    onSuccess: () => {
      console.log("Successfully deleted Title");
      message.success("Title deleted successfully");
      setLoading(false);
    },
    onSettled: async (_: any, error: any) => {
      setLoading(false);
      if (error) {
        console.log(error);
      } else {
        // await queryClient.invalidateQueries({ queryKey: ["title"] });
      }
    },
  });
}
