import { DepartmentInfo } from "../../../../shared/types/departmentTypes";
import {
  fetchWithAuth,
  handleError,
  BASE_URL,
} from "../shared/sharedApi";

export const getAllDepartments = async () => {
  try {
    const data: DepartmentInfo[] = await fetchWithAuth(
      `${BASE_URL}/departments`
    );
    console.log(data);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getDepartment = async (id: string) => {
  try {
    const data: DepartmentInfo = await fetchWithAuth(
      `${BASE_URL}/departments/${id}`
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const createDepartment = async (data: DepartmentInfo) => {
  try {
    await fetchWithAuth(`${BASE_URL}/departments`, {
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

export const updateDepartment = async (data: DepartmentInfo) => {
  try {
    await fetchWithAuth(`${BASE_URL}/departments/${data.departmentID}`, {
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

export const updateHeadRoleChange = async (data: any) => {
  console.log("DATA",data);
  try {
    await fetchWithAuth(`${BASE_URL}/departments/department-head/${data.departmentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        departmentHead: data.employeeId,
      
      }),
    });
  } catch (error) {
    handleError(error);
  }
};

export const updateAssigneMananger = async (data: any) => {
  try {
    await fetchWithAuth(`${BASE_URL}/departments/assign-manager-to-employee`, {
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

export const assignManagerToDepartment = async (data: any): Promise<void> => {
  console.log("DATA",data);
  try {
    await fetchWithAuth(`${BASE_URL}/departments/assign-manager`, {
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

export const deleteDepartment = async (id: string) => {
  try {
    await fetchWithAuth(`${BASE_URL}/departments/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    handleError(error);
  }
};
