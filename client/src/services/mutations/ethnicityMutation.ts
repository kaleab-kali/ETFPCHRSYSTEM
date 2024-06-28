import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PositionInfo } from "../../../../shared/types/positionTypes";
import {
  createPosition,
  updatePosition,
  deletePosition,
} from "../api/positionApi";
import { message } from "antd";
import { useLoading } from "../../context/LoadingContext";

export function useCreatePosition() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PositionInfo) => {
      setLoading(true);
      return createPosition(data);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to create position");
      setLoading(false);
    },
    onSuccess: () => {
      console.log("success");
      message.success("Position created successfully");
      setLoading(false);
    },
    onSettled: async (_, error: any) => {
      console.log("settled");
      setLoading(false);
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["position"] });
      }
    },
  });
}

export function useUpdatePosition() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PositionInfo) => {
      setLoading(true);
      console.log("Data before mutation:", data);
      return updatePosition(data);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to update position");
      setLoading(false);
    },
    onSuccess: (result: any, variables) => {
      console.log("Successfully updated Position");
      message.success("Position updated successfully");
      queryClient.invalidateQueries({ queryKey: ["position"] });
      queryClient.invalidateQueries({
        queryKey: ["position", { id: variables.posId }],
      });
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
  });
}

export function useDeletePosition() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {
      setLoading(true);
      return deletePosition(id);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to delete position");
      setLoading(false);
    },
    onSuccess: () => {
      console.log("Successfully deleted Position");
      message.success("Position deleted successfully");
      setLoading(false);
    },
    onSettled: async (_, error: any) => {
      setLoading(false);
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["position"] });
      }
    },
  });
}
