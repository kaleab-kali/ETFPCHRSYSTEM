import { ComplaintType } from "../../../../shared/types/complaintTypes";
import {
  fetchWithAuth,
  handleError,
  BASE_URL,
  fetchWithOutAuth,
} from "../shared/sharedApi";
export const getComplaintforForm = async () => {
  const response = await fetch(`${BASE_URL}/complaintType`);

  if (!response.ok) {
    throw new Error("Failed to fetch cmplaint for the form");
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

export const updateTransferComplaint = async (data: Object) => {
  try {
    await fetchWithOutAuth(`${BASE_URL}/complaint/transfer`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    handleError(error);
  }
};
export const updateValidateComplaint = async (data: Object) => {
  try {
    await fetchWithAuth(`${BASE_URL}/complaint/validate`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    handleError(error);
  }
};
interface edvi{
  id: string,
  reason:string,
}
export const updateEvidenceComplaint = async (data: FormData) => {
  try {
    await fetchWithOutAuth(`${BASE_URL}/complaint/evidence`, {
      method: "POST",
      body: data,
    });
  } catch (error) {
    handleError(error);
  }
};

export const updateFinalizeComplaint = async (data: Object) => {
  try {
    await fetchWithAuth(`${BASE_URL}/complaint/finalize`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    handleError(error);
  }
};
