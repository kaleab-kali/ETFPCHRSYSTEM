import { InstituteInfo } from "../../../../shared/types/InstitutionTypes";
import {
  fetchWithAuth,
  handleError,
  BASE_URL,
} from "../shared/sharedApi";

export const getAllInstitutes = async () => {
  try {
    const data: InstituteInfo[] = await fetchWithAuth(`${BASE_URL}/institute`);
    console.log(data);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getInstitute = async (id: string) => {
  try {
    const data: InstituteInfo = await fetchWithAuth(
      `${BASE_URL}/institute/${id}`
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const createInstitute = async (data: InstituteInfo) => {
  try {
    await fetchWithAuth(`${BASE_URL}/institute`, {
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

export const updateInstitute = async (data: InstituteInfo) => {
  try {
    await fetchWithAuth(`${BASE_URL}/institute/${data.instituteId}`, {
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

export const deleteInstitute = async (id: string) => {
  try {
    await fetchWithAuth(`${BASE_URL}/institute/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    handleError(error);
  }
};
