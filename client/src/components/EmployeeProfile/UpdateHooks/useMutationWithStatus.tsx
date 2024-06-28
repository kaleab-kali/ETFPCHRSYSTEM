import { useState } from "react";
import { message, notification } from "antd";
import { UseMutationResult } from "@tanstack/react-query";

interface UseMutationWithStatusProps {
  onSuccess?: () => void;
  onError?: () => void;
  onSettled?: () => void;
}
interface HasEmpId {
  empId: string; // Assuming empId is a string
}
type NotificationType = "success" | "info" | "warning" | "error";

export function useMutationWithStatus<TData, TError, TVariables extends HasEmpId, TContext>(
  mutationFn: UseMutationResult<TData, TError, TVariables, TContext>,
  { onSuccess, onError, onSettled }: UseMutationWithStatusProps = {}
) {
  const [isLoading, setIsLoading] = useState(false);

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string,
    description: string
  ) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  const mutate = async (variables: TVariables) => {
    setIsLoading(true);
    mutationFn.mutate(variables, {
      onSuccess: (data, variables, context) => {
        setIsLoading(false);
        openNotificationWithIcon(
          "success",
          "Operation successful",
          `The operation was successful.${JSON.stringify(variables.empId)}`
        );
        if (onSuccess) onSuccess();
      },
      onError: (error, variables, context) => {
        setIsLoading(false);
        openNotificationWithIcon(
          "error",
          "Operation failed",
          `An error occurred: ${(error as Error).message}`
        );
        if (onError) onError();
      },
      onSettled: (data, error, variables, context) => {
        setIsLoading(false);
        if (onSettled) onSettled();
      },
    });
  };

  return { mutate, isLoading };
}
