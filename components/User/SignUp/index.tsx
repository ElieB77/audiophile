import styles from "./styles.module.scss";
import CloseIcon from "../../../assets/public/close-icon.svg";
import Image from "next/image";
import Input from "../../UI/Input";
import { useState } from "react";
import Button from "../../UI/Button";
import { formValidation } from "../../../utilities/formValidation";

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

  const handleSubmit = async () => {
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
      console.log(response);
    }

    setValues({ name: "", email: "", password: "", confirmPassword: "" });
    console.log("sign up button");
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
            </div>

            <Button btnContent={"sign up"} isFullWidth onClick={handleSubmit} />

            <p onClick={() => setConditionalContent("signin")}>
              Already have an account? <span>Sign in</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
