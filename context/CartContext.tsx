import { createContext, ReactNode, useContext, useState } from "react";

interface CartProviderProps {
  children: ReactNode;
}

interface CartItem {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartContext {
  addToCart: (id: number, image: string, name: string, price: number) => void;
  getItemQuantity: (id: number) => number;
  cartQuantity: number;
  cartItems: CartItem[];
  increaseItemQuantity: any;
  clearCart: () => void;
}

const CartContext = createContext({} as CartContext);

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (
    id: number,
    image: string,
    name: string,
    price: number
  ) => {
    const alreadyExist = cartItems.find((item) => item.id === id);
    if (!alreadyExist) {
      setCartItems([...cartItems, { id, image, name, price, quantity: 1 }]);
    }
  };

  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const increaseItemQuantity = () => {
    return console.log("increase qty");
  };

  const clearCart = () => {
    return setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getItemQuantity,
        cartQuantity,
        cartItems,
        increaseItemQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
