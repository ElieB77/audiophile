// Modules
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// Styles
import styles from "../../assets/styles/pages/user-settings.module.scss";
// Components
import Button from "../../components/UI/Button";
import UserSettingsForm from "../../components/Forms/UserSettingsForm";
// Context
import { useAuth } from "../../context/AuthContext";
// Utilities
import { getData } from "../../utilities/api";

const UserSettings = () => {
  const [user, setUser] = useState();
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  useEffect(() => {
    getData(process.env.NEXT_PUBLIC_GET_USER).then((data) => {
      setUser(data);
    });
  }, []);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  return (
    <div className={styles.__user_informations}>
      <div className={styles.__container}>
        <div className={styles.__go_back_btn} onClick={() => router.back()}>
          <Button btnContent="go back" btnType="borderless" />
        </div>
        <div className={styles.__wrapper}>
          <h3>settings</h3>
          <div className={styles.__form}>
            <UserSettingsForm data={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
