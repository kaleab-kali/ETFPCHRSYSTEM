import { fetchWithAuth, fetchWithOutAuth, handleError } from "../shared/sharedApi";

const BASE_URL = "http://localhost:8000";
export const loginEmployee = async (email: string, password: string) => {
  try {
    const data = await fetchWithOutAuth(`${BASE_URL}/employees/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // if (!response.ok) {
    //   throw new Error("Login failed");
    // }

    // const data = await response.json();
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const loginInvStaff = async (email: string, password: string) => {
  try{const data = await fetchWithOutAuth(`${BASE_URL}/HRStaff/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  // if (!response.ok) {
  //   throw new Error("Login failed");
  // }

  // const data = await response.json();
  return data;
  } catch (error) {
    handleError(error);
  }
};

export const forgotPasswordRequest = async (email: string) => {
  try {
    const data = await fetchWithOutAuth(`${BASE_URL}/employees/request-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    // if (!response.ok) {
    //   throw new Error("Login failed");
    // }

    // const data = await response.json();
    return data;
  } catch (error) {
    handleError(error);
  }
};
