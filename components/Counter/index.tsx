import styles from "./styles.module.scss";
import { useState } from "react";

interface Props {
  isSmall?: boolean;
}

const Counter = ({ isSmall }: Props) => {
  const [count, setCount] = useState<number>(1);
  return (
    <div
      className={`${styles.__counter} ${isSmall ? styles.__is_small : null}`}
    >
      <div>
        <p className={styles.__prev_btn}>-</p>
        <p className={styles.__counter}>{count}</p>
        <p className={styles.__next_btn}>+</p>
      </div>
    </div>
  );
};

export default Counter;
