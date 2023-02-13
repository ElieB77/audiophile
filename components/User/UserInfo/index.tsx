// Styles
import styles from "./styles.module.scss";
import "react-toastify/dist/ReactToastify.css";
// Modules
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from "next/router";
// Context
import { useAuth } from "../../../context/AuthContext";
// Assets
import LogOutIcon from "../../../public/static/log-out-icon.svg";
import ListIcon from "../../../public/static/list-solid.svg";
import UserInfoIcon from "../../../public/static/user-info.svg";
// Utilities
import { getData } from "../../../utilities/api";

interface Props {
  handleClick: any;
}

const UserInfo = ({ handleClick }: Props) => {
  const [userName, setUserName] = useState<string>("");
  const { removeToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    getData(process.env.NEXT_PUBLIC_GET_USER).then((data) => {
      setUserName(data && data.rows[0].name);
    });
  }, []);

  const logOut = () => {
    removeToken();
    handleClick();

    // setTimeout(() => {
    //   handleClick();
    // }, 1500);
  };

  // userInfo();
  return (
    <>
      <div className={styles.__user_info}>
        <div className={styles.__greetings}>
          <p>
            Hello <span>{userName} !</span>
          </p>
        </div>
        <div className={styles.__menu}>
          <p>
            <Image src={ListIcon} alt="Logo" width={15} height={15} />
            Orders
          </p>
          <p
            onClick={() => {
              router.push("/user-settings");
              handleClick();
            }}
          >
            <Image src={UserInfoIcon} alt="Logo" width={15} height={15} />
            Account
          </p>
        </div>
        <div className={styles.__log_out}>
          <hr />
          <p onClick={logOut}>
            <Image src={LogOutIcon} alt="Logo" width={15} height={15} />
            Log out
          </p>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={1000} />
    </>
  );
};

export default UserInfo;
