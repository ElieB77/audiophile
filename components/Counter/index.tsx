import styles from "./styles.module.scss";
import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState<number>(1);
  return (
    <div className={styles.__counter}>
      <div>
        <p className={styles.__prev_btn}>-</p>
        <p className={styles.__counter}>{count}</p>
        <p className={styles.__next_btn}>+</p>
      </div>
    </div>
  );
};

export default Counter;
