import styles from "./styles.module.scss";

const ProgressBar = () => {
  return (
    <div className={styles.__progress_bar}>
      <div className={styles.__bar}></div>
    </div>
  );
};

export default ProgressBar;
