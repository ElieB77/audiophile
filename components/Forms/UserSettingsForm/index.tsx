// Style
import styles from "./styles.module.scss";
// Modules
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
// Components
import Button from "../../UI/Button";
import Input from "../../UI/Input";
// Utilities
import { formValidation } from "../../../utilities/formValidation";
// Assets
import AvatarDefault from "../../../public/static/avatar-default.png";

interface UserSettingsFormProps {
  data: any;
}

const UserSettingsForm = ({ data }: UserSettingsFormProps) => {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [errors, setErrors] = useState<any>();
  const [values, setValues] = useState<any>({
    name: "",
    email: "",
    avatar: "",
  });

  useEffect(() => {
    setValues({
      name: data && data.rows[0].name,
      email: data && data.rows[0].email,
      avatar: data && data.rows[0].avatar,
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

  const handleUpload = async () => {
    const data = new FormData();
    data.append("file", selectedFile);
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3001/user/upload", {
      method: "POST",
      body: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await response.json();
  };

  return (
    <>
      <div className={styles.__user_info_form}>
        <div className={styles.__inputs}>
          <div className={styles.__upload_avatar}>
            <Input
              type="file"
              onChange={(e: any) => setSelectedFile(e.target.files[0])}
            />
            <Button btnContent={"upload"} onClick={handleUpload} />
            <div className={styles.__avatar}>
              <Image
                src={
                  values.avatar
                    ? `${process.env.NEXT_PUBLIC_BASE_URL}/${values.avatar}`
                    : AvatarDefault
                }
                alt="Avatar"
                width={50}
                height={50}
              />
            </div>
          </div>
          <hr />
          <div>
            <Input
              error={
                errors &&
                errors.find((err: { input: string }) => err.input === "name")
              }
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
            {errors &&
              errors.map((err: any, index: any) => {
                if (err.input === "name") {
                  return (
                    <p className={styles.__error_message} key={index}>
                      {err.message}
                    </p>
                  );
                }
              })}
          </div>
          <div>
            <Input
              error={
                errors &&
                errors.find((err: { input: string }) => err.input === "email")
              }
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
            {errors &&
              errors.map((err: any, index: any) => {
                if (err.input === "email") {
                  return (
                    <p className={styles.__error_message} key={index}>
                      {err.message}
                    </p>
                  );
                }
              })}
          </div>
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
