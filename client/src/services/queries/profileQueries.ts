import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/profileApi";

export function useProfile() {
  return useQuery({
    queryKey: ["staff"],
    queryFn: getProfile,
  });
}

