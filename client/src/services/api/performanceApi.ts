import { EvaluationData } from "../../../../shared/types/performaceTypes";
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

export const getAllPerformances = async () => {
  try {
    const data: EvaluationData[] = await fetchWithAuth(
      `${BASE_URL}/evaluation`
    );
    console.log(data);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getPerformance = async (id: string) => {
  try {
    const data: EvaluationData = await fetchWithAuth(
      `${BASE_URL}/employees/evaluation/${id}`
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const createPerformance = async (data: EvaluationData) => {
  try {
    await fetchWithAuth(`${BASE_URL}/employees/evaluation/${data.employeeId}`, {
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
