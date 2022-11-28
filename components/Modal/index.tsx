import Button from "../Button";
import styles from "./styles.module.scss";
import Image from "next/image";
import Counter from "../Counter";

interface Props {
  show: any;
  handleClick?: any;
  itemsLength: number;
}

const Modal = ({ show, handleClick, itemsLength = 1 }: Props) => {
  return show ? (
    <>
      <div className={styles.__overlay} onClick={handleClick}></div>
      <div className={styles.__modal}>
        <div className={styles.__head}>
          <h6>
            CART <span>({itemsLength})</span>
          </h6>
          <p>Remove All</p>
        </div>
        <div className={styles.__body}>
          <div className={styles.__item}>
            <div className={styles.__image}>
              <Image
                src={"/cart/image-xx59-headphones.jpg"}
                alt="article"
                fill
                objectFit="cover"
              />
            </div>
            <div className={styles.__details}>
              <p>X99 MK II</p>
              <p>$ 2,500</p>
            </div>
            <Counter isSmall />
          </div>
        </div>
        <div className={styles.__price}>
          <p>total</p>
          <h6>$2,700</h6>
          <Button btnContent="checkout" />
        </div>
      </div>
    </>
  ) : null;
};

export default Modal;
