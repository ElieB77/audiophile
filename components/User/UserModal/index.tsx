import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import SignIn from "../SignIn";
import SignUp from "../SignUp";

interface Props {
  show?: any;
  handleClick?: any;
}

const UserModal = ({ show, handleClick }: Props) => {
  const [conditionalContent, setConditionalContent] =
    useState<string>("signin");

  useEffect(() => {
    if (show) setConditionalContent("signin");
  }, [show]);

  return (
    show && (
      <>
        {conditionalContent === "signin" ? (
          <SignIn
            setConditionalContent={setConditionalContent}
            handleClick={handleClick}
          />
        ) : (
          <SignUp
            setConditionalContent={setConditionalContent}
            handleClick={handleClick}
          />
        )}
        <div className={styles.__overlay} onClick={handleClick}></div>
      </>
    )
  );
};

export default UserModal;
