import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { useCart } from "../../../context/CartContext";
import { useRouter } from "next/router";

interface CounterProps {
  isCart?: boolean;
  value?: number;
}

const Counter = ({ isCart, value }: CounterProps) => {
  const [count, setCount] = useState<number>(1);
  const { getItemQuantity, cartItems } = useCart();
  const router = useRouter();

  useEffect(() => {
    getItemQuantity(count);
  }, [count]);

  useEffect(() => {
    return setCount(1);
  }, [router.asPath, cartItems]);

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
        <p className={styles.__prev_btn} onClick={decreaseCounter}>
          -
        </p>
        <p className={styles.__counter}>{isCart ? value : count}</p>
        <p className={styles.__next_btn} onClick={increaseCounter}>
          +
        </p>
      </div>
    </div>
  );
};

export default Counter;
