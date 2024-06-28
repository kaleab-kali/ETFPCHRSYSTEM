import { useState } from "react";
import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

export const useNotificationHandler = () => {
  const [loading, setLoading] = useState(false);

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

  const startLoading = () => {
    console.log("startLoading called");
    setLoading(true);
  };

  const stopLoading = () => {
    console.log("stopLoading called");
    setLoading(false);
  };

  return {
    loading,
    startLoading,
    stopLoading,
    openNotificationWithIcon,
  };
};
