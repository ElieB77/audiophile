import { createContext, ReactNode, useContext, useState } from "react";
import { deleteData, fetchData, postData, updateData } from "../utilities/api";
import { isLoggedIn } from "../utilities/auth";

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

interface StoredCartItem {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartContext {
  getCartByUser: any;
  addToCart: (id: number, image: string, name: string, price: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
  storedCartItems: StoredCartItem[];
  getItemQuantity: (qty: number) => void;
  clearCart: () => void;
  cartTotalPrice: number;
  removeItem: (id: number) => void;
  increaseQuantity: any;
  decreaseQuantity: any;
}

const CartContext = createContext({} as CartContext);

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [storedCartItems, setStoredCartItems] = useState<CartItem[]>([]);
  const [quantity, setQuantity] = useState<number>(0);
  const [forceRerender, setForceRerender] = useState<boolean>(false);

  const getCartByUser = async () => {
    const data = await fetchData("http://localhost:3001/cart");
    return setStoredCartItems([...storedCartItems, data]);
  };

  const addToCart = (
    id: number,
    image: string,
    name: string,
    price: number
  ) => {
    if (isLoggedIn()) {
      console.log("Sent to back");
      postData(`http://localhost:3001/cart/add`, id, quantity);
    }
    const alreadyExist = cartItems.find((item) => item.id === id);
    if (!alreadyExist) {
      setCartItems([...cartItems, { id, image, name, price, quantity }]);
    } else {
      cartItems.map((item, index) => {
        if (item.id === id) {
          cartItems[index].quantity += quantity;
        }
      });
      setForceRerender(!forceRerender);
    }
  };

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const getItemQuantity = (qty: number) => {
    return setQuantity(qty);
  };

  const clearCart = () => {
    if (isLoggedIn()) {
      deleteData("http://localhost:3001/cart/clear");
    }
    return setCartItems([]);
  };

  const cartTotalPrice = cartItems.reduce(
    (accumulator, current) => accumulator + current.price * current.quantity,
    0
  );

  const removeItem = (id: number) => {
    if (isLoggedIn()) {
      deleteData(`http://localhost:3001/cart/remove/${id}`);
    }
    return setCartItems([...cartItems.filter((item) => item.id !== id)]);
  };

  const increaseQuantity = (id: number) => {
    cartItems.map((item: any, index: number) => {
      if (item.id === id) {
        return cartItems[index].quantity++;
      }
    });
    if (isLoggedIn()) {
      updateData("http://localhost:3001/cart/increase", id);
    }
    setForceRerender(!forceRerender);
  };

  const decreaseQuantity = (id: number) => {
    cartItems.map((item: any, index: number) => {
      if (item.id === id) {
        if (item.quantity < 2) removeItem(id);

        return cartItems[index].quantity--;
      }
    });
    if (isLoggedIn()) {
      updateData("http://localhost:3001/cart/decrease", id);
    }

    setForceRerender(!forceRerender);
  };

  return (
    <CartContext.Provider
      value={{
        getCartByUser,
        addToCart,
        cartQuantity,
        cartItems,
        storedCartItems,
        getItemQuantity,
        clearCart,
        cartTotalPrice,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
