import { INotification2 } from "../../../../shared/types/Notification";
import { fetchWithAuth, handleError, BASE_URL, fetchWithOutAuth } from "../shared/sharedApi";

export const getNotification = async (id: string) => {
  try {
    const data = await fetchWithOutAuth(`${BASE_URL}/notifications/${id}`);
    console.log("Fetched Notification:", data);
    return data;
  } catch (error) {
    handleError(error);
  }
};


export const updateNotification = async (data: INotification2) => {
  try {
    await fetchWithOutAuth(`${BASE_URL}/notifications/${data._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    handleError(error);
  }
};

