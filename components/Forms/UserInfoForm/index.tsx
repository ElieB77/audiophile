import Button from "../../UI/Button";
import Input from "../../UI/Input";
import styles from "./styles.module.scss";

const UserInfoForm = () => {
  return (
    <div className={styles.__user_info_form}>
      <div className={styles.__inputs}>
        <Input placeholder="Name" isFullWidth />
        <Input placeholder="Email" isFullWidth />
        <Input placeholder="Password" isFullWidth />
      </div>
      <div className={styles.__submit_btn}>
        <Button btnContent={"update"} />
      </div>
    </div>
  );
};

export default UserInfoForm;
