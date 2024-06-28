import { fetchWithAuth, handleError, BASE_URL } from "../shared/sharedApi";

export const getProfile = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/profile`);
    console.log("Fetched All Staff:", data);
    return data;
  } catch (error) {
    handleError(error);
  }
};
