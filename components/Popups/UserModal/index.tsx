import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import SignIn from "../../User/SignIn";
import SignUp from "../../User/SignUp";
import { isLoggedIn } from "../../../utilities/auth";
import UserInfo from "../../User/UserInfo";

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
        {conditionalContent === "signin" && !isLoggedIn() ? (
          <SignIn
            setConditionalContent={setConditionalContent}
            handleClick={handleClick}
          />
        ) : conditionalContent === "signup" && !isLoggedIn() ? (
          <SignUp
            setConditionalContent={setConditionalContent}
            handleClick={handleClick}
          />
        ) : isLoggedIn() ? (
          <UserInfo handleClick={handleClick} />
        ) : null}
        <div className={styles.__overlay} onClick={handleClick}></div>
      </>
    )
  );
};

export default UserModal;
