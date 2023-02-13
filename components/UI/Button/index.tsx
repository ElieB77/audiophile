// Styles
import styles from "./styles.module.scss";
// Modules
import Image from "next/image";
// Assets
import RightArrow from "../../../public/static/right-arrow.svg";

interface ButtonProps {
  btnContent: string | JSX.Element;
  btnType?: "outlined" | "borderless";
  btnIcon?: boolean;
  onClick?: any;
  isFullWidth?: boolean;
  id?: any;
  disabled?: boolean;
}

const Button = ({
  btnContent,
  btnType,
  btnIcon,
  onClick,
  isFullWidth,
  id,
  disabled,
}: ButtonProps) => {
  const selectedBtnType =
    btnType === "borderless"
      ? styles.__borderless
      : btnType === "outlined"
      ? styles.__outlined
      : null;
  return (
    <div
      className={`${styles.__button} ${selectedBtnType} ${
        isFullWidth ? styles.__full_width : null
      } ${disabled ? styles.__disabled : null}`}
      onClick={onClick}
      id={id}
    >
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
