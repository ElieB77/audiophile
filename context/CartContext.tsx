import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { deleteData, fetchData, postData, updateData } from "../utilities/api";
import { isLoggedIn, removeToken } from "../utilities/auth";

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
  cartItemsApi: any;
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
  const [cartItemsApi, setCartItemsApi] = useState<any[]>([]);
  const [quantity, setQuantity] = useState<number>(0);
  const [forceRerender, setForceRerender] = useState<boolean>(false);

  useEffect(() => {
    const getCart = async () => {
      const data = await fetchData("http://localhost:3001/cart");
      setCartItemsApi(data);
    };
    getCart();
  }, [isLoggedIn, forceRerender, removeToken]);

  const addToCart = (
    id: number,
    image: string,
    name: string,
    price: number
  ) => {
    if (isLoggedIn()) {
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
      setCartItemsApi([]);
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
      setForceRerender(!forceRerender);
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
        if (item.quantity < 2) {
          removeItem(id);
        }

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
        addToCart,
        cartQuantity,
        cartItems,
        cartItemsApi,
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
