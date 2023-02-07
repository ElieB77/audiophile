/* eslint-disable react/no-unescaped-entities */
// Styles
import styles from "./styles.module.scss";
// Assets
import CloseIcon from "../../../public/static/close-icon.svg";
// Modules
import Image from "next/image";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Components
import Input from "../../UI/Input";
import Button from "../../UI/Button";
// Context
import { useAuth } from "../../../context/AuthContext";
// Utilities
import { formValidation } from "../../../utilities/formValidation";

interface Props {
  handleClick?: any;
  setConditionalContent?: any;
}

const SignIn = ({ handleClick, setConditionalContent }: Props) => {
  const [values, setValues] = useState<any>({ email: "", password: "" });
  const [errors, setErrors] = useState<any>();

  const { setToken } = useAuth();

  const handleSubmit = async () => {
    const [isValid, error] = formValidation(
      values.email,
      values.password,
      undefined,
      undefined
    );

    if (isValid) {
      const data = await fetch(`${process.env.NEXT_PUBLIC_SIGNIN_URL}`, {
        method: "POST",
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const response = await data.json();
      if (response.status === 200) {
        setToken(response.token);
      } else if (response.status.toString() === "401") {
        toast.error(response.message);
      }
      setValues({ email: "", password: "" });
    }

    setErrors(error);
  };

  return (
    <>
      <div className={styles.__user_modal}>
        <div>
          <div className={styles.__head}>
            <div>
              <h6>sign in</h6>
              <div className={styles.__user} onClick={handleClick}>
                <Image src={CloseIcon} alt="Close" width={23} height={20} />
              </div>
            </div>

            <hr />
          </div>
          <div className={styles.__body}>
            <div className={styles.__inputs}>
              <div>
                <Input
                  error={
                    errors &&
                    errors.find(
                      (err: { input: string }) => err.input === "email"
                    )
                  }
                  placeholder="Email *"
                  type={"email"}
                  isFullWidth
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
              <div>
                <Input
                  error={
                    errors &&
                    errors.find(
                      (err: { input: string }) => err.input === "password"
                    )
                  }
                  type="password"
                  placeholder="Password *"
                  isFullWidth
                  value={values.password}
                  onChange={(e: { target: { value: any } }) =>
                    setValues({
                      ...values,
                      password: e.target.value,
                    })
                  }
                />
                {errors &&
                  errors.map((err: any, index: any) => {
                    if (err.input === "password") {
                      return (
                        <p className={styles.__error_message} key={index}>
                          {err.message}
                        </p>
                      );
                    }
                  })}
              </div>
            </div>

            <Button btnContent={"signin"} isFullWidth onClick={handleSubmit} />

            <p onClick={() => setConditionalContent("signup")}>
              Don't have an account? <span>Sign up for free</span>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={1000} />
    </>
  );
};

export default SignIn;
