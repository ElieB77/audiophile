/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import styles from "./styles.module.scss";
import CloseIcon from "../../../assets/public/close-icon.svg";
import Image from "next/image";
import { formValidation } from "../../../utilities/formValidation";

interface Props {
  show?: any;
  handleClick?: any;
}

const UserModal = ({ show, handleClick }: Props) => {
  const [conditionalContent, setConditionalContent] =
    useState<string>("signin");

  const [values, setValues] = useState<any>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [signInValues, setSignInValues] = useState<any>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (show) setConditionalContent("signin");
  }, [show]);

  const signUpSubmit = async () => {
    const isValid = formValidation(
      values.email,
      values.password,
      values.name,
      values.confirmPassword
    );

    if (isValid) {
      const data = await fetch("http://localhost:3001/signup", {
        method: "POST",
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      const response = await data.json();
    }

    setValues({ name: "", email: "", password: "", confirmPassword: "" });
    console.log("sign up button");
  };

  const signInSubmit = async () => {
    const isValid = formValidation(
      signInValues.email,
      signInValues.password,
      undefined,
      undefined
    );

    if (isValid) {
      const data = await fetch("http://localhost:3001/signin", {
        method: "POST",
        body: JSON.stringify({
          email: signInValues.email,
          password: signInValues.password,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      const response = await data.json();
      console.log(response);
    }

    setSignInValues({ email: "", password: "" });
    console.log("sign in button");
  };

  return (
    show && (
      <>
        <div className={styles.__overlay} onClick={handleClick}></div>
        <div className={styles.__user_modal}>
          <div>
            <div className={styles.__head}>
              <div>
                <h6>
                  {conditionalContent === "signin"
                    ? "sign in"
                    : conditionalContent === "forgotpassword"
                    ? "forgot password ?"
                    : "sign up"}
                </h6>
                <div className={styles.__user} onClick={handleClick}>
                  <Image src={CloseIcon} alt="Close" width={23} height={20} />
                </div>
              </div>

              <hr />
            </div>
            <div className={styles.__body}>
              {conditionalContent === "forgotpassword" && (
                <p className={styles.__forgot_password_message}>
                  No worries, we'll send you reset instructions.
                </p>
              )}
              <div className={styles.__inputs}>
                {conditionalContent === "signin" ? (
                  <>
                    <Input
                      placeholder="Email *"
                      isFullWidth
                      value={signInValues.email}
                      onChange={(e: { target: { value: any } }) =>
                        setSignInValues({
                          ...signInValues,
                          email: e.target.value,
                        })
                      }
                    />
                    <Input
                      placeholder="Password *"
                      isFullWidth
                      value={signInValues.password}
                      onChange={(e: { target: { value: any } }) =>
                        setSignInValues({
                          ...signInValues,
                          password: e.target.value,
                        })
                      }
                    />
                  </>
                ) : conditionalContent === "forgotpassword" ? (
                  <Input placeholder="Email *" isFullWidth />
                ) : (
                  <>
                    <Input
                      placeholder="Name *"
                      isFullWidth
                      onChange={(e: { target: { value: any } }) =>
                        setValues({ ...values, name: e.target.value })
                      }
                      value={values.name}
                    />
                    <Input
                      placeholder="Email *"
                      isFullWidth
                      onChange={(e: { target: { value: any } }) =>
                        setValues({ ...values, email: e.target.value })
                      }
                      value={values.email}
                    />
                    <Input
                      placeholder="Password *"
                      isFullWidth
                      onChange={(e: { target: { value: any } }) =>
                        setValues({ ...values, password: e.target.value })
                      }
                      value={values.password}
                    />
                    <Input
                      placeholder="Confirm password *"
                      isFullWidth
                      onChange={(e: { target: { value: any } }) =>
                        setValues({
                          ...values,
                          confirmPassword: e.target.value,
                        })
                      }
                      value={values.confirmPassword}
                    />
                  </>
                )}
              </div>
              {/* {conditionalContent === "signin" && (
                <p onClick={() => setConditionalContent("forgotpassword")}>
                  Forgot your password ?
                </p>
              )} */}
              <Button
                btnContent={
                  conditionalContent === "signin"
                    ? "sign in"
                    : conditionalContent === "forgotpassword"
                    ? "send a link"
                    : "sign up"
                }
                isFullWidth
                onClick={
                  conditionalContent === "signin" ? signInSubmit : signUpSubmit
                }
              />
              {conditionalContent === "signin" ? (
                <p onClick={() => setConditionalContent("signup")}>
                  Don't have an account? <span>Sign up for free</span>
                </p>
              ) : conditionalContent === "signup" ? (
                <p onClick={() => setConditionalContent("signin")}>
                  Already have an account? <span>Sign in</span>
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default UserModal;
