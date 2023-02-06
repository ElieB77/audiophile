import { useRouter } from "next/router";
import styles from "../../assets/styles/pages/user-informations.module.scss";
import UserInfoForm from "../../components/Forms/UserInfoForm";
import Button from "../../components/UI/Button";

const UserInformations = () => {
  const router = useRouter();
  return (
    <div className={styles.__user_informations}>
      <div className={styles.__container}>
        <div className={styles.__go_back_btn} onClick={() => router.back()}>
          <Button btnContent="go back" btnType="borderless" />
        </div>
        <div className={styles.__wrapper}>
          <h3>settings</h3>
          <div className={styles.__form}>
            <UserInfoForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInformations;
