// Style
import styles from "./styles.module.scss";
// Modules
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
// Components
import Button from "../../UI/Button";
import Input from "../../UI/Input";
// Utilities
import { formValidation } from "../../../utilities/formValidation";

interface UserSettingsFormProps {
  data: any;
}

const UserSettingsForm = ({ data }: UserSettingsFormProps) => {
  const [errors, setErrors] = useState<any>();
  const [values, setValues] = useState<any>({
    name: "",
    email: "",
  });

  useEffect(() => {
    setValues({
      name: data && data.rows[0].name,
      email: data && data.rows[0].email,
    });
  }, [data]);

  const handleSubmit = async () => {
    const [isValid, error] = formValidation(
      values.email,
      undefined,
      values.name
    );
    if (isValid) {
      const token = localStorage.getItem("token");
      try {
        const data = await fetch(`${process.env.NEXT_PUBLIC_UPDATE_USER}`, {
          method: "PUT",
          body: JSON.stringify({
            name: values.name,
            email: values.email,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Your information has been successfully updated!");
      } catch (error) {
        toast.error("Something went wrong, please try again later.");
        throw error;
      }
    }
    setErrors(error);
  };

  console.log(errors);

  return (
    <>
      <div className={styles.__user_info_form}>
        <div className={styles.__inputs}>
          <Input
            placeholder="Name"
            label="Name"
            isFullWidth
            value={values.name}
            onChange={(e: { target: { value: any } }) =>
              setValues({
                ...values,
                name: e.target.value,
              })
            }
          />
          <Input
            placeholder="Email"
            label="Email"
            isFullWidth
            type="email"
            value={values.email}
            onChange={(e: { target: { value: any } }) =>
              setValues({
                ...values,
                email: e.target.value,
              })
            }
          />
        </div>
        <div className={styles.__submit_btn}>
          <Button btnContent={"update"} onClick={handleSubmit} />
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={1000} />
    </>
  );
};

export default UserSettingsForm;
