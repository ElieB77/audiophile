import styles from "./styles.module.scss";

interface InputProps {
  name?: string;
  placeholder?: string;
  isFullWidth?: boolean;
  label?: string;
  isRadio?: boolean;
  onChange?: any;
  value?: any;
}

const Input = ({
  name,
  placeholder,
  isFullWidth,
  label,
  isRadio,
  onChange,
  value,
}: InputProps) => {
  return isRadio ? (
    <div className={styles.__isRadio}>
      <label>
        <input type="radio" name="hello" id="hello" />
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
      <input
        id={name}
        name={name}
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default Input;
