// Styles
import styles from "./styles.module.scss";
// Assets
import CloseIcon from "../../../public/static/close-icon.svg";
// Components
import Input from "../../UI/Input";
import Button from "../../UI/Button";
// Utilities
import { formValidation } from "../../../utilities/formValidation";
// Modules
import Image from "next/image";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  handleClick?: any;
  setConditionalContent?: any;
}

const SignUp = ({ handleClick, setConditionalContent }: Props) => {
  const [values, setValues] = useState<any>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<any>();

  const handleSubmit = async () => {
    const [isValid, error] = formValidation(
      values.email,
      values.password,
      values.name,
      values.confirmPassword
    );

    if (isValid) {
      const data = await fetch(`${process.env.NEXT_PUBLIC_SIGNUP_URL}`, {
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
      if (response.status.toString() === "201") {
        toast.success(response.message);
        setTimeout(() => {
          setConditionalContent("signin");
        }, 2000);
      } else if (response.status.toString() === "400") {
        toast.error(response.message);
      }
      setValues({ name: "", email: "", password: "", confirmPassword: "" });
    }

    setErrors(error);
  };

  return (
    <>
      <div className={styles.__user_modal}>
        <div>
          <div className={styles.__head}>
            <div>
              <h6>sign up</h6>
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
                      (err: { input: string }) => err.input === "name"
                    )
                  }
                  type="text"
                  placeholder="Name *"
                  isFullWidth
                  onChange={(e: { target: { value: any } }) =>
                    setValues({ ...values, name: e.target.value })
                  }
                  value={values.name}
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
              <div>
                <Input
                  error={
                    errors &&
                    errors.find(
                      (err: { input: string }) => err.input === "email"
                    )
                  }
                  placeholder="Email *"
                  type="email"
                  isFullWidth
                  onChange={(e: { target: { value: any } }) =>
                    setValues({ ...values, email: e.target.value })
                  }
                  value={values.email}
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
                  onChange={(e: { target: { value: any } }) =>
                    setValues({ ...values, password: e.target.value })
                  }
                  value={values.password}
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

              <div>
                <Input
                  error={
                    errors &&
                    errors.find(
                      (err: { input: string }) =>
                        err.input === "confirmPassword"
                    )
                  }
                  type="password"
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
                {errors &&
                  errors.map((err: any, index: any) => {
                    if (err.input === "confirmPassword") {
                      return (
                        <p className={styles.__error_message} key={index}>
                          {err.message}
                        </p>
                      );
                    }
                  })}
              </div>
            </div>

            <Button btnContent={"sign up"} isFullWidth onClick={handleSubmit} />

            <p onClick={() => setConditionalContent("signin")}>
              Already have an account? <span>Sign in</span>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default SignUp;
