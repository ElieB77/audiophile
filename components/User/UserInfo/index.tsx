import { use, useEffect, useState } from "react";
import { fetchData } from "../../../utilities/api";
import { isLoggedIn, removeToken } from "../../../utilities/auth";
import styles from "./styles.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  handleClick: any;
}

const UserInfo = ({ handleClick }: Props) => {
  const [userName, setUserName] = useState<string>("");

  const userInfo = async () => {
    const data = await fetchData("http://localhost:3001/user");
    setUserName(data.name);
  };

  const logOut = () => {
    handleClick();
    toast.success("You have been logged out successfully.");
    removeToken();
  };

  userInfo();
  return (
    <>
      <div className={styles.__user_info}>
        <div className={styles.__greetings}>
          <p>
            Hello <span>{userName} !</span>
          </p>
        </div>
        <div className={styles.__menu}>
          <p>Orders</p>
          <p>Informations</p>
        </div>
        <div className={styles.__log_out}>
          <hr />
          <p onClick={logOut}>Log out</p>
        </div>
        <ToastContainer position="top-center" />
      </div>
    </>
  );
};

export default UserInfo;
