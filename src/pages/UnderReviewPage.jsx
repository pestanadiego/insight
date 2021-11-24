//Pagina de redireccionamiento al registrarse como especialista
import styles from "./UnderReviewPage.module.css";
import { useHistory } from 'react-router-dom';
import checkmarkIcon from "../icons/checkmark_under_review.svg";

function UnderReviewPage() {
    const history = useHistory();

    const handleClick = () => {
        history.push('/');
    }

    return (
        <>
        <div className={styles.page}>
          <div className={styles.underReviewContainer}>
            <div className={styles.info}>
              <div className={styles.imgContainer}>
                <img className={styles.checkmark} src={checkmarkIcon} alt=""/>
              </div>
              <p className={styles.underReviewTitle}>Hemos recibido tu información de registro</p>
              <p className={styles.underReviewMessage}>¡Te notificaremos por correo lo antes posible!</p>
              <div className={styles.btnContainer}>
                <button type='submit' className={styles.underReviewBtn} onClick={handleClick}>Volver</button>
              </div>
            </div>
          </div>
        </div>
        </>
    );
};

export default UnderReviewPage;