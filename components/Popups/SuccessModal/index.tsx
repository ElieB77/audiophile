import styles from "./styles.module.scss";
import IconCart from "../../../assets/public/static/checkout/icon-order-confirmation.svg";
import Image from "next/image";
import Button from "../../UI/Button";
import { useCart } from "../../../context/CartContext";
import { useRouter } from "next/router";
import CartItem from "../../Cart/CartItem";
import { replaceString } from "../../../utilities/replaceString";

interface SuccessModalProps {
  show?: any;
  handleClick?: any;
}

const SuccessModal = ({ show, handleClick }: SuccessModalProps) => {
  const { cartItems, cartTotalPrice } = useCart();
  const router = useRouter();

  const backToHomepage = () => {
    router.push("/");
  };

  return (
    show && (
      <>
        <div className={styles.__overlay} onClick={handleClick}></div>
        <div className={styles.__success_modal}>
          <Image src={IconCart} alt={"Success icon"} />
          <h3>thank you for your order</h3>
          <p>You will receive an email confirmation shortly.</p>
          <div className={styles.__order_summary}>
            <div className={styles.__items}>
              <>
                <div className={styles.__first_item}>
                  <div className={styles.__image}>
                    <Image
                      alt="Product"
                      src={replaceString(
                        cartItems[0].image,
                        "public/static",
                        ""
                      )}
                      fill
                      objectFit="cover"
                    />
                  </div>
                  <div className={styles.__info}>
                    <p>{cartItems[0].name}</p>
                    <p>${cartItems[0].price.toLocaleString()}</p>
                  </div>
                  <p className={styles.__quantity}>x{cartItems[0].quantity}</p>
                </div>
              </>
              {cartItems.length > 1 && (
                <>
                  <hr />
                  <p>And {cartItems.length - 1} other item(s)</p>
                </>
              )}
            </div>
            <div className={styles.__total}>
              <p>grand total</p>
              <h6>{"$" + cartTotalPrice.toLocaleString()}</h6>
            </div>
          </div>
          <Button
            onClick={backToHomepage}
            btnContent={"back to home"}
            isFullWidth
          />
        </div>
      </>
    )
  );
};

export default SuccessModal;
