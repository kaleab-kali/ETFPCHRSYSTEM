import { fetchWithAuth, handleError, BASE_URL } from "../shared/sharedApi";

export const getEmployeeProfile = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/profile`);
    console.log("Fetched employee data:", data);
    return data;
  } catch (error) {
    handleError(error);
  }
};
