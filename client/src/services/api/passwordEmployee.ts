import { BASE_URL, fetchWithOutAuth, handleError } from "../shared/sharedApi";

export const resetPasswordEmployee = async (passw: any) => {
  try{const data = await fetchWithOutAuth(`${BASE_URL}/employees/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(passw),
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

export const createFirstTimePasswordEmployee = async (passw: any) => {
  try {
    const data = await fetchWithOutAuth(
      `${BASE_URL}/employees/change-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passw),
      }
    );

    // if (!response.ok) {
    //   throw new Error("Login failed");
    // }

    // const data = await response.json();
    return data;
  } catch (error) {
    handleError(error);
  }
};
