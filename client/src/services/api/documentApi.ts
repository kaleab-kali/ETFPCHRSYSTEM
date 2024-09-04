import { fetchWithAuth, handleError, BASE_URL } from "../shared/sharedApi";

export const getDocument = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/documents`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getDocumentById = async (id:string) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/documents/${id}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const createDocument = async (data: FormData) => {
  try {
    await fetchWithAuth(`${BASE_URL}/documents`, {
      method: "POST",
      body: data,
    });
  } catch (error) {
    handleError(error);
  }
};

export const updateDocument = async (data: FormData) => {
  try {
    await fetchWithAuth(`${BASE_URL}/documents`, {
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


