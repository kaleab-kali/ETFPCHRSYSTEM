import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useLoading } from "../../context/LoadingContext";
import { createDocument, updateDocument } from "../api/documentApi";

export function useCreateDocument() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => {
      setLoading(true);
      return createDocument(data);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to submit document");
      setLoading(false);
    },
    onSuccess: () => {
      console.log("success");
      message.success("Document submitted successfully");
      setLoading(false);
    },
    onSettled: async (_, error: any, variables: any) => {
      console.log("settled");
      setLoading(false);
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["document"] });
        await queryClient.invalidateQueries({
          queryKey: ["document", { employeeId: variables.employeeId }],
        });
      }
    },
  });
}

export function useUpdateDocument() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => {
      setLoading(true);
      return updateDocument(data);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to update document");
      setLoading(false);
    },
    onSuccess: () => {
      console.log("success");
      message.success("Document updated successfully");
      setLoading(false);
    },
    onSettled: async (_, error: any) => {
      console.log("settled");
      setLoading(false);
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["document"] });
      }
    },
  });
}
