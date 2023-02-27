import styles from "./styles.module.scss";

interface InputProps {
  name?: string;
  placeholder?: string;
  isFullWidth?: boolean;
  label?: string;
  isRadio?: boolean;
  onChange?: any;
  value?: any;
  type?: "radio" | "password" | "text" | "email" | "number" | "file";
  error?: boolean;
  isTextArea?: boolean;
}

const Input = ({
  name,
  placeholder,
  isFullWidth,
  label,
  isRadio,
  onChange,
  value,
  type,
  error,
  isTextArea,
}: InputProps) => {
  return isRadio ? (
    <div className={styles.__isRadio}>
      <label>
        <input type={type} name="hello" id="hello" />
        {label}
      </label>
    </div>
  ) : (
    <div
      className={`${styles.__input} ${
        isFullWidth ? styles.__full_width : null
      }`}
    >
      <label htmlFor={name}>{label}</label>
      {!isTextArea ? (
        <input
          className={error ? styles.__error : ""}
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
      ) : (
        <textarea
          className={error ? styles.__error : ""}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          rows={10}
        />
      )}
    </div>
  );
};

export default Input;
