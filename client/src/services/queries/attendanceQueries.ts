import { useQuery } from "@tanstack/react-query";
import {
  fetchRecentActivities,
   getAttendances,
   getDepartmentHeadAttendances,
   getDepartmentHeadSubmittedEvidenceAttendances,
   getHeadAttendances,
   getManagerAttendances,
   getManagerEvidenceAttendances,
   getMonthAttendances,
   getSubmittedEvidenceAttendances
} from "../api/attendanceApi";

export function useAttendance() {
  return useQuery({
    queryKey: ["attendances"],
    queryFn: getAttendances,
  });
}
export function useDepartmentHeadAttendance(id:string) {
  console.log("useDepartmentHeadAttendance",id)
  return useQuery({
    queryKey: ["attendance", { id }],
    queryFn: () => getDepartmentHeadAttendances(id!),
    refetchInterval:500
  });
}
export function useHeadAttendance(id: string | undefined) {
  console.log("useHeadAttendance", id);
  return useQuery({
    queryKey: ["attendance", { id }],
    queryFn: () => getHeadAttendances(id!),
    refetchInterval: 500,
  });
}
export function useManagerAttendance(id: string) {
  return useQuery({
    queryKey: ["attendance", { id }],
    queryFn: () => getManagerAttendances(id!),
    refetchInterval:500
  });
}

export function useDepartmentHeadSubmittedEvidenceAttendance(id: string) {
  return useQuery({
    queryKey: ["submitedEvidence", { id }],
    queryFn: () => getDepartmentHeadSubmittedEvidenceAttendances(id!),
    refetchInterval:500
  });
}

export function useManagerSubmittedEvidenceAttendance(id: string) {
  return useQuery({
    queryKey: ["submitedEvidence", { id }],
    queryFn: () => getManagerEvidenceAttendances(id),
    refetchInterval:500
  });
}

export function useMonthAttendance(year:number,month:string) {
  return useQuery({
    queryKey: ["monthAttendances"],
    queryFn: () => getMonthAttendances(year,month),
    refetchInterval: false,
  });
}

export function useSubmittedEvidenceAttendance() {
  return useQuery({
    queryKey: ["submitedEvidence"],
    queryFn: getSubmittedEvidenceAttendances,
  });
}
export const useRecentActivities = () => {
  return useQuery({
    queryKey:["recentActivities"], 
    queryFn:fetchRecentActivities,
    refetchInterval: 60000, // Polling every 60 seconds
  });
};