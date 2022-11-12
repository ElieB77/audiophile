import styles from "./styles.module.scss";
import Image from "next/image";

interface Props {
  btnContent: string | JSX.Element;
  btnType?: "outlined" | "borderless";
  btnIcon?: boolean;
}

const Button = ({ btnContent, btnType, btnIcon }: Props) => {
  const selectedBtnType =
    btnType === "borderless"
      ? styles.__borderless
      : btnType === "outlined"
      ? styles.__outlined
      : "";
  return (
    <div className={`${styles.__button} ${selectedBtnType}`}>
      {btnContent}
      {btnIcon && (
        <Image
          className={styles.__btn_icon}
          src="/right-arrow.svg"
          alt="right arrow"
          width={10}
          height={10}
        />
      )}
    </div>
  );
};

export default Button;
