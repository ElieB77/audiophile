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
  onClick?: () => void;
  isFullWidth?: boolean;
}

const Button = ({
  btnContent,
  btnType,
  btnIcon,
  onClick,
  isFullWidth,
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
      }`}
      onClick={onClick}
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
