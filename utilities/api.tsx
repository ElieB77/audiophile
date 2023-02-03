export const getData = async (url: any) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const postData = async (url: any, items: any) => {
  const token = localStorage.getItem("token");
  try {
    const response: any = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ items }),
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteData = async (url: any) => {
  const token = localStorage.getItem("token");
  try {
    await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const updateData = async (url: any, item_id: any) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ item_id }),
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};
