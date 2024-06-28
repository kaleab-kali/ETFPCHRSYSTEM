import {useQuery } from "@tanstack/react-query";

import { getAllHrStaff, getStaff } from "../api/staffApi";

export function useAllStaff() {
  return useQuery({
    queryKey: ["staff"],
    queryFn: getAllHrStaff,
    refetchInterval:500
  });
}
export function useStaff() {
  return useQuery({
    queryKey: ["staff"],
    queryFn: getStaff,
    refetchInterval:500
  });
}
