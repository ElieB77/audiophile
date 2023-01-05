import { type } from "os";
import styles from "./styles.module.scss";

interface InputProps {
  name?: string;
  placeholder?: string;
  isFullWidth?: boolean;
  label?: string;
  isCheckbox?: boolean;
  onChange?: any;
}

const Input = ({
  name,
  placeholder,
  isFullWidth,
  label,
  isCheckbox,
  onChange,
}: InputProps) => {
  return isCheckbox ? (
    <div className={styles.__checkbox}>
      <label>
        <input type="checkbox" name="hello" id="hello" />
        Checkbox
      </label>
    </div>
  ) : (
    <div
      className={`${styles.__input} ${
        isFullWidth ? styles.__full_width : null
      }`}
    >
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type="text"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
