import { TitleInfo } from "../../../../shared/types/titlesTypes";
import {
  fetchWithAuth,
  handleError,
  BASE_URL,
} from "../shared/sharedApi";

export const getAllTitles = async () => {
  try {
    const data: TitleInfo[] = await fetchWithAuth(`${BASE_URL}/title`);
    console.log(data);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getTitle = async (id: string) => {
  try {
    const data: TitleInfo = await fetchWithAuth(`${BASE_URL}/title/${id}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const createTitle = async (data: TitleInfo) => {
  try {
    await fetchWithAuth(`${BASE_URL}/title`, {
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

export const updateTitle = async (data: any) => {
  try {
    await fetchWithAuth(`${BASE_URL}/title/${data.titleId}`, {
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

export const deleteTitle = async (id: string) => {
  try {
    await fetchWithAuth(`${BASE_URL}/title/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    handleError(error);
  }
};
