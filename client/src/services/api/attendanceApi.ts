import { IAttendance } from "../../../../shared/types/employeeTypes";
import {
  fetchWithAuth,
  handleError,
  BASE_URL,
} from "../shared/sharedApi";

export const getAttendances = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/attendance`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getDepartmentHeadAttendances = async (id:string) => {
  console.log("getDepartmentHeadAttendance", id);

  try {
    const data = await fetchWithAuth(`${BASE_URL}/attendance/departmentHead/${id}`);
  console.log("returned", data);

    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getHeadAttendances = async (id: string) => {
  
  try {
    console.log("getHeadAttendance", id);
    const data = await fetchWithAuth(
      `${BASE_URL}/attendance/departmentHead/${id}`
    );
    console.log("returned", data);

    return data;
  } catch (error) {
    handleError(error);
  }
};
export const getManagerAttendances = async (id: string) => {
  try {
    const data = await fetchWithAuth(
      `${BASE_URL}/attendance/manager/${id}`
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};
export const getMonthAttendances = async (year: number, month: string) => {
  try {
    const data = await fetchWithAuth(
      `${BASE_URL}/attendance/month?year=${year}&month=${month}`
    );
    console.log("Month Attendance " + JSON.stringify(data));
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getSubmittedEvidenceAttendances = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/attendance/pending-review`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getDepartmentHeadSubmittedEvidenceAttendances = async (id:string) => {
  try {
    const data = await fetchWithAuth(
      `${BASE_URL}/attendance/pending-review/departmentHead/${id}`
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getManagerEvidenceAttendances = async (
  id: string
) => {
  try {
    const data = await fetchWithAuth(
      `${BASE_URL}/attendance/pending-review/manager/${id}`
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const createSubmitEvidence = async (data: FormData) => {
  try {
    await fetchWithAuth(`${BASE_URL}/attendance/submit-evidence`, {
      method: "POST",
      body: data,
    });
  } catch (error) {
    handleError(error);
  }
};

export const updateReviewEvidence = async (data: IAttendance) => {
  try {
    await fetchWithAuth(`${BASE_URL}/attendance/review-evidence`, {
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

export const createCheckInAttendance = async (id: string|undefined) => {
  try {
    await fetchWithAuth(`${BASE_URL}/attendance/checkIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ employeeId: id }),
    });
  } catch (error) {
    handleError(error);
  }
};

export const createCheckOutAttendance = async (id: string|undefined) => {
  try {
    await fetchWithAuth(`${BASE_URL}/attendance/checkOut`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ employeeId: id }),
    });
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};

export const fetchRecentActivities = async () => {
  try {
    const data = await fetchWithAuth(
      `${BASE_URL}/attendance/recent-activities`
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};
