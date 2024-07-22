import { SalaryRaiseType } from "../../../../shared/types/salaryRaiseTypes";
import {
  fetchWithAuth,
  handleError,
  BASE_URL,
} from "../shared/sharedApi";

export const getAllSalaryRaises = async () => {
  try {
    const data: SalaryRaiseType[] = await fetchWithAuth(
      `${BASE_URL}/salaryRaise`
    );
    console.log(data);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getSalaryRaise = async (id: string) => {
  try {
    const data: SalaryRaiseType = await fetchWithAuth(
      `${BASE_URL}/salaryRaise/${id}`
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const createSalaryRaise = async () => {
  try {
    await fetchWithAuth(`${BASE_URL}/salaryRaise`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    handleError(error);
  }
};

export const updateSalaryRaise = async (data: SalaryRaiseType) => {
  try {
    await fetchWithAuth(`${BASE_URL}/salaryRaise/${data.employeeId}`, {
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




// export const deleteLeave = async (id: string) => {
//   const response = await fetch(`${BASE_URL}/leaves/${id}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (!response.ok) {
//     throw new Error("Failed to delete Leaves");
//   }
// };
