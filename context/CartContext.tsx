import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { deleteData, getData, postData } from "../utilities/api";
// import { isLoggedIn } from "../utilities/auth";
import { useAuth } from "./AuthContext";
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
  const [update, setUpdate] = useState<boolean>(false);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn()) {
      getData(process.env.NEXT_PUBLIC_GET_CART).then((data) => {
        setCartItems([...data.cartItems]);
      });
    } else {
      if (getItems("cartItems")) {
        setCartItems(getItems("cartItems"));
      }
    }
  }, [isLoggedIn()]);

  useEffect(() => {
    if (isLoggedIn()) {
      postData(process.env.NEXT_PUBLIC_ADD_TO_CART, cartItems);
    } else {
      if (cartItems.length > 0) storeItems(cartItems);
      if (cartItems.length === 0) removeItems("cartItems");
    }
  }, [cartItems, update]);

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
      setUpdate(!update);
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
      deleteData(process.env.NEXT_PUBLIC_CLEAR_CART);
    }
    return setCartItems([]);
  };

  const cartTotalPrice = cartItems.reduce(
    (accumulator, current) => accumulator + current.price * current.quantity,
    0
  );

  const removeItem = (id: number) => {
    if (isLoggedIn()) {
      deleteData(`${process.env.NEXT_PUBLIC_REMOVE_ITEM}/${id}`);
    }
    return setCartItems([...cartItems.filter((item) => item.id !== id)]);
  };

  const increaseQuantity = (id: number) => {
    cartItems.map((item: any, index: number) => {
      if (item.id === id) {
        return cartItems[index].quantity++;
      }
    });
    setUpdate(!update);
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
    setUpdate(!update);
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
