import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ComplaintType } from "../../../../shared/types/complaintTypes";
import { createComplaint } from "../api/complaintApi";
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
