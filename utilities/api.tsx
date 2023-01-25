import { getToken } from "./auth";

export const fetchData = async (url: any) => {
  const token = getToken();
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
    return error;
  }
};

export const postData = async (url: any, item_id: any, quantity: any) => {
  const token = getToken();
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ item_id, quantity }),
    });
    const data = await response.json();
  } catch (error) {}
};

export const deleteData = async (url: any) => {
  const token = getToken();
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
  } catch (error) {}
};

export const updateData = async (url: any, item_id: any) => {
  const token = getToken();
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ item_id }),
    });
    const data = await response.json();
  } catch (error) {}
};
