import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNotification } from "../api/notificationApi";
import { message } from "antd";
import { INotification2 } from "../../../../shared/types/Notification";
import { useLoading } from "../../context/LoadingContext";

export function useUpdateNotification() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: INotification2) => {
      setLoading(true);
      console.log("Data before mutation:", data);
      return updateNotification(data);
    },
    onError: (error: any) => {
      setLoading(false);
      console.error("Error updating notification:", error);
    //   message.error(error.message || "Failed to update notification");
    },
    onSuccess: () => {
      setLoading(false);
      console.log("Successfully updated notification");
    //   message.success("notification updated successfully");
      queryClient.invalidateQueries({ queryKey: ["notification"] });
    },
    onSettled: async (_: any, error: any, variables) => {
      console.log("Settled");
      setLoading(false);
      if (error) {
        console.error("Error on settle:", error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["product", { id: variables.id }],
        });
      }
    },
  });
}
