import { useQuery } from "@tanstack/react-query";
import { getDocument, getDocumentById } from "../api/documentApi";

export function useDocument() {
  return useQuery({
    queryKey: ["document"],
    queryFn: getDocument,
  });
}

export function useDocumentById(id:string) {
  return useQuery({
    queryKey: ["document"],
    queryFn: ()=>getDocumentById(id),
  });
}

