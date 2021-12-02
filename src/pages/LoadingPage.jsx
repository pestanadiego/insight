import styles from "./LoadingPage.module.css";

function LoadingPage() {
  return (
    <div className={styles.loading}>
      <div className={styles.carga}></div>
    </div>
  );
}

export default LoadingPage;
