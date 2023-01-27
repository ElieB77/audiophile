export const storeItems = (cartItems: any) => {
  typeof window !== undefined
    ? localStorage.setItem("cartItems", JSON.stringify(cartItems))
    : null;
};

export const getItems = (key: any) => {
  const data = JSON.parse(localStorage.getItem(key)!);
  return data;
};

export const removeItems = (key: any) => {
  const data = localStorage.removeItem(key);
  return data;
};
