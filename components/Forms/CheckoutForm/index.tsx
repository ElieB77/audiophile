import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import { useCart } from "../../../context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const CheckoutForm = () => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState<any>();
  const [processing, setProcessing] = useState<any>();
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const { cartItems } = useCart();
  const cardElement = elements?.getElement(CardElement);

  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_STRIPE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartItems }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [cartItems]);

  const handleChange = async (event: any) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev: any) => {
    ev.preventDefault();
    setProcessing(true);

    if (cardElement) {
      const payload = await stripe?.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (payload?.error) {
        setError(`Payment failed ${payload.error.message}`);
        setProcessing(false);
        toast.error("Something went wrong! Please try again.");
      } else {
        setError(null);
        setProcessing(false);
        setSucceeded(true);
        router.push("/order-confirmation");
      }
    }
  };

  return (
    <>
      <div className={styles.__checkout_form}>
        <div className={styles.__form}>
          <h3>checkout</h3>
          <div className={styles.__billing_details}>
            <p className="sub_title">billing details</p>
            <div className={styles.__input_group}>
              <Input placeholder="Alexei Ward" label="Name" />
              <Input placeholder="alexei@mail.com" label="Email" />
            </div>
            <Input placeholder="+1 202-555-0136" label="number" />
          </div>
          <div className={styles.__shipping_info}>
            <p className="sub_title">shipping info</p>
            <Input
              placeholder="1137 Williams Avenue"
              label="Adress"
              isFullWidth
            />
            <div className={styles.__input_group}>
              <Input placeholder="10001" label="ZIP Code" />
              <Input placeholder="New York" label="City" />
            </div>
            <Input placeholder="United States" label="Country" />
          </div>
          <p className="sub_title">payment</p>

          <CardElement
            className={styles.__card_element}
            onChange={handleChange}
          />

          {processing ? (
            <div className={styles.__spinner}></div>
          ) : (
            <div className={styles.__submit_btn}>
              <Button btnContent={"continue & pay"} onClick={handleSubmit} />
            </div>
          )}
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={1000} />
    </>
  );
};

export default CheckoutForm;
