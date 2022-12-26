/* eslint-disable react/no-unescaped-entities */
import styles from "./styles.module.scss";
import Image from "next/image";
import CloseIcon from "../../../assets/public/close-icon.svg";
import Input from "../../UI/Input";
import Button from "../../UI/Button";

interface Props {
  handleClick?: any;
  setContent?: any;
}

const ForgotPassword = ({ handleClick, setContent }: Props) => {
  return (
    <>
      <div className={styles.__head}>
        <div>
          <h6>forgot password ?</h6>
          <div className={styles.__user} onClick={handleClick}>
            <Image src={CloseIcon} alt="Close" width={23} height={20} />
          </div>
        </div>
        <hr />
      </div>
      <div className={styles.__body}>
        <p className={styles.__forgot_password_message}>
          No worries, we'll send you reset instructions.
        </p>
        <div className={styles.__input}>
          <Input placeholder="Email *" isFullWidth />
        </div>
        <Button btnContent="send a link" isFullWidth />
      </div>
    </>
  );
};

export default ForgotPassword;
