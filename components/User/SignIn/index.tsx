/* eslint-disable react/no-unescaped-entities */
import styles from "./styles.module.scss";
import CloseIcon from "../../../assets/public/close-icon.svg";
import Image from "next/image";
import { useState } from "react";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import { formValidation } from "../../../utilities/formValidation";

interface Props {
  handleClick?: any;
  setConditionalContent?: any;
}

const SignIn = ({ handleClick, setConditionalContent }: Props) => {
  const [values, setValues] = useState<any>({ email: "", password: "" });

  const handleSubmit = async () => {
    const isValid = formValidation(
      values.email,
      values.password,
      undefined,
      undefined
    );

    if (isValid) {
      const data = await fetch("http://localhost:3001/signin", {
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
      console.log(response);
    }

    setValues({ email: "", password: "" });
  };

  return (
    <>
      <div className={styles.__user_modal}>
        <div>
          <div className={styles.__head}>
            <div>
              <h6>signin</h6>
              <div className={styles.__user} onClick={handleClick}>
                <Image src={CloseIcon} alt="Close" width={23} height={20} />
              </div>
            </div>

            <hr />
          </div>
          <div className={styles.__body}>
            <div className={styles.__inputs}>
              <Input
                placeholder="Email *"
                isFullWidth
                value={values.email}
                onChange={(e: { target: { value: any } }) =>
                  setValues({
                    ...values,
                    email: e.target.value,
                  })
                }
              />
              <Input
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
            </div>

            <Button btnContent={"signin"} isFullWidth onClick={handleSubmit} />

            <p onClick={() => setConditionalContent("signup")}>
              Don't have an account? <span>Sign up for free</span>
            </p>
          </div>
        </div>
      </div>
      {/* </div>  */}
    </>
  );
};

export default SignIn;
