import { useQueries, useQuery } from "@tanstack/react-query";
import { getCalendar } from "../api/calendarApi";

export function useAllCalendars() {
  return useQuery({
    queryKey: ["calendar"],
    queryFn: getCalendar,
  });
}

