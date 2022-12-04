import styles from "./styles.module.scss";

interface HeaderProps {
  title?: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <div className={styles.__header}>
      <h2>{title}</h2>
    </div>
  );
};

export default Header;
