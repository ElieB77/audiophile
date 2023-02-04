import styles from "../../assets/styles/pages/checkout.module.scss";
import Button from "../../components/UI/Button";
import { useRouter } from "next/router";
import CartSummary from "../../components/Cart/CartSummary";
import { useCart } from "../../context/CartContext";
import { useEffect } from "react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/Forms/CheckoutForm";
const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);

const Checkout = () => {
  const { cartQuantity } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (cartQuantity < 1) {
      router.push("/");
    }
  }, [cartQuantity, router]);

  return (
    <>
      <div className={styles.__checkout}>
        <div className={`container ${styles.__container}`}>
          <div className={styles.__go_back_btn} onClick={() => router.back()}>
            <Button btnContent="go back" btnType="borderless" />
          </div>
          <div className={styles.__wrapper}>
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
            <div className={styles.__summary}>
              <CartSummary />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
