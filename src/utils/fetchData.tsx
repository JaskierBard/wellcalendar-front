export const getEvents = async () => {
  try {
    const response = await fetch(`http://localhost:3001/calendar/read`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error:", error); //
    throw error;
  }
};
