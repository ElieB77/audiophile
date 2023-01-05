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

  useEffect(() => {
    if (show) setConditionalContent("signin");
  }, [show]);

  const handleSubmit = () => {
    const isValid = formValidation(
      values.name,
      values.email,
      values.password,
      values.confirmPassword
    );

    setValues({ name: "", email: "", password: "", confirmPassword: "" });

    console.log(isValid);
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
                      onChange={(e) => (values.email = e.target.value)}
                    />
                    <Input
                      placeholder="Password *"
                      isFullWidth
                      onChange={(e) => (values.password = e.target.value)}
                    />
                  </>
                ) : conditionalContent === "forgotpassword" ? (
                  <Input placeholder="Email *" isFullWidth />
                ) : (
                  <>
                    <Input
                      placeholder="Name *"
                      isFullWidth
                      onChange={(e) => (values.name = e.target.value)}
                    />
                    <Input
                      placeholder="Email *"
                      isFullWidth
                      onChange={(e) => (values.email = e.target.value)}
                    />
                    <Input
                      placeholder="Password *"
                      isFullWidth
                      onChange={(e) => (values.password = e.target.value)}
                    />
                    <Input
                      placeholder="Confirm password *"
                      isFullWidth
                      onChange={(e) =>
                        (values.confirmPassword = e.target.value)
                      }
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
                onClick={handleSubmit}
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
