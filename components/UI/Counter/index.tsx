// Styles
import styles from "./styles.module.scss";
// Modules
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// Context
import { useCart } from "../../../context/CartContext";

interface CounterProps {
  isCart?: boolean;
  value?: number;
  increaseClick?: any;
  decreaseClick?: any;
}

const Counter = ({
  isCart,
  value,
  increaseClick,
  decreaseClick,
}: CounterProps) => {
  const [count, setCount] = useState<number>(1);
  const { getItemQuantity, cartItems, cartQuantity } = useCart();
  const router = useRouter();

  useEffect(() => {
    getItemQuantity(count);
  }, [count, cartItems, getItemQuantity]);

  useEffect(() => {
    return setCount(1);
  }, [router.asPath, cartItems, cartQuantity]);

  const increaseCounter = () => {
    return setCount(count + 1);
  };

  const decreaseCounter = () => {
    if (count > 1) {
      return setCount(count - 1);
    }
  };

  return (
    <div className={`${styles.__counter} ${isCart ? styles.__is_small : null}`}>
      <div>
        <button
          className={styles.__prev_btn}
          onClick={isCart ? decreaseClick : decreaseCounter}
        >
          -
        </button>
        <p className={styles.__counter}>{isCart ? value : count}</p>
        <button
          className={styles.__next_btn}
          onClick={isCart ? increaseClick : increaseCounter}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
