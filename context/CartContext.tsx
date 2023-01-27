import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { storeItems, getItems, removeItems } from "../utilities/localStorage";

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
  cartQuantity: number;
  cartItems: CartItem[];
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
  const [quantity, setQuantity] = useState<number>(0);
  const [forceRerender, setForceRerender] = useState<boolean>(false);

  useEffect(() => {
    if (getItems("cartItems")) {
      setCartItems(getItems("cartItems"));
    }
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) storeItems(cartItems);
    if (cartItems.length === 0) removeItems("cartItems");
  }, [cartItems, forceRerender]);

  const addToCart = (
    id: number,
    image: string,
    name: string,
    price: number
  ) => {
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
    return setCartItems([]);
  };

  const cartTotalPrice = cartItems.reduce(
    (accumulator, current) => accumulator + current.price * current.quantity,
    0
  );

  const removeItem = (id: number) => {
    return setCartItems([...cartItems.filter((item) => item.id !== id)]);
  };

  const increaseQuantity = (id: number) => {
    cartItems.map((item: any, index: number) => {
      if (item.id === id) {
        return cartItems[index].quantity++;
      }
    });
    setForceRerender(!forceRerender);
  };

  const decreaseQuantity = (id: number) => {
    cartItems.map((item: any, index: number) => {
      if (item.id === id) {
        if (item.quantity < 2) {
          removeItem(id);
        }

        return cartItems[index].quantity--;
      }
    });
    setForceRerender(!forceRerender);
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        cartQuantity,
        cartItems,
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
