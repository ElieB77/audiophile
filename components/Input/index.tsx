import styles from "./styles.module.scss";

interface Props {
  name?: string;
  placeholder?: string;
  isFullWidth?: boolean;
  label?: string;
  isCheckbox?: boolean;
}

const Input = ({
  name,
  placeholder,
  isFullWidth,
  label,
  isCheckbox,
}: Props) => {
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
      <input id={name} name={name} type="text" placeholder={placeholder} />
    </div>
  );
};

export default Input;
