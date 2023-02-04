// Styles
import styles from "../../assets/styles/pages/checkout.module.scss";
// Modules
import { useRouter } from "next/router";
import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// Components
import CheckoutForm from "../../components/Forms/CheckoutForm";
import CartSummary from "../../components/Cart/CartSummary";
import Button from "../../components/UI/Button";
// Context
import { useCart } from "../../context/CartContext";
// Assets

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
