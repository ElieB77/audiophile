import styles from "./styles.module.scss";
import { useState } from "react";

interface CounterProps {
  isSmall?: boolean;
}

const Counter = ({ isSmall }: CounterProps) => {
  const [count, setCount] = useState<number>(1);

  const increaseCounter = () => {
    return setCount(count + 1);
  };

  const decreaseCounter = () => {
    if (count > 1) {
      return setCount(count - 1);
    }
  };

  const reset = () => {
    return setCount(1);
  };

  return (
    <div
      className={`${styles.__counter} ${isSmall ? styles.__is_small : null}`}
    >
      <div>
        <p className={styles.__prev_btn} onClick={decreaseCounter}>
          -
        </p>
        <p className={styles.__counter}>{count}</p>
        <p className={styles.__next_btn} onClick={increaseCounter}>
          +
        </p>
      </div>
    </div>
  );
};

export default Counter;
