export const getEvents = async () => {
  console.log('pobieranie danych')

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

export const addEvent = async (data: any) => {
  try {
    const response = await fetch(`http://localhost:3001/calendar/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.log("Error:", error); //
    throw error;
  }
};

export const updateEvent = async (data: any) => {
  try {
    const response = await fetch(`http://localhost:3001/calendar/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.log("Error:", error); //
    throw error;
  }
};

export const deleteEvent = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3001/calendar/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.log("Error:", error); //
    throw error;
  }
};
