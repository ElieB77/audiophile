import Image from "next/image";
import styles from "./styles.module.scss";
import CloseIcon from "../../../assets/public/close-icon.svg";
import Input from "../../UI/Input";
import Button from "../../UI/Button";

interface Props {
  handleClick?: any;
  setContent?: any;
}

const SignUp = ({ handleClick, setContent }: Props) => {
  return (
    <>
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
          <Input placeholder="Name *" isFullWidth />
          <Input placeholder="Email *" isFullWidth />
          <Input placeholder="Password *" isFullWidth />
          <Input placeholder="Confirm password *" isFullWidth />
        </div>
        <Button btnContent={"sign in"} isFullWidth />
        <p onClick={setContent("signin")}>
          Already have an account? <span>Sign in</span>
        </p>
      </div>
    </>
  );
};

export default SignUp;
