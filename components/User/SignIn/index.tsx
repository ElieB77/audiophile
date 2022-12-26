/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import styles from "./styles.module.scss";
import CloseIcon from "../../../assets/public/close-icon.svg";
import Input from "../../UI/Input";
import Button from "../../UI/Button";

interface Props {
  handleClick?: any;
  setContent?: any;
}

const SignIn = ({ handleClick, setContent }: Props) => {
  return (
    <>
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
          <Input placeholder="Email *" isFullWidth />
          <Input placeholder="Password *" isFullWidth />
        </div>
        <p onClick={() => setContent("forgotpassword")}>
          Forgot your password ?
        </p>
        <Button btnContent={"sign in"} isFullWidth />
        <p onClick={() => setContent("signup")}>
          Don't have an account? <span>Sign up for free</span>
        </p>
      </div>
    </>
  );
};

export default SignIn;
