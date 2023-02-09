// Styles
import styles from "../../assets/styles/pages/order-confirmation.module.scss";
// Modules
import Image from "next/image";
import { useRouter } from "next/router";
import Confetti from "react-confetti";
// Utilities
import { replaceString } from "../../utilities/replaceString";
import { deleteData } from "../../utilities/api";
// Assets
import IconCart from "../../public/static/checkout/icon-order-confirmation.svg";
// Context
import { useCart } from "../../context/CartContext";
// Components
import Button from "../../components/UI/Button";
import { useEffect } from "react";

const OrderConfirmation = () => {
  const { cartItems, cartTotalPrice, clearCart } = useCart();
  const router = useRouter();

  const backToHomepage = () => {
    router.push("/");
    deleteData(process.env.NEXT_PUBLIC_CLEAR_CART);
    clearCart();
  };

  return (
    cartItems.length !== 0 && (
      <div className={styles.__order_confirmation}>
        <div className={styles.__wrapper}>
          {typeof window !== "undefined" && (
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              numberOfPieces={50}
            />
          )}
          <Image src={IconCart} alt={"Success icon"} />
          <h3>thank you for your order!</h3>
          <p>You will receive an email confirmation shortly.</p>
          <div className={styles.__order_summary}>
            <div className={styles.__items}>
              <>
                <div className={styles.__first_item}>
                  <div className={styles.__image}>
                    <Image
                      alt="Product"
                      src={`/static${replaceString(
                        cartItems[0].image && cartItems[0].image,
                        "public",
                        ""
                      )}`}
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
      </div>
    )
  );
};

export default OrderConfirmation;
