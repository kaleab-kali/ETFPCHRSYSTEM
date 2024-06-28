import { ComplaintType } from "../../../../shared/types/complaintTypes";
import {
  fetchWithAuth,
  handleError,
  BASE_URL,
} from "../shared/sharedApi";
export const getAppraisalIds = async () => {
  const response = await fetch(`${BASE_URL}/apprasials`);

  if (!response.ok) {
    throw new Error("Failed to fetch Appraisal IDs");
  }

  const data = await response.json();

  return data;
};

export const getAllComplaints = async () => {
  try {
    const data: ComplaintType[] = await fetchWithAuth(`${BASE_URL}/complaint`);
    console.log(data);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getEmployeeComplaintById = async (id: string) => {
  try {
    const data: ComplaintType[] = await fetchWithAuth(
      `${BASE_URL}/complaint/employee/${id}`
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const createComplaint = async (data: ComplaintType) => {
  try {
    await fetchWithAuth(`${BASE_URL}/complaint`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    handleError(error);
  }
};
