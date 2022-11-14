import styles from "./styles.module.scss";

interface Props {
  title?: string;
}

const Header = ({ title }: Props) => {
  return (
    <div className={styles.__header}>
      <h2>{title}</h2>
    </div>
  );
};

export default Header;
