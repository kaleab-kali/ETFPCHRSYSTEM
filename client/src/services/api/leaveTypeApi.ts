import { LeaveTypeInfo } from "../../../../shared/types/leaveTypes";
import {
  fetchWithAuth,
  handleError,
  BASE_URL,
} from "../shared/sharedApi";

export const getAllLeaveTypes = async () => {
  try {
    const data: LeaveTypeInfo[] = await fetchWithAuth(`${BASE_URL}/leave-balance`);
    console.log(data);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getLeaveType = async (id: string) => {
  try {
    const data: LeaveTypeInfo = await fetchWithAuth(
      `${BASE_URL}/leave-balance/${id}`
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const createLeaveType = async (data: LeaveTypeInfo) => {
  try {
    await fetchWithAuth(`${BASE_URL}/leave-balance`, {
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

export const updateLeaveType = async (data: any) => {
  try {
    await fetchWithAuth(`${BASE_URL}/leave-balance`, {
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

export const deleteLeaveType = async (id: string) => {
  try {
    await fetchWithAuth(`${BASE_URL}/leave-balance/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    handleError(error);
  }
};
