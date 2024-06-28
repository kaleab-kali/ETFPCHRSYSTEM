import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createHoliday } from "../api/calendarApi";
import { message } from "antd";
import { useLoading } from "../../context/LoadingContext";

interface CalendarEntry {
  date: string; // The date in "YYYY-MM-DD" format
  description: string; // The description of the calendar entry
}

export function useCreateHoliday() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CalendarEntry) => {
      setLoading(true);
      return createHoliday(data);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to create holiday");
      setLoading(false);
    },
    onSuccess: () => {
      console.log("success");
      message.success("Holiday created successfully");
      setLoading(false);
    },
    onSettled: async (_, error: any) => {
      console.log("settled");
      setLoading(false);
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["calendar"] });
      }
    },
  });
}