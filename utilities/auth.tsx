export const setToken = (token: string) => {
  return localStorage.setItem("token", token);
};

export const getToken = () => {
  try {
    return localStorage.getItem("token");
  } catch (error) {
    return null;
  }
};

export const isLoggedIn = () => {
  const token = getToken();
  return token !== null && token !== undefined;
};
