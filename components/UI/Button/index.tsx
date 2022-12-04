import styles from "./styles.module.scss";
import Image from "next/image";
import RightArrow from "../../../assets/public/right-arrow.svg";

interface ButtonProps {
  btnContent: string | JSX.Element;
  btnType?: "outlined" | "borderless";
  btnIcon?: boolean;
  onClick?: () => void;
}

const Button = ({ btnContent, btnType, btnIcon, onClick }: ButtonProps) => {
  const selectedBtnType =
    btnType === "borderless"
      ? styles.__borderless
      : btnType === "outlined"
      ? styles.__outlined
      : null;
  return (
    <div className={`${styles.__button} ${selectedBtnType}`} onClick={onClick}>
      {btnContent}
      {btnIcon && (
        <Image
          className={styles.__btn_icon}
          src={RightArrow}
          alt="right arrow"
          width={10}
          height={10}
        />
      )}
    </div>
  );
};

export default Button;
