// Modules
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Styles
import styles from "./styles.module.scss";
// Components
import SignIn from "../../User/SignIn";
import SignUp from "../../User/SignUp";
import UserInfo from "../../User/UserInfo";
// Context
import { useAuth } from "../../../context/AuthContext";

interface Props {
  show?: any;
  handleClick?: any;
}

const UserModal = ({ show, handleClick }: Props) => {
  const [conditionalContent, setConditionalContent] =
    useState<string>("signin");
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (show) setConditionalContent("signin");
  }, [show]);

  return (
    show && (
      <div>
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
        <ToastContainer position="top-center" autoClose={1000} />
      </div>
    )
  );
};

export default UserModal;
