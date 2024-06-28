import { fetchWithAuth, handleError, BASE_URL } from "../shared/sharedApi";

interface CalendarEntry {
  date: string; // The date in "YYYY-MM-DD" format
  description: string; // The description of the calendar entry
}
export const getCalendar = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/holidays`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const createHoliday = async (data: CalendarEntry) => {
  try {
    await fetchWithAuth(`${BASE_URL}/holidays`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};

