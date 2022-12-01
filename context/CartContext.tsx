import { createContext, ReactNode, useContext } from "react";

interface CartProviderProps {
  children: ReactNode;
}

interface CartItems {
  id: number;
  quantity: number;
}

interface CartContext {
  increaseCartQuantity: (id: number) => void;
}

const CartContext = createContext({} as CartContext);

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const increaseCartQuantity = () => {
    return console.log("increaseCartQuantity");
  };
  return (
    <CartContext.Provider value={{ increaseCartQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
