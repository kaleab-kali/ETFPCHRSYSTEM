import { LeaveBalance, LeaveInfo } from "../../../../shared/types/leaveTypes";
import {
  fetchWithAuth,
  handleError,
  BASE_URL,
} from "../shared/sharedApi";

export const getLeaveIds = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/leaves`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllLeaves = async () => {
  try {
    const data: LeaveInfo[] = await fetchWithAuth(`${BASE_URL}/leaves`);
    console.log(data);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getTransferAllLeaves = async () => {
  try {
    const data = await fetchWithAuth(
      `${BASE_URL}/leaves/leaveBalances/transfer`
    );
    console.log(data);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllLeaveBalances = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/leaves/leaveBalances`);
    console.log(data);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllLeaveBalancesByYear = async (data: LeaveBalance) => {
  try {
    const response = await fetchWithAuth(
      `${BASE_URL}/leaves/leaveBalances/${data.empId}/${data.year}`
    );
    console.log(response);
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const getSingleLeave = async (id: string) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/leaves/employee/${id}`);
    console.log(data);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getUnderDepartmentHeadLeave = async (id: string) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/leaves/departmentHead/${id}`);
    console.log(data);
    return data;
  } catch (error) {
    handleError(error);
  }
};


export const getUnderManagerLeave = async (id: string) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/leaves/manager/${id}`);
    console.log(data);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getLeave = async (id: string) => {
  try {
    const data: LeaveInfo[] = await fetchWithAuth(`${BASE_URL}/leaves/${id}`);
    const mappedData = data.map((leave) => ({
      _id: leave._id,
      reason: leave.reason,
      from: leave.from,
      to: leave.to,
      employeeId: leave.employeeId,
      employee: leave.employee
        ? {
            firstName: leave.employee.firstName,
            email: leave.employee.email,
            gender: leave.employee.gender,
            department: leave.employee.department,
          }
        : undefined,
    }));
    return mappedData;
  } catch (error) {
    handleError(error);
  }
};

export const createLeave = async (data: LeaveInfo) => {
  try {
    await fetchWithAuth(`${BASE_URL}/leaves`, {
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

export const updateLeave = async (data: any) => {
  try {
    await fetchWithAuth(`${BASE_URL}/leaves`, {
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

export const updateLeaveBalances = async (data: any) => {
  try {
    await fetchWithAuth(`${BASE_URL}/leaves/leaveBalances/${data.empId}`, {
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

export const deleteLeave = async (id: string) => {
  try {
    await fetchWithAuth(`${BASE_URL}/leaves/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    handleError(error);
  }
};
