// Modules
import React, { useEffect, useState } from "react";
// Styles
import styles from "./styles.module.scss";
// Components
import Button from "../../UI/Button";
import Input from "../../UI/Input";
// Modules
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
// Utilities
import { formValidation } from "../../../utilities/formValidation";
// Context
import { useCart } from "../../../context/CartContext";

const CheckoutForm = () => {
  const [error, setError] = useState<any>();
  const [processing, setProcessing] = useState<any>();
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const { cartItems } = useCart();
  const cardElement = elements?.getElement(CardElement);
  const [values, setValues] = useState<any>({
    name: "",
    email: "",
    phone_number: "",
    address: "",
    zip_code: "",
    city: "",
    country: "",
  });
  const [errors, setErrors] = useState<any>();

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
    const [isValid, error] = formValidation(
      values.email,
      undefined,
      values.name,
      undefined,
      values.phone_number,
      values.address,
      values.zip_code,
      values.city,
      values.country
    );

    if (isValid) {
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
          router.push("/order-confirmation");
        }
      }
    }

    setErrors(error);
  };

  return (
    <>
      <div className={styles.__checkout_form}>
        <div className={styles.__form}>
          <h3>checkout</h3>
          <div className={styles.__billing_details}>
            <p className="sub_title">billing details</p>
            <div className={styles.__input_group}>
              <div>
                <div>
                  <Input
                    error={
                      errors &&
                      errors.find(
                        (err: { input: string }) => err.input === "name"
                      )
                    }
                    label="Name"
                    placeholder="Alexei *"
                    type="text"
                    value={values.name}
                    onChange={(e: { target: { value: any } }) =>
                      setValues({
                        ...values,
                        name: e.target.value,
                      })
                    }
                  />
                  {errors &&
                    errors.map((err: any, index: any) => {
                      if (err.input === "name") {
                        return (
                          <p className={styles.__error_message} key={index}>
                            {err.message}
                          </p>
                        );
                      }
                    })}
                </div>
              </div>
              <div>
                <div>
                  <Input
                    error={
                      errors &&
                      errors.find(
                        (err: { input: string }) => err.input === "email"
                      )
                    }
                    label="Email Address"
                    type="email"
                    placeholder="alexei@mail.com *"
                    value={values.email}
                    onChange={(e: { target: { value: any } }) =>
                      setValues({
                        ...values,
                        email: e.target.value,
                      })
                    }
                  />
                  {errors &&
                    errors.map((err: any, index: any) => {
                      if (err.input === "email") {
                        return (
                          <p className={styles.__error_message} key={index}>
                            {err.message}
                          </p>
                        );
                      }
                    })}
                </div>
              </div>
            </div>
            <div className={styles.__single_input}>
              <Input
                error={
                  errors &&
                  errors.find(
                    (err: { input: string }) => err.input === "phone_number"
                  )
                }
                label="Phone Number"
                type="text"
                placeholder="+1 202-555-0136"
                value={values.phone_number}
                onChange={(e: { target: { value: any } }) =>
                  setValues({
                    ...values,
                    phone_number: e.target.value,
                  })
                }
              />
              {errors &&
                errors.map((err: any, index: any) => {
                  if (err.input === "phone_number") {
                    return (
                      <p className={styles.__error_message} key={index}>
                        {err.message}
                      </p>
                    );
                  }
                })}
            </div>
          </div>
          <div className={styles.__shipping_info}>
            <p className="sub_title">shipping info</p>
            <div>
              <Input
                error={
                  errors &&
                  errors.find(
                    (err: { input: string }) => err.input === "address"
                  )
                }
                label="Address"
                type="text"
                placeholder="1137 Williams Avenue"
                isFullWidth
                value={values.address}
                onChange={(e: { target: { value: any } }) =>
                  setValues({
                    ...values,
                    address: e.target.value,
                  })
                }
              />
              {errors &&
                errors.map((err: any, index: any) => {
                  if (err.input === "address") {
                    return (
                      <p className={styles.__error_message} key={index}>
                        {err.message}
                      </p>
                    );
                  }
                })}
            </div>

            <div className={styles.__input_group}>
              <div>
                <Input
                  error={
                    errors &&
                    errors.find(
                      (err: { input: string }) => err.input === "zip_code"
                    )
                  }
                  label="ZIP Code"
                  type="text"
                  placeholder="10001"
                  value={values.zip_code}
                  onChange={(e: { target: { value: any } }) =>
                    setValues({
                      ...values,
                      zip_code: e.target.value,
                    })
                  }
                />
                {errors &&
                  errors.map((err: any, index: any) => {
                    if (err.input === "zip_code") {
                      return (
                        <p className={styles.__error_message} key={index}>
                          {err.message}
                        </p>
                      );
                    }
                  })}
              </div>
              <div>
                <Input
                  error={
                    errors &&
                    errors.find(
                      (err: { input: string }) => err.input === "city"
                    )
                  }
                  label="City"
                  type="text"
                  placeholder="New York"
                  value={values.city}
                  onChange={(e: { target: { value: any } }) =>
                    setValues({
                      ...values,
                      city: e.target.value,
                    })
                  }
                />
                {errors &&
                  errors.map((err: any, index: any) => {
                    if (err.input === "city") {
                      return (
                        <p className={styles.__error_message} key={index}>
                          {err.message}
                        </p>
                      );
                    }
                  })}
              </div>
            </div>
            <div className={styles.__single_input}>
              <Input
                error={
                  errors &&
                  errors.find(
                    (err: { input: string }) => err.input === "country"
                  )
                }
                label="Country"
                type="text"
                placeholder="United States"
                value={values.country}
                onChange={(e: { target: { value: any } }) =>
                  setValues({
                    ...values,
                    country: e.target.value,
                  })
                }
              />
              {errors &&
                errors.map((err: any, index: any) => {
                  if (err.input === "country") {
                    return (
                      <p className={styles.__error_message} key={index}>
                        {err.message}
                      </p>
                    );
                  }
                })}
            </div>
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
