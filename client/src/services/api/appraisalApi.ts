import { Appraisal, Appraisal2 } from "../../../../shared/types/appraisalTypes";
import {
  fetchWithAuth,
  handleError,
  BASE_URL,
} from "../shared/sharedApi";

export const getAppraisalIds = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/apprasials`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getAppraisalById = async (id: string) => {
  try {
    const data: Appraisal2[] = await fetchWithAuth(
      `${BASE_URL}/appraisalHistory/employee/${id}`
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllAppraisals = async () => {
  try {
    const data: Appraisal2[] = await fetchWithAuth(
      `${BASE_URL}/appraisalHistory`
    );
    console.log(data);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllCandidateAppraisals = async () => {
  try {
    const data: Appraisal[] = await fetchWithAuth(`${BASE_URL}/apprasials/all`);
    console.log(data);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const createAppraisal = async (data: Appraisal2) => {
  try {
    await fetchWithAuth(`${BASE_URL}/apprasials`, {
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

export const createNewAppraisal = async (data: Appraisal2) => {
  try {
    await fetchWithAuth(`${BASE_URL}/appraisalHistory`, {
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
