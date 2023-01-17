export const setToken = (token: string) => {
  if (token !== undefined && token !== null) {
    return localStorage.setItem("token", token);
  }
};

export const getToken = () => {
  try {
    return localStorage.getItem("token");
  } catch (error) {
    return null;
  }
};

export const removeToken = () => {
  return localStorage.removeItem("token");
};

export const isLoggedIn = () => {
  const token = getToken();
  return token !== null && token !== undefined;
};
