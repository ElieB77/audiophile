import styles from "./styles.module.scss";
import IconCart from "../../../assets/public/checkout/icon-order-confirmation.svg";
import Image from "next/image";
import Button from "../../UI/Button";
import { useCart } from "../../../context/CartContext";
import { useRouter } from "next/router";

interface SuccessModalProps {
  show?: any;
  handleClick?: any;
}

const SuccessModal = ({ show, handleClick }: SuccessModalProps) => {
  const { cartItems, cartTotalPrice } = useCart();
  const router = useRouter();
  return (
    show && (
      <>
        <div className={styles.__overlay} onClick={handleClick}></div>
        <div className={styles.__success_modal}>
          <Image src={IconCart} alt={"Success icon"} />
          <h3>thank you for your order</h3>
          <p>You will receive an email confirmation shortly.</p>
          <div className={styles.__order_summary}>
            <div className={styles.__items}></div>
            <div className={styles.__total}>
              <p>grand total</p>
              <h6>{"$" + cartTotalPrice.toLocaleString()}</h6>
            </div>
          </div>
          <Button btnContent={"back to home"} isFullWidth />
        </div>
      </>
    )
  );
};

export default SuccessModal;