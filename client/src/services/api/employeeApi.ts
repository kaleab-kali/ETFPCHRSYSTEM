import { EmployeeData } from "../../../../shared/types/employeeTypes";
import {
  fetchWithAuth,
  handleError,
  BASE_URL,
} from "../shared/sharedApi";
import { EmployeeProfileInfo } from "../../../../shared/types/employeeProfileModel";
export const getEmployeeIds = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/employees`);
    return data.map((employee: EmployeeData) => employee._id);
  } catch (error) {
    handleError(error);
  }
};

export const getEmployee = async (id: string) => {
  try {
    const data:EmployeeData = await fetchWithAuth(
      `${BASE_URL}/employees/${id}`
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};
export const getAllEmployees = async () => {
  try {
    const data = await fetchWithAuth(
      `${BASE_URL}/employees`
    );
    return data;
  } catch (error) {
    handleError(error);
  }
}

export const getDepartmentHeadEmployee = async (id: string) => {
  try {
    const data = await fetchWithAuth(
      `${BASE_URL}/employees/departmentHead/${id}`
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};
export const getManagerEmployee = async (id: string) => {
  try {
    const data = await fetchWithAuth(
      `${BASE_URL}/employees/manager/${id}`
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};


export const getEmployeeEmpID = async (id: string) => {
  try {
    const data: EmployeeData = await fetchWithAuth(
      `${BASE_URL}/employees/employee/${id}`
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const createEmployee = async (data: FormData) => {
  try {
    console.log("Data before mutation:", data);

    await fetchWithAuth(`${BASE_URL}/employees`, {
      method: "POST",
      // headers: {
      //   // No need to set Content-Type here, it will be automatically set by FormData
      // },
      body: data,
    });
  } catch (error) {
    handleError(error);
  }
};

export async function createUpload(data: FormData): Promise<any> {
  try {
    const response = await fetchWithAuth(`${BASE_URL}/uploads`, {
      method: "POST",
      body: data,
    });

    // Remove the redundant JSON parsing, since fetchWithAuth already handles it
    console.log("API Response:", response);
    return response;
  } catch (error) {
    console.error("Error during file upload:", error);
    throw error;
  }
}
export const updateEmployee = async (data: EmployeeData) => {
  try {
    await fetchWithAuth(`${BASE_URL}/employees/${data._id}`, {
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

export const deleteEmployee = async (id: string) => {
  try {
    await fetchWithAuth(`${BASE_URL}/employees/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    handleError(error);
  }
};
