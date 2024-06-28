import { PositionInfo } from "../../../../shared/types/positionTypes";
import {
  fetchWithAuth,
  handleError,
  BASE_URL,
} from "../shared/sharedApi";

export const getAllPositions = async () => {
  try {
    const data: PositionInfo[] = await fetchWithAuth(`${BASE_URL}/position`);
    console.log(data);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getPosition = async (id: string) => {
  try {
    const data: PositionInfo = await fetchWithAuth(
      `${BASE_URL}/position/${id}`
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const createPosition = async (data: PositionInfo) => {
  try {
    await fetchWithAuth(`${BASE_URL}/position`, {
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

export const updatePosition = async (data: PositionInfo) => {
  try {
    await fetchWithAuth(`${BASE_URL}/position/${data.posId}`, {
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

export const deletePosition = async (id: string) => {
  try {
    await fetchWithAuth(`${BASE_URL}/position/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    handleError(error);
  }
};
